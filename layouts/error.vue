<template>
  <div class="error-page">
    <h1 v-if="error.statusCode === 404">Oops!</h1>
    <h1 v-else>An error occurred</h1>
      <h2>{{ error.statusCode }}</h2>
    <nuxt-link to="/">Home page</nuxt-link>
  </div>
</template>

<script>
  export default {
    props: ['error'],
    layout: 'error' // you can set a custom layout for the error page
  }
</script>
