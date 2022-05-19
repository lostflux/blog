<template>
  <div>
    <h1>misc</h1>
    <div>
      <button class="nav-button">
        <nuxt-link to="/misc/jokes">Get Random Jokes</nuxt-link>
      </button>
    </div>
    <div>
      <p>
        This is a placeholder, the real stuff is coming soon!
      </p>
    </div>
  </div>
</template>

<script lang="ts">
  export default {
    head() {
      return {
        title: "misc",
        meta: [
          {
            name: "misc",
            content: "other random stuff",
          },
        ],
      }
    },
  }
</script>

<style lang="sass">

  .nav-button
    padding: 0rem

    h1
      margin-bottom: 2rem

  button
    margin-top: 2rem

</style>
