<template>
  <div>
    <h1>About Me</h1>
    <p>
      Hello! I'm Amittai, a student and aspiring systems engineer from Kenya.
      I am currently studying at Dartmouth College, where I dabble in
      Computer Science, Mathematics, and Psychology.
      What else? Are we together? Here is some more text.
    </p>
  </div>
</template>

<script lang="ts">

  export default {
    head() {
      return {
        title: "About Me",
        meta: [
          {
            name: "description",
            content: "About Me",
          },
        ],
      }
    },
  };
</script>
