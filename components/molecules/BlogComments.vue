<template>
  <section class="comments">
    <h1 class="section-title">Comments</h1>

    <div class="current-comments">
      <div
        v-if="!allComments.length"
        class="no-comments"
      >
        There are no comments yet. Be the first to comment!
      </div>
  
      <div class="comment" v-for="comment in allComments" :key="comment.id">
        <div class="comment-header">
          <div class="comment-author">
            <!-- <img
              class="comment-author-avatar"
              :src="comment.avatar"
              :alt="comment.author"
            /> -->
            <div class="comment-author-name">
              {{ comment.author }}
            </div>
          </div>
          <div class="comment-date">
            {{ comment.date }}
          </div>
        </div>
        <div class="comment-body">
          {{ comment.text }}
        </div>
      </div>
    </div>


    <div class="new-comment">
      <h2 class="section-subtitle"> We'd love to hear your thoughts!</h2>
      <form class="form">
        <textarea
          id="comment"
          class="input"
          placeholder="Comment"
          v-model="comment"
        />
        <div class="button-container">
          <button
            class="button"
            type="button"
            @click="submitComment"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { getFirestore, collection, addDoc, getDocs } from "@firebase/firestore";


const db = getFirestore();

const comments = ref([]);

const querySnapshot = await getDocs(collection(db, "comments"));
querySnapshot.forEach((doc) => {
  console.log(`${doc.id} => ${doc.data()}`);
});

</script>

<script lang="ts">
import { getAuth } from "@firebase/auth";
import { unHashPath, hashPath } from "~/src/utils/paths";
export default {
  name: 'BlogComments',

  // data
  data() {
    return {
      comment: '',
      allComments: []
    };
  },

  methods: {
    // update comments
    updateComments() {
      const db = getFirestore();
      const auth = getAuth();
      const { currentUser} = auth;
      const { path } = useRoute();

      this.allComments = [];
      const comments = [];
      getDocs(collection(db, "comments"))
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            console.log(`${doc.id} => ${doc.data()}`);
            const comment = {
              id: doc.id,
              text: doc.data().text,
              author: doc.data().author,
              date: doc.data().date,
            }
            comments.push(comment);
          });
          // get user info
          const usersRef = collection(db, "users");
          comments.forEach( (comment) => {
            const q = query(usersRef, where("state", "==", "CA"));
          getDocs(collection(db, "users"))
            .then((querySnapshot) => {
                // find user with matching author id
                querySnapshot.
              }
              this.allComments = comments;
            })
            .catch((error) => {
              console.log("Error getting documents: ", error);
            });
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
    },


    // submitComment
    submitComment() {
      if (!this.comment) {
        return;
      }

      console.log(`Comment: ${this.comment}`);
      
      const db = getFirestore();
      const auth = getAuth();
      const { currentUser} = auth;
      const { path } = useRoute();
      const newComment = {
        text: this.comment,
        author: currentUser?.uid || "Anonymous",
        date: new Date().toISOString(),
        path: path
      }
      
      addDoc(collection(db, "comments"), newComment)
        .then((docRef) => {
          console.log("Document written with ID: ", docRef.id);
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });

      console.log(`newComment: ${newComment}`);


      // update comments!
      this.updateComments();
      
    },
  },
  mounted () {
    this.updateComments();
  }
};


function where(arg0: string, arg1: string, arg2: string): any {
throw new Error("Function not implemented.");
}

function query(citiesRef: any, arg1: any) {
throw new Error("Function not implemented.");
}
</script>

<style lang="sass" scoped>
@use "~/styles/typography"
@use "~/styles/colors"
@use "~/styles/geometry"
@use "~/styles/mixins"
@use "~/styles/default"

section.comments
  margin-top: 20px
  margin-bottom: 20px
  border-top: 1px solid colors.color("lightest-background")
  padding-top: 3em !important
  padding-bottom: 0

  .section-title
    color: colors.color("secondary-highlight")
    margin-top: 1rem
    margin-bottom: 1rem
    font-weight: 600
    font-size: 1.5rem
    
  .section-subtitle
    color: colors.color("secondary-highlight")

  .new-comment
    padding-top: 2rem
      
    .form

      .input
        width: 100%
        height: 10rem
        background-color: inherit
        margin-top: 1rem
        padding: 1rem
        border: 1px solid colors.color("lightest-background")
        border-radius: 0.5rem


    .button-container
      width: max-content
      margin: 0 auto

      .button
        @include mixins.big-button
        margin: 1rem auto

  .current-comments
    .comment
      margin: 1.5em
      padding: 1.5em
      border: 1px solid colors.color("lightest-background")
      border-radius: 0.5rem
      line-height: 1.5
</style>
