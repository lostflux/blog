<template>
  <div id="comments-section" ref="comments" class="comments-section-wrapper hidden">
    <section class="comments">
      <div class="section-title">
        Responses ({{ userInfo.getComments.length }})
      </div>
      <form class="new-comment">
        <template
          v-if="userInfo.active"
        >
          <div class="new-comment-header">
            <div
              alt="avatar"
              class="avatar"
              v-html="userInfo.avatar"
            />
            <div class="username">
              {{ userInfo.getUserName }}
            </div>
            <StyledButton
              class="auth-button"
              type="button"
              @click="() => userInfo.active ? _signOut() : signIn()"
            >
              {{ userInfo.active ? "sign out" : "sign in" }}
            </StyledButton>
          </div>
          <textarea
            id="comment"
            ref="commentTextArea"
            v-model="comment"
            class="input"
            placeholder="Comment"
          />
          <div class="blog-actions">
            <!-- <StyledButton @click="() => { userInfo.toggleSubscription() }"> -->
            <BookMarkIcon
              :active="userInfo.isSubscribed()"
              class="blog-action"
              @click="() => userInfo.toggleSubscription()"
            />
            <NuxtLink to="/blog">
              <ListIcon class="blog-action" />
            </NuxtLink>

            <StyledButton
              class="respond-button"
              type="button"
              @click="submitComment"
            >
              Respond
            </StyledButton>
          </div>
        </template>
        <template v-else>
          <div class="no-active-user">
          <StyledButton
            class="auth-button"
            type="button"
            @click="() => userInfo.active ? _signOut() : signIn()"
          >
            {{ userInfo.active ? "sign out" : "sign in" }}
          </StyledButton>
          </div>
        </template>
      </form>
      <!-- </section> -->
      <!-- </div> -->

      <div class="current-comments">
        <div
          v-if="!userInfo.getComments.length"
          class="no-comments"
        >
          <Alert type="info">
            There are no comments yet. Be the first to comment!
          </Alert>
        </div>

        <template
          v-for="(com, i) in userInfo.getComments"
          :key="i"
        >
          <BlogComment
            :id="i"
            :comment="com"
            class="comment"
          />
        </template>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
const variable = ref(0);
const { textarea: commentTextArea, input: comment } = useTextareaAutosize();

const comments = ref(null);
onClickOutside(comments, () => {
  console.log(`clicked outside`);
  comments.value.classList.add("hidden");
});
</script>

<script lang="ts">
import { getAuth, onAuthStateChanged, signOut } from "@firebase/auth";
import { normalizePath } from "~/modules/utils";
import useUserInfo from "~/composables/users";
import type { Comment } from "~/modules/utils";


export default {
  name: "BlogComments",

  data() {
    return {
      // comment: "",
      // allComments: new Array<Comment>(),
      showAuthPopup: false,
      // avatar: '',
      userDependency: 0,
      // subscribed: false,
      showAllSubscriptions: false,
      // allSubscriptions: [],
      userInfo: useUserInfo(),
    };
  },

  computed: {

    /**
     * Get the currently logged in user.
     *
     * The target is undefined in SSR mode, so ignore in SSR mode.
     */
    currentUser() {
      this.userDependency;
      // ignore in SSR mode.
      if (typeof document === "undefined") return null;

      const { currentUser } = getAuth();

      return currentUser;
    },

    /**
     * Check if a user is logged in.
     *
     * The target is undefined in SSR mode, so ignore in SSR mode.
     */
    isLoggedIn() {
      this.userDependency;
      // ignore in SSR mode.
      if (typeof document === "undefined") return false;

      return !!this.currentUser;
    },
  },

  watch: {

    /**
     * Show authentication popup
     * when flag is set.
     */
    showAuthPopup() {
      if (this.showAuthPopup && typeof document !== "undefined") {
        document.getElementById("auth-form-container")
          .classList.remove("hidden");
        this.showAuthPopup = false;
      }
    },

    /**
     * Refresh relevant components
     * when the user dependency changes.
     */
    userDependency() {
      this.$forceUpdate();
    },

    userInfo() {
      // this.toggleUserDependency();
      this.$forceUpdate();
    },
  },

  /**
   * On mount (client-side only),
   *
   * do some initial setup.
   */
  mounted() {
    // this._updateComments();

    const auth = getAuth();
    onAuthStateChanged(auth, () => {
      this.toggleUserDependency();
    });
  },

  methods: {

    // reset auth visibility
    resetAuthVisibility() {
      this.showAuthPopup = false;
    },

    /**
     * Toggles whether all subs for current user are shown or not.
     */
    refreshSubscriptions() {
      this.showAllSubscriptions = !this.showAllSubscriptions;
    },

    toggleUserDependency() {
      this.userDependency = (this.userDependency + 1) % 100;
    },

    async _signOut() {
      const auth = getAuth();

      await signOut(auth);
    },

    signIn() {
      this.showAuthPopup = true;
    },

    /**
     * Submit a comment to the database.
     *
     * If user is not logged in, show login popup.
     *
     * If user is logged in but has no avatar,
     *   generate an avatar and submit comment.
     */
    submitComment() {
      if (comment.value === '') return;

      console.log("submitting;....")

      const { path } = useRoute();

      // if user not logged in, show login popup
      const auth = getAuth();
      const { currentUser } = auth;

      if (!currentUser) {
        this.signIn();
        return;
      }
      const newComment: Comment = {
        text: comment.value,
        author: currentUser?.displayName,
        avatar: this.userInfo.avatar,
        date: new Date().toISOString(),
        path: normalizePath(path),
      };
      this.userInfo.sendComment(newComment);
      // reset comment
      comment.value = "";
    },
  },
};
</script>

<style lang="sass" scoped>
@use "~/styles/typography"
@use "~/styles/colors"
@use "~/styles/geometry"
@use "~/styles/mixins"
@use "~/styles/default"

.styled-button::hover
  cursor: pointer
  text-decoration: none !important
  background: yellow !important

.comments-section-wrapper
  position: fixed
  top: 0
  right: 0
  background: colors.color("light-background")
  z-index: 1
  height: 100vh
  z-index: 100
  overflow-y: scroll
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.7)
  width: 414px
  
  @media only screen and (max-width: 720px)
    width: 100%
    height: 90vh
    top: 10vh
    border-radius: 30px 30px 0 0
    padding: 0 10px

  &::-webkit-scrollbar
    display: none

  &.hidden
    display: none
    pointer-events: none

section.comments
  margin: 0 10px 20px 10px
  border-top: 1px solid colors.color("lightest-background")
  padding-bottom: 0
  -webkit-transition: all 0.1s ease-in-out
  -ms-transition: all 0.1s ease-in-out
  -moz-transition: all 0.1s ease-in-out
  -o-transition: all 0.1s ease-in-out
  transition: all 0.1s ease-in-out
  pointer-events: all


  .new-comment
    width: 100%
    height: 100%
    border-radius: 5px
    padding: 0 20px
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5)

    .new-comment-header
      height: 50px
      display: flex
      flex-direction: row
      align-items: center

      margin-bottom: 20px
      width: 100%

      .avatar
        height: 100%
        aspect-ratio: 1/1

      .username
        margin-left: 10px
        margin-top: 10px
        font-weight: 600
        color: colors.color("secondary-highlight")
        width: fit-content

      .auth-button
        margin-left: auto
        height: fit-content

    .input
      width: 100%
      background: none

      &::placeholder
        color: colors.color("dark-foreground")

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
    margin: 2rem 0

    .signed-in-info
      white-space: pre-line

      a
        @include mixins.inline-link

        &:hover
          cursor: pointer

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
        font-size: 16px

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

.blog-actions
  display: flex
  flex-direction: row
  gap: 20px
  position: relative
  padding: 20px 0

  .blog-action
    height: 30px
    width: 40px
    aspect-ratio: 1/1

  .respond-button
    // align self to right of parent

    margin: 0
    margin-left: auto
    background: rgba(colors.color("primary-highlight"), 0.5)
    color: colors.color("lightest-background")

.comments
  display: flex
  flex-direction: column
  gap: 30px

  .comment
    background: inherit
    border-bottom: 1px solid colors.color("lightest-background")
    margin-top: 20px


</style>
