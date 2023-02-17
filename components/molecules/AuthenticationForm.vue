<template>
  <div class="auth-form">
    <h1 class="title">Sign In</h1>
    <form class="">
      <input
        type="email"
        id="email"
        class="input"
        placeholder="Email"
        v-model="email"
      />
      <input
        type="password"
        id="password"
        class="input"
        placeholder="Password"
        v-model="password"
      />
      <div class="button-container">
        <button
          class="button"
          type="button"
          @click="signIn"
        >
          Sign In
        </button>
      </div>
    </form>
  </div>
</template>
<script lang="ts">

import { createUserWithEmailAndPassword, getAuth } from '@firebase/auth';

export default {
  name: 'AuthenticationForm',

  // data
  data() {
    return {
      email: '',
      password: '',
    };
  },

  methods: {
    // signIn
    signIn() {

      
      const auth = getAuth();
      console.log(`signIn: ${this.email}, ${this.password}`);

      createUserWithEmailAndPassword(auth, this.email, this.password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(`user: ${user}`)
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.error(`errorCode: ${errorCode}, errorMessage: ${errorMessage}`)
          // ..
        })

      // TODO: Sign in with Firebase

    },
  },
};
</script>

<style lang="sass" scoped>
@use "~/styles/default"
@use "~/styles/typography"
@use "~/styles/colors"
@use "~/styles/geometry"
@use "~/styles/mixins"

.auth-form
  margin: 5rem auto
  font-size: 20px
  color: colors.color("primary-highlight")
  font-size: typography.font-size("xl")
  font-family: typography.font("font-sans")
  align-content: center
  max-width: 500px

  .title
    font-size: typography.font-size("xxl")
    font-family: typography.font("font-sans")
    color: colors.color("primary-highlight")
    width: fit-content
    margin: 0 auto
    text-align: center
    margin-bottom: 2rem

  .input
    width: 100%
    background: inherit
    font-size: 20px
    margin: 0 auto
    height: 3em
    color: colors.color("primary-highlight")
    font-size: typography.font-size("xl")
    font-family: typography.font("font-sans")

    border-top: 1px solid colors.color("lightest-background")

    // add bottom border to last of type
    &:last-of-type
      border-bottom: 1px solid colors.color("lightest-background")



    &::placeholder
      font-size: typography.font-size("xl")
      font-family: typography.font("font-sans")
      color: colors.color("primary-highlight")
      opacity: 0.6

    &::selection
      color: colors.color("primary-highlight")
      opacity: 0.8

  .button-container
    width: max-content
    margin: 0 auto

    .button
      @include mixins.big-button
      margin: 1rem auto

</style>
