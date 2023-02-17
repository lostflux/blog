<template>
  <div class="auth-form-container" @click.self="closePopUp">
    <div class="auth-form">
      <h1 class="title">Sign In</h1>
      <StyledTabList class="tab-list">
        <StyledTabButton
          v-for="pane, i in panes"
          :identifier="i"
          class="tab-button"
          ref="tabButtons"
          :tabindex="activeTabId === i ? '0' : '-1'"
          :aria-controls="`panel-${i}`"
          :aria-selected="activeTabId === i ? true : false"
          @click="
            () => {
              setActiveTabId(i);
              selectTab(i);
            }"
          role="tab"
        > 
        {{ pane }}
        </StyledTabButton>
      </StyledTabList>
      <StyledTabPanels class="tab-panels">
        <StyledTabPanel
          v-for="pane, i in panes"
          :key="i"
          :identifier="i"
          ref="tabs"
          role="tabpanel"
          :id="`panel-${1}`"
          class="tab-panel"
        >
          <div class="sign-in-context">
            {{ i == 0
              ? 'Sign in to your account.'
              : 'Create a new account.'
             }}
          </div>
          <form class="">
            <input
              type="username"
              id="username"
              class="input"
              placeholder="username"
              v-model="username"
              v-if="i == 1"
            />
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
                @click="() => {i == 0 ? signIn() : signUp()}"
              >
                {{ i == 0 ? 'Sign In' : 'Sign Up' }}
              </button>
            </div>
          </form>
        </StyledTabPanel>
      </StyledTabPanels>
    </div>
  </div>
</template>

<script lang="ts" setup>
const panes = ['Sign In', 'Sign Up'];
// const closePopUp = () => {
//   console.log('closePopUp');
//   if (typeof document != 'undefined') {
//     const authFormContainer = document.getElementById('auth-form-container');
//     if (authFormContainer) {
//       authFormContainer.classList.add('hidden');
//     }
//   }
// };


const tabs = ref([]);
const tabButtons = ref([]);
var highlight = ref(null);

var activeTabId = 0;
const tabFocus = new NumRefManager(panes.length - 1);

const setActiveTabId = (id: number) => {

  // mute old tab if active
  tabs.value[activeTabId]?.muteTab();

  // change active tab to current
  tabFocus.value = id;

  activeTabId = id;
  tabs.value[activeTabId]?.activateTab();

  // show the corresponding tab panel
  highlight.value?.highlight(id)

  console.log(`active tab id: ${activeTabId}`)

}

const focusTab = () => {
  tabButtons.value[tabFocus.value]?.focus();
};

var selectedTab = 0;
const selectTab = (id: number) => {
  if (id !== selectedTab) {
    tabButtons.value[selectedTab]?.deselect();
    selectedTab = id;
    tabButtons.value[selectedTab]?.select();
  }
};

// Only re-run the effect if tabFocus changes
watch(tabFocus.ref, focusTab);


</script>

<script lang="ts">

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  getAuth
} from '@firebase/auth';
import { NumRefManager } from '~/src/utils';

export default {
  name: 'AuthenticationForm',

  // data
  data() {
    return {
      username: '',
      email: '',
      password: ''
    };
  },

  methods: {
    // sign up
    signUp() {

      const validation = [
        !(this.username.length < 5),
        !(this.email.length < 5),
        !(this.password.length < 5),
      ]

      if (!validation.every((v) => v)) {
        console.error('validation error');
        return;
      }

      
      const auth = getAuth();
      console.log(`signUp: ${this.email}, ${this.password}`);

      createUserWithEmailAndPassword(auth, this.email, this.password)
        .then((userCredential) => {
          // Signed in
          const user = auth.currentUser;
          updateProfile(user, {
            displayName: this.username,
          })

          console.log(`user: ${user}`)
          // ...
          // close sign-in popup after sign-in;
          this.closePopUp();
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.error(`errorCode: ${errorCode}, errorMessage: ${errorMessage}`)
          // ..
        })

    },

    // sign in
    signIn() {
      const auth = getAuth();
      console.log(`signIn: ${this.email}, ${this.password}`);

      signInWithEmailAndPassword(auth, this.email, this.password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(`user: ${user}`)
          // ...
          // close sign-in popup after sign-in;
          this.closePopUp();
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.error(`errorCode: ${errorCode}, errorMessage: ${errorMessage}`)
          // ..
        })
    },
    closePopUp() {
      console.log('closePopUp');
      if (typeof document != 'undefined') {
        const authFormContainer = document.getElementById('auth-form-container');
        if (authFormContainer) {
          authFormContainer.classList.add('hidden');
        }
      }
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

.auth-form-container
  position: fixed
  top: 0
  left: 0
  width: 100%
  height: 100%
  display: block
  background: colors.color("dark-background")
  // z-index: 11
  background-color: rgba(colors.color("dark-background"), 0.9)
  // mouse-events: none
  
  &.hidden
    display: none

  .tab-list
    // @apply mixins.flex-center
    display: flex-column
    width: fit-content
    margin: 0 auto

  .tab-button
    @apply mixins.flex-center
    min-width: geometry.var("tab-width")
    width: geometry.var("tab-width")
    padding: 0 15px
    border-left: 0
    border-bottom: 2px solid colors.color("lightest-background")
    text-align: center
    display: inline

  .tab-panels
    min-height: 400px
    margin: 0

.auth-form
  margin: 40vh auto
  font-size: 20px
  color: colors.color("primary-highlight")
  font-size: typography.font-size("xl")
  font-family: typography.font("font-sans")
  align-content: center
  max-width: 600px
  opacity: 1
  padding: 2rem 2rem 0rem 2rem
  border: 1px solid colors.color("lightest-background")
  border-radius: 0.5rem
  background-color: colors.color("dark-background")
  
  position: relative
  z-index: 20
  pointer-events: auto

  .title
    font-size: typography.font-size("xxl")
    font-family: typography.font("font-sans")
    color: colors.color("primary-highlight")
    width: fit-content
    margin: 0 auto
    text-align: center
    margin-bottom: 2rem

  .sign-in-context
    color: colors.color("primary-foreground")
    margin: 2rem 1rem
    line-height: 1.5rem
    color: colors.color("foreground")

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
