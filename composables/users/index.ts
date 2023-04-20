// import { getUserAvatar } from "~/modules/users";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { defineStore } from "pinia";
import {
  getFirestore, collection, addDoc, getDocs, query, where, setDoc, orderBy,
} from "firebase/firestore";
import { MarkdownParsedContent } from "@nuxt/content/dist/runtime/types";
import { createAvatar } from "@dicebear/core";
import { lorelei } from "@dicebear/collection";
import {
  getCommentDateAsString, normalizePath, UserInfo, Comment, BlogPostMeta,
} from "~/modules/utils";

const useUserInfo = defineStore("userInfo", {

  state: () => ({
    active: false,
    userName: "",
    avatar: "",
    email: "",
    uid: "",
    subscriptions: new Set<BlogPostMeta>(),
    currentRouteComments: [],
  } as UserInfo),

  getters: {
    getSubscriptionPaths() {
      const _subs = [...this.subscriptions];
      return _subs.map((sub) => sub.path);
    },
    getComments() {
      return this.currentRouteComments;
    },
    getUserName() {
      return this.userName;
    },
    getAvatar() {
      return this.avatar;
    },
    getSubscriptionCount() {
      return this.subscriptions.size;
    },

  },

  actions: {
    async init() {
      const { currentUser: newUser } = getAuth();
      if (newUser) {
        this.active = true;
        this.userName = newUser.displayName || "";
        this.avatar = await this.getUserAvatar();
        this.email = newUser.email || "";
        this.uid = newUser.uid;
        await this.getCommentsByRoute();
        await this.updateSubscriptions(true);

        onAuthStateChanged(getAuth(), () => this.update());
      }
    },
    async update() {
      const { currentUser: newUser } = getAuth();
      if (newUser) {
        this.active = true;
        this.userName = newUser.displayName || "";
        this.avatar = await this.getUserAvatar();
        this.email = newUser.email || "";
        this.uid = newUser.uid;
        await this.getCommentsByRoute();
        await this.updateSubscriptions(false);
      }
    },

    async updateSubscriptions(clear = false) {
      const allSubscriptions = await this.getAllSubscriptions();

      if (clear) {
        this.subscriptions = allSubscriptions;
      } else {
        // remove any subscriptions that are no longer valid
        this.subscriptions = new Set<string>([...this.subscriptions].filter((sub) => {
          return allSubscriptions.includes(sub);
        }));

        // add any new subscriptions
        allSubscriptions.forEach((sub) => {
          this.subscriptions.add(sub);
        });
      }
    },

    /**
    * Subscribes the user to a specific page.
    *
    * @param path (optional) path to subscribe to.
    *
    * if not provided, uses current route.
    */
    async subscribe(_path? : string) {
      const db = getFirestore();
      // const userInfo = useUserInfo();
      const { currentUser } = getAuth();
      const path = normalizePath(_path || useRoute().path);
      const q = query(
        collection(db, "subscriptions"),
        where("page", "==", path),
      );

      return getDocs(q).then((querySnapshot) => {
        if (querySnapshot.size === 0) {
          addDoc(collection(db, "subscriptions"), {
            page: path,
            subscribers: [currentUser.email],
          });
        } else {
          querySnapshot.forEach((doc) => {
            const { subscribers } = doc.data();
            subscribers.push(currentUser.email);
            setDoc(doc.ref, {
              page: path,
              subscribers,
            });
          });
        }
        this.updateSubscriptions();
        return true;
      }).catch((error) => {
        console.error("Error getting documents: ", error);
        return false;
      });
    },

    toggleSubscription(blogPath?: string) {
      const path = normalizePath(blogPath || useRoute().path);
      if (this.isSubscribed(path)) {
        this.unsubscribe(path);
      } else {
        this.subscribe(path);
      }
    },

    /**
     * Sends email to all subscribers of a page
     * on a new comment.
     *
     * @param comment comment to send email about
     */
    async sendEmailToSubs(comment: Comment) {
      const db = getFirestore();
      const { currentUser } = getAuth();

      const path = normalizePath(useRoute().path);

      // get subscribers to current page
      const q = query(
        collection(db, "subscriptions"),
        where("page", "==", path),
      );

      // add notification message to mail collection
      getDocs(q).then((querySnapshot) => {
        // snapshot should contain single document with array of subscribers
        const _rawSubs: Array<Array<string>> = querySnapshot.docs.map((_doc) => _doc.data().subscribers);

        const _subscribers = _rawSubs[0] || [];
        const otherSubscriber = (email) => email !== currentUser?.email;
        _subscribers.filter(otherSubscriber);

        if (_subscribers.length === 0) return;
        if (comment.text === "") return;

        const outMail = {
          to: _subscribers,
          message: {
            subject: "altair.fyi",
            text: `
      There is a new comment on a post you are subscribed to.
      
      At ${getCommentDateAsString(new Date(comment.date))}, ${comment.author} said: 
      
      
      ${comment.text}
      
      
      Check it out here: https://altair.fyi${path}.`,
          // html: ''
          },
        };
        // add message to mail collection
        addDoc(collection(db, "mail"), outMail)
          .catch((error) => {
            console.error(`Error adding document: ${error}`);
          });
      });
    },

    /**
     * Unsubscribes the current user from a page
     * @param _path (optional) path to unsubscribe from.
     *
     * if not provided, uses current route.
     */
    async unsubscribe(_path? : string) {
      const db = getFirestore();

      const path = normalizePath(_path || useRoute().path);
      const { currentUser } = getAuth();

      const q = query(
        collection(db, "subscriptions"),
        where("page", "==", path),
      );

      try {
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          const { subscribers } = doc.data();
          const remainingSubscribers = subscribers.filter((email) => {
            return email !== currentUser.email;
          });
          setDoc(doc.ref, {
            page: path,
            subscribers: remainingSubscribers,
          });
        });
        this.updateSubscriptions();
        return true;
      } catch (error) {
        console.error("Error getting documents: ", error);
        return false;
      }
    },

    /**
     * Gets all subscriptions for the current user
     *
     * @returns {Array} array of all subscriptions
     *
     */
    async getAllSubscriptions() {
      const db = getFirestore();
      const { currentUser } = getAuth();

      // get all documents that have user email in subscribers
      const q = query(
        collection(db, "subscriptions"),
        where("subscribers", "array-contains", currentUser.email),
      );

      const _results: BlogPostMeta[] = [];
      return getDocs(q).then(async (querySnapshot) => {
        const paths = Array.from(new Set<string>(
          querySnapshot.docs.map((doc) => {
            const path = doc.data().page;
            return normalizePath(path);
          }),
        ));

        await queryContent<MarkdownParsedContent>()
          .where({ _path: { $in: paths } })
          .find()
          .then((data) => {
            data.forEach((page) => {
              _results.push({
                title: page?.title || "",
                path: page?._path || "",
                category: page?.category[0] || page?.category || "",
                description: page?.description || "",
                date: page?.date || "",
                image: page?.image || "",
                excerpt: page?.excerpt || "",
              });
            });
          });
        return _results;
      }).catch((error) => {
        console.error("Error getting documents: ", error);
        return _results;
      });
    },

    /**
     * Gets the avatar of the current user.
     *
     * If nonexistent, generates a new one and saves it to the database.
     *
     * @returns the (possibly new) avatar of the current user
     */
    async getUserAvatar() {
      const db = getFirestore();
      const { currentUser } = getAuth();

      if (!currentUser) {
        console.error("Call to getUserAvatar with no user logged in.");
        return "";
      }

      const q = query(
        collection(db, "avatars"),
        where("uid", "==", currentUser.uid),
      );

      return getDocs(q).then((querySnapshot) => {
        // if query is empty, generate new avatar
        if (querySnapshot.size === 0) {
          const avatar = createAvatar(lorelei, {
            seed: `${currentUser?.uid} @ ${new Date().toISOString()}`,
          });

          const newUserAvatar = {
            uid: currentUser.uid,
            avatar: avatar.toString(),
          };

          addDoc(collection(db, "avatars"), newUserAvatar);
          return newUserAvatar.avatar;
        } else {
          // get first avatar in querySnapshot
          const doc = querySnapshot.docs[0];
          const userAvatar: string = doc.data().avatar;
          return userAvatar;
        }
      });
    },

    /**
     * Gets all comments for a specific page
     *
     * @param _path (optional) path to get comments for
     *
     * @returns array of comments
     *
     * Returns empty array if no comments or an error occurs.
     */
    async getCommentsByRoute(_path?: string) {
      const db = getFirestore();
      const path = normalizePath(_path || useRoute().path);

      // get comments for the current path
      // sorted by date.
      const q = query(
        collection(db, "comments"),
        where("path", "==", path),
        orderBy("date", "asc"),
      );

      await getDocs(q).then((querySnapshot) => {
        const _results: Comment[] = [];
        querySnapshot.forEach((doc) => {
          const comment: Comment = {
            text: doc.data().text,
            author: doc.data().author || "anon",
            avatar: doc.data().avatar,
            date: doc.data().date,
            path: doc.data().page || "",
          };

          _results.push(comment);
        });
        this.currentRouteComments = _results;
      });
    },

    /**
     * Sends a comment to the database
     *
     * @param comment comment to send
     *
     * @returns true if comment was sent successfully, false otherwise
     */
    async sendComment(comment: Comment) {
      const db = getFirestore();

      comment.path = normalizePath(comment.path);

      await addDoc(collection(db, "comments"), comment)
        .then(() => { return true; })
        .catch((error) => {
          console.error("Error adding document: ", error);
          return false;
        });

      this.currentRouteComments.push(comment);
      this.sendEmailToSubs(comment);
    },

    /**
     * Check if active user is subscribed to a given route.
     */
    isSubscribed(_path?: string) {
      const path = normalizePath(_path || useRoute().path);
      return this.getSubscriptionPaths.includes(path);
    },
  },
});

export default useUserInfo;
