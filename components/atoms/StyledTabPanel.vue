<template>
  <div
    class="styled-tab-panel"
    v-show="active === 1"
  >
    <slot />
  </div>
</template>

<script lang="ts">

export default {
  name: "StyledTabPanel",
  props: {
    identifier: {
      type: Number,
      required: true,
    }
  },
  data() {
    return {
      // initially, the first tab is active.
      active: this.$props.identifier === 0 ? 1 : 0,
    };
  },
  methods : {
    activateTab() {
      console.log(`activated tab!!`);
      this.active = 1;
    },
    muteTab() {
      console.log(`muted tab!!`);
      this.active = 0;
    },
    focus() {
      console.log(`focusing tab!!`);
      this.$refs.tab.focus();
    },
  },
}
</script>

<style lang="sass">

@use "~/styles/mixins"
@use "~/styles/typography"
@use "~/styles/colors"

.styled-tab-panel
  width: 100%
  height: auto
  padding: 10px 5px
  position: absolute    // fix jumping content when switching tabs
  // background: yellow
  top: 0
  bottom: 0
  left: 0
  right: 0
  overflow: auto
  ul
    @include mixins.styled-list
    
  
  h3 
    margin-bottom: 2px
    font-size: typography.font("xxl")
    font-weight: 500
    line-height: 1.3

    .company 
      color: colors.color("green")
    
  
  .range 
    margin-bottom: 25px
    color: colors.color("light-slate")
    font-family: typography.font("font-mono")
    font-size: typography.font-size("xs")
</style>
