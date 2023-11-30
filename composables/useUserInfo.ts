// import { getAuth } from "firebase/auth";
import { defineStore } from "pinia"
// import {
//   getFirestore, collection, addDoc, getDocs, query, where, orderBy, onSnapshot, updateDoc, arrayUnion, arrayRemove,
// } from "firebase/firestore";
import { createAvatar } from "@dicebear/core"
import { lorelei } from "@dicebear/collection"

interface Comment {
  text: string,
  author: string,
  avatar: string,
  date: string,
  path: string,
}

const useUserInfo = defineStore("userInfo", {

  state: () => ({
    active: false,
    userName: "",
    avatar: "",
    email: "",
    uid: "",
    subscriptions: new Set<string>(),
    currentRouteComments: [],
  }),

  getters: {
    getSubscriptionPaths(): Array<string> {
      // return [...this.subscriptions];
      return Array.from(this.subscriptions)
    },
    getComments(): Array<Comment> {
      return this.currentRouteComments
    },
    getUserName(): string {
      return this.userName
    },
    getAvatar(): string {
      return this.avatar
    },
    getSubscriptionCount(): number {
      return this.subscriptions.size
    },
    getCommentCount(): number {
      return this.currentRouteComments.length
    },

  },

  actions: {
    async init() {
      // dynamic import getAuth
      const { getAuth } = await import("firebase/auth")

      const { currentUser: newUser } = getAuth()
      // const auth = getAuth();
      this.active = !!newUser

      this.userName = newUser?.displayName || ""
      this.avatar = await this.getUserAvatar()
      this.email = newUser?.email || ""
      this.uid = newUser?.uid

      this.updateSubscriptions()
      this.getCommentsByRoute()
    },
    async update() {
      // dynamic imports
      const { getAuth } = await import("firebase/auth")

      const { currentUser: newUser } = getAuth()
      const auth = getAuth()
      const { path } = useRoute()
      // if (newUser?.email !== undefined) {
      this.active = auth.currentUser.email !== null

      this.userName = newUser.displayName || ""
      this.avatar = await this.getUserAvatar()
      this.email = newUser.email || ""
      this.uid = newUser.uid

      if (!["/"].includes(path)) {
        this.updateSubscriptions()
      }
      // }
      if (!["/", "/writing"].includes(path)) {
        await this.getCommentsByRoute()
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
      // dynamic imports
      const { getAuth } = await import("firebase/auth")
      const {
        getFirestore, collection, addDoc, getDocs, query, where, updateDoc, arrayUnion,
      } = await import("firebase/firestore")
      const db = getFirestore()
      const { currentUser } = getAuth()
      const { path } = useTrimmedPath(_path)
      const q = query(
        collection(db, "subscriptions"),
        where("page", "==", path),
      )

      return getDocs(q).then((querySnapshot) => {
        if (querySnapshot.size === 0) {
          addDoc(collection(db, "subscriptions"), {
            page: path,
            subscribers: [currentUser.email],
          })
        } else {
          const doc = querySnapshot.docs[0]
          updateDoc(doc.ref, {
            subscribers: arrayUnion(currentUser.email),
          })
        }
        // this.updateSubscriptions();
        return true
      }).catch((error) => {
        console.error("Error getting documents: ", error)
        return false
      })
    },

    toggleSubscription(blogPath?: string) {
      const { path } = useTrimmedPath(blogPath)
      if (this.isSubscribed(path)) {
        this.unsubscribe(path)
      } else {
        this.subscribe(path)
      }
    },

    /**
     * Sends email to all subscribers of a page
     * on a new comment.
     *
     * @param comment comment to send email about
     */
    async sendEmailToSubs(comment: Comment) {
      // dynamic imports
      const { getAuth } = await import("firebase/auth")
      const {
        getFirestore, collection, addDoc, getDocs, query, where,
      } = await import("firebase/firestore")
      const db = getFirestore()
      const { currentUser } = getAuth()

      const { path } = useTrimmedPath()

      // get subscribers to current page
      const q = query(
        collection(db, "subscriptions"),
        where("page", "==", path),
      )

      // add notification message to mail collection
      getDocs(q).then((querySnapshot) => {
        // snapshot should contain single document with array of subscribers
        const _rawSubs: Array<Array<string>> = querySnapshot.docs.map((_doc) => _doc.data().subscribers)

        const _subscribers = _rawSubs[0] || []
        const otherSubscriber = (email) => email !== currentUser?.email
        _subscribers.filter(otherSubscriber)

        if (_subscribers.length === 0) return
        if (comment.text === "") return

        const outMail = {
          to: _subscribers,
          message: {
            subject: "altair.fyi",
            text: `
      There is a new comment on a post you are subscribed to.
      
      At ${getCommentDateAsString(new Date(comment.date))}, ${comment.author} said: 
      
      
      ${comment.text}
      
      
      Check it out here: https://amitt.ai${path}.`,
            // html: ''
          },
        }
        // add message to mail collection
        addDoc(collection(db, "mail"), outMail)
          .catch((error) => {
            console.error(`Error adding document: ${error}`)
          })
      })
    },

    /**
     * Unsubscribes the current user from a page
     * @param _path (optional) path to unsubscribe from.
     *
     * if not provided, uses current route.
     */
    async unsubscribe(_path? : string) {
      // dynamic imports
      const { getAuth } = await import("firebase/auth")
      const {
        getFirestore, collection, getDocs, query, where, updateDoc, arrayRemove,
      } = await import("firebase/firestore")
      const db = getFirestore()

      const { path } = useTrimmedPath(_path)
      const { currentUser } = getAuth()

      const q = query(
        collection(db, "subscriptions"),
        where("page", "==", path),
      )

      try {
        const querySnapshot = await getDocs(q)
        const doc = querySnapshot.docs[0]
        updateDoc(doc.ref, {
          subscribers: arrayRemove(currentUser.email),
        })
        // this.updateSubscriptions();
        return true
      } catch (error) {
        console.error("Error getting documents: ", error)
        return false
      }
    },

    /**
     * Gets all subscriptions for the current user
     *
     * @returns {Array} array of all subscriptions
     *
     */
    async updateSubscriptions() {
      // dynamic imports
      const { getAuth } = await import("firebase/auth")
      const {
        getFirestore, collection, getDocs, query, where, onSnapshot,
      } = await import("firebase/firestore")
      if (!this.active) return
      const db = getFirestore()
      const { currentUser } = getAuth()
      if (!currentUser) return

      // get all documents that have user email in subscribers
      const q = query(
        collection(db, "subscriptions"),
        where("subscribers", "array-contains", currentUser?.email),
      )

      // const _results: BlogPostMeta[] = [];
      getDocs(q).then(async (querySnapshot) => {
        const newPaths = Array.from(new Set<string>(
          querySnapshot.docs.map((doc) => {
            const path = doc.data().page
            return useTrimmedPath(path).path
          }).filter((path) => !this.isSubscribed(path)),
        ))

        const pages = querySnapshot.docs.map((doc) => doc.data().page)
        this.subscriptions = new Set<string>([...this.subscriptions].filter((sub) => pages.includes(sub)))

        newPaths.forEach((path) => {
          this.subscriptions.add(path)
        })
      }).catch((error) => {
        console.error("Error getting documents: ", error)
      })

      onSnapshot(q, (newQuerySnapshot) => {
        const paths = Array.from(new Set<string>(
          newQuerySnapshot.docs.map((doc) => {
            const path = doc.data().page
            return useTrimmedPath(path).path
          }).filter((path) => !this.isSubscribed(path)),
        ))

        const pages = newQuerySnapshot.docs.map((doc) => doc.data().page)
        this.subscriptions = new Set<string>([...this.subscriptions].filter((sub) => pages.includes(sub)))

        paths.forEach((path) => {
          this.subscriptions.add(path)
        })
      })
    },

    /**
     * Gets the avatar of the current user.
     *
     * If nonexistent, generates a new one and saves it to the database.
     *
     * @returns the (possibly new) avatar of the current user
     */
    async getUserAvatar() {
      // dynamic imports
      const { getAuth } = await import("firebase/auth")
      const {
        getFirestore, collection, getDocs, query, where, addDoc,
      } = await import("firebase/firestore")
      const db = getFirestore()
      const { currentUser } = getAuth()

      if (!currentUser) {
        // console.error("Call to getUserAvatar with no user logged in.");
        return ""
      }

      const q = query(
        collection(db, "avatars"),
        where("uid", "==", currentUser?.uid),
      )

      return getDocs(q).then((querySnapshot) => {
        // if query is empty, generate new avatar
        if (querySnapshot.size === 0) {
          const avatar = createAvatar(lorelei, {
            seed: `${currentUser?.uid} @ ${new Date().toISOString()}`,
          })

          const newUserAvatar = {
            uid: currentUser.uid,
            avatar: avatar.toString(),
          }

          addDoc(collection(db, "avatars"), newUserAvatar)
          return newUserAvatar.avatar
        } else {
          // get first avatar in querySnapshot
          const doc = querySnapshot.docs[0]
          const userAvatar: string = doc.data().avatar
          return userAvatar
        }
      })
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
      // dynamic imports
      const {
        getFirestore, collection, getDocs, query, where, orderBy, onSnapshot,
      } = await import("firebase/firestore")
      const db = getFirestore()
      const { path } = useTrimmedPath(_path)

      // get comments for the current path
      // sorted by date.
      const q = query(
        collection(db, "comments"),
        where("path", "==", path),
        orderBy("date", "asc"),
      )

      await getDocs(q).then((querySnapshot) => {
        const _results: Comment[] = []
        querySnapshot.forEach((doc) => {
          const comment: Comment = {
            text: doc.data().text,
            author: doc.data().author || "anon",
            avatar: doc.data().avatar,
            date: doc.data().date,
            path: doc.data().page || "",
          }

          _results.push(comment)
        })

        this.currentRouteComments = _results

        onSnapshot(q, (newQuerySnapshot) => {
          const _newResults: Comment[] = []
          newQuerySnapshot.forEach((doc) => {
            const comment: Comment = {
              text: doc.data().text,
              author: doc.data().author || "anon",
              avatar: doc.data().avatar,
              date: doc.data().date,
              path: doc.data().page || "",
            }

            _newResults.push(comment)
          })
          this.currentRouteComments = _newResults
        })
      })
    },

    /**
     * Sends a comment to the database
     *
     * @param comment comment to send
     *
     * @returns true if comment was sent successfully, false otherwise
     */
    async sendComment(comment: Comment) {
      // dynamic imports
      const { getFirestore, collection, addDoc } = await import("firebase/firestore")

      const db = getFirestore()
      //          ^?

      const trimmedPath = useTrimmedPath(comment.path).path

      const _comment = {
        ...comment,
        path: trimmedPath,
      }

      await addDoc(collection(db, "comments"), _comment)
        .then(() => true)
        .catch((error) => {
          console.error("Error adding document: ", error)
          return false
        })

      this.sendEmailToSubs(comment)
    },

    /**
     * Check if active user is subscribed to a given route.
     */
    isSubscribed(_path?: string) {
      const { path } = useTrimmedPath(_path)
      return this.getSubscriptionPaths.includes(path)
    },
  },
})

export default useUserInfo
