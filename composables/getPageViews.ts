import type { Query } from "firebase/firestore"
import { defineStore } from "pinia"
import { withoutTrailingSlash } from "ufo"

export default defineStore("pageViews", {

  state: () => reactive(new Map<string, number>()),

  // getters: {
  // },
  actions: {
    async getViews(_path: string, increment: boolean = false) {
      const path = withoutTrailingSlash(_path)

      // else, get from firebase
      const {
        getFirestore,
        collection,
        query,
        where,
      } = await import("firebase/firestore")

      const db = getFirestore()

      const q = query(
        collection(db, "pageViews"),
        where("path", "==", path),
      )

      // listener for changes in the count
      // onSnapshot(q, async (querySnapshot) => {
      //   const newCount = querySnapshot.docs[0].data().count
      //   // console.log(`newCount: ${newCount}`)
      //   this.$state[path] = newCount
      // })

      if (increment) {
        await this.increment(path, q)
      } else {
        await this.fetch(path, q)
      }

      // return the count
      return this.$state[path]
    },

    async fetch(path, q: Query) {
      const {
        collection,
        addDoc,
        getDocs,
        getFirestore,
      } = await import("firebase/firestore")

      const db = getFirestore()

      await getDocs(q)
        .then(async (querySnapshot) => {
          if (querySnapshot.empty) {
            // add a new doc with a count of 1
            addDoc(collection(db, "pageViews"), {
              path,
              count: 1,
            })

            this.$state[path] = 1
          } else {
            // expect only ONE result
            this.$state[path] = querySnapshot.docs[0].data().count
          }
        })
    },

    async increment(path: string, q) {
      const {
        collection,
        addDoc,
        updateDoc,
        getDocs,
        getFirestore,
      } = await import("firebase/firestore")

      const db = getFirestore()

      // increment count where path matches
      await getDocs(q)
        .then((querySnapshot) => {
          // if no result, add a new doc with a count of 1
          if (querySnapshot.empty) {
            addDoc(collection(db, "pageViews"), {
              path,
              count: 1,
            })
          } else {
            // if there is a result, increment the count by 1
            // note: expect only ONE result
            const docRef = querySnapshot.docs[0].ref
            this.$state[path] = querySnapshot.docs[0].data().count + 1

            updateDoc(docRef, {
              count: querySnapshot.docs[0].data().count + 1,
            })
          }
        })
    },
  },
})
