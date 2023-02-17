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
  
      <template v-for="comment in allComments">
        <div class="comment" v-if="comment.text" :key="comment.id">
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
              <span
                class="comment-date"
                v-if="comment.date"
              >
                <!-- show date as Day, Mon YYYY -->
                {{ new Date(comment.date).toLocaleDateString('en-US',
                  { 
                    weekday: 'long',
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })
                }}
              </span>
            </div>
            <!-- <div class="comment-date">
            </div> -->
          </div>
          <div class="comment-body">
            {{ comment.text }}
          </div>
        </div>
      
      </template>
    </div>


    <div class="new-comment">
      <h2 class="section-subtitle">Thoughts?</h2>
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

</script>





<script lang="ts">
import { getAuth, signOut } from "@firebase/auth";
export default {
  name: 'BlogComments',

  // data
  data() {
    return {
      comment: '',
      allComments: [],
      showAuthPopup: false,
    };
  },
  watch: {
    showAuthPopup() {
      if (this.showAuthPopup && typeof document != 'undefined') {
        document.getElementById('auth-form-container')
          .classList.remove('hidden');
          this.showAuthPopup = false;
      }
    }
  },

  methods: {
    // reset auth visibility
    resetAuthVisibility() {
      this.showAuthPopup = false;
    },
    // update comments
    updateComments() {
      const db = getFirestore();
      const auth = getAuth();
      const { currentUser} = auth;
      const { path } = useRoute()

      this.allComments = [];
      // const comments = [];
      getDocs(collection(db, "comments"))
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            console.log(`${doc.id} => ${doc.data()}`);
            const comment = {
              id: doc.id,
              text: doc.data().text,
              author: doc.data().author || "Anonymous",
              date: doc.data().date || null,
            }
            this.allComments.push(comment);
          });
        });
        
      // sort comments by date
      this.allComments.sort((a, b) => {
        const aDate = a.date ? new Date(a.date) : null;
        const bDate = b.date ? new Date(b.date) : null;
        return aDate
          ? (bDate ? (aDate.valueOf() - bDate.valueOf()) : 1)
          : (bDate ? -1 : 0);
      });

          
    },


    // submitComment
    submitComment() {
      if (!this.comment) return;

      // if user not logged in, show login popup
      const auth  = getAuth();
      const { currentUser } = auth;
      
      
      if (!currentUser) {
        this.showAuthPopup = true;
        return;
      } else {
        console.log(`currentUser: ${currentUser.email}`);

        // TODO: REMOVE -- sign out current user
        signOut(auth);
      }

      console.log(`Comment: ${this.comment}`);
      
      const db = getFirestore();
      // const auth = getAuth();
      // const { currentUser} = auth;
      const { path } = useRoute();
      const newComment = {
        text: this.comment,
        author: currentUser?.displayName,
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
        opacity: 0.5

        &:active, &:focus
          opacity: 1


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

      .comment-header
        margin: 0.5rem 0 1rem 0
        .comment-author
          .comment-author-name
            font-weight: 600
            // margin-bottom: 0.5rem
            width: 100%
            text-align: left
            color: colors.color("secondary-highlight")
          
          .comment-date
            font-size: 0.8rem
            color: colors.color("primary-highlight")
            text-align: left

</style>
