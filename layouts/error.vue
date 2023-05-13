<template>
  <meta
    name="viewport"
    content="width=device-width, initial-scale=1, shrink-to-fit=no"
  >
  <div class="error-page">
    <h1 v-if="error.statusCode === 404">
      Oops!
    </h1>
    <h1 v-else>
      An error occurred
    </h1>
    <h2>{{ error.statusCode }}</h2>
    <nuxt-link to="/">
      Home page
    </nuxt-link>
  </div>
</template>

<script lang="ts">
export default {
  props: ["error"],
  layout: "error", // you can set a custom layout for the error page
}
</script>

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
