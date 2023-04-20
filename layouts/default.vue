<template>
  <meta
    name="viewport"
    content="width=device-width, initial-scale=1, shrink-to-fit=no"
  >
  <div id="root">
    <AppHeader />
    <body class="navy">
      <!-- header in body == not sticky -->
      <main>
        <a
          class="skip-to-content"
          href="#content"
        />
        <!-- <body> -->
        <div class="container">
          <slot id="content" />
        </div>
        <!-- <slot id="content"/> -->
      </main>
      <AppFooter class="default-footer" />
    </body>
  </div>
</template>

<script setup lang="ts">
import { getAuth, onAuthStateChanged } from "@firebase/auth";
import useUserInfo from "~/composables/users";

onMounted(() => {
  const userInfo = useUserInfo();
  // listen for auth state changes
  const auth = getAuth();
  userInfo.update();
  onAuthStateChanged(auth, () => {
    // update user info
    userInfo.update();
  });
});
</script>

<style lang="sass">
@use "~/styles/default"
// @use "~/styles/colors"

// #root
//   // background: url("~/assets/images/noise.svg") !important

  // body
  //   background-image: url("~/assets/images/noise.svg") !important
  //   background: rgba(colors.color("background"), 0.1) !important

.container
  // max-width: 1000px
  margin: 0 auto
</style>
