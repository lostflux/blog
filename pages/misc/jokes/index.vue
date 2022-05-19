<template>
  <div>
    <h1>Get Random Jokes</h1>
    <div>
      <p>
        This is a placeholder, the real stuff is coming soon!
      </p>
    </div>
  </div>
</template>

<script lang="ts">

  import axios from "axios"
  export default {
    head() {
      return {
        title: "jokes",
        meta: [
          {
            hid: "jokes app",
            name: "jokes",
            content: "random joke generator",
          },
        ],
      }
    },

    data() {
      return {
        jokes: [],
      }
    },

    async created() {
      const config = {
        headers: {
          Accept: "application/json"
        }
      }

      const res =  await axios.get("https://www.databasestar.com/programmer-jokes", config)
    }
  }
</script>
