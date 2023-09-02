<template>
  <button
    :id="`styled-button-${identifier}`"
    :class="selected ? 'styled-tab-button selected' : 'styled-tab-button'"
    :style="style"
  >
    <slot />
  </button>
</template>

<script lang="ts">

export default {
  name: "StyledButton",
  props: {
    identifier: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      // initially, the first tab is active.
      selected: this.$props.identifier === 0,
    };
  },
  computed: {
    style() {
      if (this.selected) {
        return "aria-selected: true;";
      } else {
        return "aria-selected: false";
      }
    },
  },

  watch: {
    selected(newSelected: boolean) {
      this.$forceUpdate();
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
};
</script>

<style lang="sass" scoped>
@use "@/styles/colors"
@use "@/styles/typography"
@use "@/styles/geometry"
@use "@/styles/mixins"

.styled-tab-button
  @include mixins.link
  display: flex
  align-items: center
  width: 100%
  height: geometry.var("tab-height")
  padding: 0 20px 2px
  border-left: 2px solid colors.color("lightest-background")
  background-color: transparent
  font-family: typography.font("monospace")
  font-size: typography.font-size("xs")
  text-align: left
  white-space: nowrap

  @media (max-width: 768px)
    padding: 0 15px 2px

  @media (max-width: 600px)
    @apply mixins.flex-center
    min-width: geometry.var("tab-width")
    width: geometry.var("tab-width")
    padding: 0 15px
    border-left: 0
    border-bottom: 2px solid colors.color("lightest-background")
    text-align: center

  &:hover, &:focus-visible, &:focus
    background-color: colors.color("light-background")

  &:active
    color: colors.color("primary-highlight")

  &.selected
    color: colors.color("primary-highlight")
    font-weight: 600

</style>
