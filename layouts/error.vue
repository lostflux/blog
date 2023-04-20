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
</script>

<script setup lang="ts">
import { getAuth, onAuthStateChanged } from "@firebase/auth";
import { useUserInfo } from "~~/composables/users";

export default {
  props: ["error"],
  layout: "error", // you can set a custom layout for the error page
};

onMounted(() => {
  const { updateUserInfo } = useUserInfo();
  // listen for auth state changes
  const auth = getAuth();
  updateUserInfo();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // update user info
      updateUserInfo();
    }
  });
});
</script>
