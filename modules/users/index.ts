// import { lorelei } from "@dicebear/collection";
// import { createAvatar } from "@dicebear/core";
// import { getAuth, onAuthStateChanged, signOut } from "@firebase/auth";
// import {
//     getFirestore
//   , collection
//   , addDoc
//   , getDocs
//   , query
//   , orderBy
//   , where,
// doc,
// setDoc,
// getDoc
// } from "@firebase/firestore";
// import { MarkdownParsedContent } from "@nuxt/content/dist/runtime/types";
// import { getCommentDateAsString } from "~/modules/utils";
// import { useUserInfo } from "~/composables/users";

// // /**
// //  * Comment Interface
// //  */
// // export interface Comment {
// //   text: string,
// //   author: string,
// //   avatar: string,
// //   date: string,
// //   path: string,
// // }

// // export interface BlogPostMeta {
// //   title: string,
// //   path: string,
// //   category: string,
// //   description: string,
// //   date: Date,
// //   image: string,
// // }

// // export interface UserInfo {
// //   active: boolean,
// //   userName: string,
// //   avatar: string,
// //   email: string,
// //   uid: string,
// //   subscriptions: BlogPostMeta[],
// // }

// /**
//  * Subscribes the user to a specific page.
//  *
//  * @param path (optional) path to subscribe to.
//  *
//  * if not provided, uses current route.
//  */
// export async function subscribe(_path? : string){
//   const db = getFirestore();
//   const userInfo = useUserInfo();
//   const { currentUser } = getAuth();
//   var path = _path || useRoute().path;

//   // remove trailing slash if present
//   path = normalizePath(path);

//   const q = query(
//     collection(db, "subscriptions"),
//     where("page", "==", path)
//   );

//   return getDocs(q).then((querySnapshot) => {
//     if (querySnapshot.size == 0) {
//       addDoc(collection(db, "subscriptions"), {
//         page: path,
//         subscribers: [currentUser.email]
//       });
//     } else {
//       querySnapshot.forEach((doc) => {
//         const subscribers = doc.data().subscribers;
//         subscribers.push(currentUser.email);
//         setDoc(doc.ref, {
//           page: path,
//           subscribers: subscribers
//         });
//       });
//     }
//     return true;
//   }).catch((error) => {
//     console.error("Error getting documents: ", error);
//     return false;
//   });
// }

// /**
//  * Unsubscribes the current user from a page
//  * @param _path (optional) path to unsubscribe from.
//  *
//  * if not provided, uses current route.
//  */
// export async function unsubscribe(_path? : string) {
//   const db = getFirestore();

//   var path = _path || useRoute().path;
//   const { currentUser } = getAuth();

//   path = normalizePath(path);

//   const q = query(collection(
//     db, "subscriptions"),
//     where("page", "==", path));

//   try {
//     const querySnapshot = await getDocs(q);
//     querySnapshot.forEach((doc) => {
//       const subscribers = doc.data().subscribers;
//       const remainingSubscribers = subscribers.filter((email) => {
//         return email !== currentUser.email;
//       });
//       setDoc(doc.ref, {
//         page: path,
//         subscribers: remainingSubscribers
//       });
//     });
//     return true;
//   } catch (error) {
//     console.error("Error getting documents: ", error);
//     return false;
//   }
// }

// // /**
// //  * Gets all subscriptions for the current user
// //  *
// //  * @returns array of all subscriptions
// //  *
// //  */
// // export async function getAllSubscriptions() {
// //   const db = getFirestore();
// //   const { currentUser } = getAuth();

// //   // get all documents that have user email in subscribers
// //   const q = query(
// //     collection(db, "subscriptions"),
// //     where("subscribers", "array-contains", currentUser.email)
// //   );

// //   const _results: BlogPostMeta[] = [];
// //   return getDocs(q).then(async (querySnapshot) => {

// //     const paths = Array.from(new Set<string>(
// //       querySnapshot.docs.map((doc) => {
// //         var path = doc.data().page;
// //         return normalizePath(path);
// //       })
// //     ));

// //     await queryContent<MarkdownParsedContent>()
// //       .where({ _path: { $in: paths } })
// //       .find()
// //       .then((data) => {
// //         data.forEach((page) => {
// //           _results.push({
// //             title: page?.title || "",
// //             path: page?._path || "",
// //             category: page?.category[0] || page?.category || '',
// //             description: page?.description || "",
// //             date: page?.date || "",
// //             image: page?.image || "",
// //           });
// //         });
// //       });
// //       return _results;
// //     }).catch((error) => {
// //       console.error("Error getting documents: ", error);
// //       return _results;
// //   });
// // }

// // /**
// //  * Checks if user is subscribed to a specific page
// //  * @param _path (optional) path to check for subscription
// //  *
// //  * @returns true if user is subscribed, false otherwise
// //  *
// //  */
// // export async function syncSubscriptionStatus(_path?: string) {
// //   const db = getFirestore();
// //   const { currentUser } = getAuth();
// //   var path = _path || useRoute().path;

// //   // if user is not logged in, return
// //   if (!currentUser) return false;

// //   path = normalizePath(path);

// //   // query for current page in subscriptions
// //   const q = query(
// //     collection(db, "subscriptions"),
// //     where("page", "==", path)
// //   );

// //   // get all subscriptions
// //   return await getDocs(q).then((querySnapshot) => {
// //     // querySnapshot.docs.forEach((doc) => {
// //     var status = false;
// //     const docs = querySnapshot.docs;

// //     for (let i = 0; i < docs.length; i++) {
// //       const doc = docs[i];
// //       const subscribers = doc.get("subscribers");
// //       status ||= subscribers.includes(currentUser.email);
// //       if (status) break;
// //     }
// //     return status;
// //   }).catch((error) => {
// //     console.error("Error getting document:", error);
// //     return false;
// //   });
// // }

// // /**
// //  * Gets all comments for a specific page
// //  *
// //  * @param _path (optional) path to get comments for
// //  *
// //  * @returns array of comments
// //  *
// //  * Returns empty array if no comments or an error occurs.
// //  */
// // export function getCommentsByRoute(_path?: string) {
// //   const db = getFirestore();
// //   var path = _path || useRoute().path;

// //   // remove trailing slash if present
// //   path = normalizePath(path);

// //   // get comments for the current path
// //   // sorted by date.
// //   const q = query(
// //     collection(db, "comments"),
// //     where("path", "==", path),
// //     orderBy("date", "asc")
// //   );

// //   return getDocs(q).then((querySnapshot) => {
// //     const _results: Comment[] = [];
// //     querySnapshot.forEach((doc) => {

// //       const comment: Comment = {
// //         text: doc.data().text,
// //         author: doc.data().author || "anon",
// //         avatar: doc.data().avatar,
// //         date: doc.data().date,
// //         path: doc.data().page || "",
// //       }

// //       _results.push(comment);
// //     });
// //     return _results;
// //   });
// // }

// /**
//  * Gets the avatar of the current user.
//  *
//  * If nonexistent, generates a new one and saves it to the database.
//  *
//  * @returns the (possibly new) avatar of the current user
//  */
// export async function getUserAvatar() {
//   const db = getFirestore();
//   const { currentUser } = getAuth();

//   if (!currentUser) {
//     console.error("Call to getUserAvatar with no user logged in.");
//     return '';
//   }

//   const q = query(
//     collection(db, "avatars"),
//     where("uid", "==", currentUser.uid)
//   );

//   return getDocs(q).then((querySnapshot) => {

//     // if query is empty, generate new avatar
//     if (querySnapshot.size == 0) {

//       const avatar = createAvatar(lorelei, {
//         seed: `${currentUser?.uid} @ ${new Date().toISOString()}`,
//       });

//       const newUserAvatar = {
//         uid: currentUser.uid,
//         avatar: avatar.toString()
//       }

//       addDoc(collection(db, "avatars"), newUserAvatar);
//       return newUserAvatar.avatar;

//     } else {
//       // get first avatar in querySnapshot
//       const doc = querySnapshot.docs[0];
//       const userAvatar: string = doc.data().avatar;
//       return userAvatar;
//     }
//   });
// }

// /**
//  * Sends a comment to the database
//  *
//  * @param comment comment to send
//  *
//  * @returns true if comment was sent successfully, false otherwise
//  */
// export function sendComment(comment: Comment) {
//   const db = getFirestore();

//   comment.path = normalizePath(comment.path);

//   return addDoc(collection(db, "comments"), comment)
//   .then(() => { return true; })
//   .catch((error) => {
//     console.error("Error adding document: ", error);
//     return false;
//   });
// }

// // export async function sendEmailToSubs(_path: string, comment: Comment) {
// //   const db = getFirestore();
// //   const { currentUser } = getAuth();

// //   const path = normalizePath(_path);

// //   // get subscribers to current page
// //   const q = query(
// //     collection(db, "subscriptions"),
// //     where("page", "==", path)
// //   );

// //   // add notification message to mail collection
// //   getDocs(q).then((querySnapshot) => {

// //     // snapshot should contain single document with array of subscribers
// //     const _rawSubs: Array<Array<string>> =
// //       querySnapshot.docs.map(doc => doc.data().subscribers);

// //     // if subscribers are > 0,
// //     //    create message body with link to current page
// //     //    add message to mail collection

// //     const _subscribers = _rawSubs[0] || [];
// //     _subscribers.filter(email => {
// //       email !== currentUser?.email &&
// //       email.length !== 0
// //     });

// //     if (_subscribers.length === 0) return;
// //     if (comment.text === '') return;

// //     const outMail = {
// //       to: _subscribers,
// //       message: {
// //         subject: `altair.fyi`,
// //         text: `
// //   There is a new comment on a post you are subscribed to.

// //   At ${getCommentDateAsString(new Date(comment.date))}, ${comment.author} said:

// //   ${comment.text}

// //   Check it out here: https://altair.fyi${path}.`,
// //       // html: ''
// //       }
// //     }
// //     // add message to mail collection
// //     return addDoc(collection(db, "mail"), outMail)
// //     .then(() => { return true; })
// //     .catch((error) => {
// //       console.error("Error adding document: ", error);
// //       return false;
// //     });
// //   });
// // }
