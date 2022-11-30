<template>
  <button
    class="styled-button"
    :id="`styled-button-${identifier}`"
    :style="style"
  >
    <slot />
  </button>
</template>

<script lang="ts">

const _colorGreen = "#64ffda";

  export default {
    name: "StyledButton",
    props: {
      identifier: {
        type: Number,
        required: true,
      },
    },
    methods: {
      focus() {
        document.getElementById(`styled-button-${this.$props.identifier}`)?.focus();
      },
      select() {
        this.selected = true;
      },
      deselect() {
        this.selected = false;
      },
    },
    data() {
      return {
        // initially, the first tab is active.
        selected: this.$props.identifier === 0 ? true : false,
      };
    },
    computed: {
      style() {
        if (this.selected) {
          return `aria-selected: true; color: ${_colorGreen}`;
        } else {
          return `aria-selected: false`;
        }
      },
    },

    watch: {
      selected(newSelected: boolean) {
        console.log(`selected changed to ${newSelected}`);
        console.log(`style is ${this.style}`);
        
        // re-render the component
        this.$forceUpdate();
      },
    },
  }
</script>

<style lang="sass" scoped>
@use "~/styles/colors"
@use "~/styles/typography"
@use "~/styles/geometry"
@use "~/styles/mixins"

.styled-button
  @include mixins.link
  display: flex
  align-items: center
  width: 100%
  height: geometry.var("tab-height")
  padding: 0 20px 2px
  border-left: 2px solid colors.color("lightest-navy")
  background-color: transparent
  font-family: typography.font("font-mono")
  font-size: typography.font-size("xs")
  text-align: left
  white-space: nowrap

  @media (max-width: 768px)
    padding: 0 15px 2px
  
  @media (max-width: 600px)
    @apply mixins.flex-center
    min-width: 120px
    padding: 0 15px
    border-left: 0
    border-bottom: 2px solid colors.color("lightest-navy")
    text-align: center
  
  &:hover, &:focus-visible, &:focus
    background-color: colors.color("light-navy")

  &:active
    color: colors.color("green")

</style>
