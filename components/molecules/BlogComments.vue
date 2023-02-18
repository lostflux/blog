<template>
  <section class="comments">
    <h1 class="section-title">Comments</h1>

    <div class="current-comments">
      <div
        v-if="!allComments.length"
        class="no-comments"
      >
        <Alert type="info">

          There are no comments yet. Be the first to comment!
        </Alert>
      </div>
  
      <template v-for="comment in allComments">
        <div class="comment" v-if="comment.text" :key="comment.id">
          <div class="comment-header">
            <div class="author">
              <div
                  v-if="comment.avatar"
                  class="author-avatar"
                  v-html="comment.avatar"
                />
              <div class="author-name">
                {{ comment.author }}
              </div>
            </div>
            <span
              class="comment-date"
              v-if="comment.date"
            >
              {{ getCommentDateAsString(comment.date) }}
            </span>
          </div>
          <div class="comment-body">
            {{ comment.text }}
          </div>
        </div>
      
      </template>
    </div>


    <div class="new-comment">
      <h2 class="section-subtitle">Thoughts?</h2>
      <p v-if="!isLoggedIn" class="signed-in-info">
        You are not signed in. <br/>
        Please sign in to comment.

        <br/>
        <br/>

        The development of sophisticated language and communication skills
        <a href="https://www.theguardian.com/science/punctuated-equilibrium/2011/aug/04/1">
          redefined human evolution
        </a>
        and, quite possibly, sparked the sequence of
        events that led to modern civilization.
      <br/>
      <br/>
        There is so much to get &mdash; and so much to give &mdash;
        when we share thoughts, ideas, and opinions responsibly.
      <br />
        Let the world know what you think;
        <strong class="username"> your ideas do matter </strong>.
      <br/>
      <br/>
        I'll admit: sharing ideas can be scary,
        especially when we are not even sure about them.
        <br/>
        If you can, that's amazing.
        If not, a start is better than nothing.
      </p>
      <p v-else class="signed-in-info">
        
      <br/>

        You are signed in as <strong class="username">{{ currentUser.displayName }}</strong>.
        
      <br/>
      <br/>

        The development of sophisticated language and communication skills
      <a href="https://www.theguardian.com/science/punctuated-equilibrium/2011/aug/04/1">
        redefined human evolution
      </a>
        and, quite possibly, sparked the sequence of
        events that led to modern civilization.
      <br/>
      <br/>
        There is so much to get &mdash; and so much to give &mdash;
        when we share thoughts, ideas, and opinions responsibly.
      <br />
        Let the world know what you think;
        <strong class="username"> your ideas do matter </strong>.
      <br/>
      <br/>
        I'll admit: sharing ideas can be scary,
        especially when we are not even sure about them.
      <br/>
        If you can, that's amazing.
        If not, a start is better than nothing.
      </p>
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
            comment
          </button>
          <button
            v-if="isLoggedIn"
            class="button"
            type="button"
            @click="_signOut"
          >
            sign out
          </button>
          <button
            v-else
            class="button"
            type="button"
            @click="signIn"
          >
            sign in
          </button>
        </div>
      </form>
    </div>
  </section>
</template>

<script lang="ts" setup>

// get comment date as string.
// if date is today, return time
// if date is yesterday, return 'yesterday'
// if less than 5 days ago, return number of days.
// else, return date as string
function getCommentDateAsString(date: Date) {
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);
  const daysAgo = new Date();
  daysAgo.setDate(today.getDate() - 5);

  if (date.toDateString() == today.toDateString()) {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  } else if (date.toDateString() == yesterday.toDateString()) {
    return 'Yesterday';
  } else if (date > daysAgo) {
    return `${Math.floor((today.getTime() - date.getTime()) / (1000 * 3600 * 24))} days ago`;
  } else {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  });
  }
}

</script>

<script lang="ts">
import { getAuth, onAuthStateChanged, signOut } from "@firebase/auth";
import {
    getFirestore
  , collection
  , addDoc
  , getDocs
  , query
  , orderBy
  , where
} from "@firebase/firestore";

import { createAvatar } from '@dicebear/core';
import { lorelei } from '@dicebear/collection';

// comment interface
interface Comment {
  id: string,
  text: string,
  author: string,
  avatar: string,
  date: Date,
}

export default {
  name: 'BlogComments',

  // data
  data() {
    return {
      comment: '',
      allComments: [],
      showAuthPopup: false,
      avatar: '',
      userDependency: 0
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
      const { path } = useRoute();
      
      const q = query(collection(db, "comments"), where("path", "==", path), orderBy("date", "asc"));
      getDocs(q)
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {


            // ignore if instance already in array
            if (this.allComments.find(c => c.id === doc.id)) return;

            // otherwise, construct and append.
            const comment: Comment = {
              id: doc.id,
              text: doc.data().text,
              author: doc.data().author || "anon",
              avatar: doc.data().avatar,
              date: new Date(doc.data().date),
            }
            
            this.allComments.push(comment);
          });
        });
        
    },



    toggleUserDependency() {
      this.userDependency = (this.userDependency + 1) % 100;
    },



    _signOut() {
      const auth  = getAuth();
      
      signOut(auth);
    },



    signIn() {
      this.showAuthPopup = true;
    },



    // submitComment
    submitComment() {

      if (!this.comment) return;
      
      const { path } = useRoute();

      // if user not logged in, show login popup
      const auth  = getAuth();
      const { currentUser } = auth;
      
      
      if (!currentUser) {
        this.signIn();
        return;
      }
      
      const db = getFirestore();
      
      // if user has no avatar,
      //  (1) query for avatar
      //    (2) if no avatar, generate new one, and also push to db.
      if (!this.avatar) {
        
        // query for avatar
        const q = query(collection(db, "avatars"), where("uid", "==", currentUser?.uid));
        getDocs(q)
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              this.avatar = doc.data().avatar || '';
            });
          });
        
        // if no avatar, generate new one, and also push to db
        if (this.avatar === '') {
          const avatar = createAvatar(lorelei, {
            seed: `${currentUser?.uid} @ ${new Date().toISOString()}`,
          });
          const _avatar = avatar.toString();
          const newUserAvatar = {
            uid: currentUser?.uid,
            avatar: _avatar
          }
          addDoc(collection(db, "avatars"), newUserAvatar);
          this.avatar = avatar.toString();
        }

      }

      const newComment = {
        text: this.comment,
        author: currentUser?.displayName,
        avatar: this.avatar,
        date: new Date().toISOString(),
        path: path
      }
      
      addDoc(collection(db, "comments"), newComment)
        .catch((error) => {
          console.error("Error adding document: ", error);
        });

      // update comments!
      this.updateComments();
      this.comment = '';
      
    },
  },


  computed: {
    currentUser() {
      this.userDependency;
      // ignore in SSR mode.
      if (typeof document == 'undefined') return;

      return getAuth().currentUser;
    },
    isLoggedIn() {
      this.userDependency;
      // ignore in SSR mode.
      // if (typeof document == 'undefined') return false;

      return this.currentUser ? true : false;
    }
  },
  mounted () {
    this.updateComments();

    const auth  = getAuth();
    onAuthStateChanged(auth, () => {
      this.avatar = '';

      setTimeout(() => {
        this.toggleUserDependency();
      }, 1000)
    });
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

  .username
    color: colors.color("secondary-highlight")

  .new-comment
    padding-top: 2rem
    margin: 2rem

    .signed-in-info
      white-space: pre-line
      
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
      display: flex
      flex-direction: row
      gap: min(5rem, 10vw)

      .button
        @include mixins.big-button
        margin: 1rem auto

  .current-comments
    .zero-comment-disclaimer-icon
      width: 30px
      font-size: 2rem
      color: colors.color("secondary-highlight")
      margin-bottom: 1rem
    .comment
      margin: 1.5em
      padding: 1.5em
      border: 1px solid colors.color("lightest-background")
      border-radius: 0.5rem
      line-height: 1.5

      .comment-body
        white-space: pre-line
        line-height: 1.3

      .comment-header
        margin: 0.5rem 0 1rem 0
        .author
          display: inline-flex
          width: 100%
          min-height: 30px
          .author-avatar
            width: 30px
            height: 30px
            border-radius: 50%
            margin-right: 0.5rem

          .author-name
            font-weight: 600
            width: fit-content
            height: fit-content
            vertical-align: middle
            color: colors.color("secondary-highlight")
            bottom: 0
            transform: translateY(30%)
          
        .comment-date
          font-size: 0.8rem
          color: colors.color("primary-highlight")
          text-align: left

</style>
