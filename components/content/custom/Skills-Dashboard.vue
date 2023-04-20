<template>
  <div class="skills-dashboard">
    <slot />
  </div>
</template>

<script lang="ts">
export default {
  name: "SkillsDashboard",
};
</script>

  <style lang="scss">
  @use "~/styles/colors";
  .skills-dashboard {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    grid-gap: 1rem;
    column-rule: 1px solid colors.color("primary-highlight");
    grid-row: auto;

  }
  </style>
