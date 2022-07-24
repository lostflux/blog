<template>
  <div id="email-root">
    <Side>
      <div class="email-link-wrapper">
        <a v-bind:href="'mailto:' + address ">Reach out to me.</a>
      </div>
    </Side>
  </div>
</template>

<script lang="ts" setup>
  const email = "amittaijoel@outlook.com";
</script>

<script lang="ts">
  const email = "amittaijoel@outlook.com";
  export default {
    name: "Email",
    data() {
      return {
        address: email,
      };
    },
  };
</script>
