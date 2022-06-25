<template>
  <div id="email-root">
    <Side>
      <div className="email-link-wrapper">
        <a href="mailto:{{ email }}">{email}</a>
      </div>
    </Side>
  </div>
</template>

<script setup>
const email = "amittaijoel@outlook.com";
</script>
<script lang="ts">
export default {
  name: "Email",
  data() {
    return {
      email: "amittaijoel@outlook.com",
    };
  },
};
</script>
