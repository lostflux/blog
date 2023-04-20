<template>
  <div
    class="ham-box-inner"
    :class="menuOpen ? 'menu-open' : 'menu-closed'"
  >
    <slot />
  </div>
</template>

<script lang="ts">
export default {
  name: "HamBoxInner",
  props: {
    menuOpen: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    openStatus() {
      return this.menuOpen ? "menu-open" : "menu-closed";
    },
  },
};
</script>
