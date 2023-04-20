<template>
  <div class="site-search">
    <form class="site-search-form">
      <input
        id="searchbar"
        ref="textBar"
        type="text"
        class="site-search-input"
        tabindex="1"
        placeholder="search @altair.fyi"
      >
      <Icon
        type="search"
        class="search-icon"
        @click="search"
      />
    </form>
  </div>
</template>

<script setup lang="ts">

// const search = () => console.log("search");
const textBar = ref(null);

</script>

<script lang="ts">
export default {
  name: "SearchBar",
  mounted() {
    // console.log("mounted searchBar");
    // console.log(this.$refs.textBar);
  },
  methods: {
    search() {
      // console.log("searching");
    },
    focus() {
      // console.log("focusing");
      this.$refs.textBar.focus();
    },
  },
};
</script>

<style lang="sass">
@use "~/styles/colors"
@use "~/styles/typography"

.site-search-form
  // padding-top: 5px
  // padding-bottom: 5px
  // justify: space-between

  .site-search-input
    width: 100%
    height: 40px
    background: inherit
    font-size: 20px
    margin: 15px 0
    padding-right: 50px
    color: colors.color("primary-highlight")
    font-size: typography.font-size("xl")
    font-family: typography.font("font-sans")

    &::placeholder
      font-size: typography.font-size("xl")
      font-family: typography.font("font-sans")
      color: colors.color("primary-highlight")
      opacity: 0.6

    &::selection
      color: colors.color("primary-highlight")
      opacity: 0.8

  .search-icon
    max-width: 40px
    max-height: 40px
    aspect-ratio: 1/1
    position: absolute
    left: auto
    right: 10px
    top: 15px
    fill: colors.color("primary-highlight")
    stroke: colors.color("primary-highlight")
    opacity: 0.8
    cursor: pointer

  // .menu

</style>
