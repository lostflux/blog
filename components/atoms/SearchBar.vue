<template>
  <div class="site-search">
    <form class="site-search-form">
      <input
        type="text"
        class="site-search-input"
        id="searchbar"
        tabindex="1"
        placeholder="search @altair.fyi"
        ref="textBar"
      />
    <Icon type="search" class="search-icon" @click="search" />
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
  methods: {
    search() {
      // console.log("searching");
    },
    focus() {
      // console.log("focusing");
      this.$refs.textBar.focus();
    },
  },
  mounted() {
    // console.log("mounted searchBar");
    // console.log(this.$refs.textBar);
  },
}
</script>

<style lang="sass">
@use "~/styles/colors"
@use "~/styles/typography"

.site-search-form
  padding-top: 5px
  padding-bottom: 5px
  justify: space-between

  .site-search-input
    width: 100%
    height: 100%
    background: inherit
    border: none
    font-size: 20px
    padding: 20px
    line-height: 130%
    color: colors.color("green")
    font-size: typography.font-size("xl")
    font-family: typography.font("font-sans")

    &::placeholder
      font-size: typography.font-size("xl")
      font-family: typography.font("font-sans")
      color: colors.color("green")
      opacity: 0.4

    &::selection
      color: colors.color("green")
      opacity: 0.8

  .search-icon
    max-width: 42px
    max-height: 42px
    // margin-top: 10px
    // margin-right: 10px
    // float: right
    position: absolute
    left: auto
    right: 10px
    top: 15px
    fill: colors.color("green")
    stroke: colors.color("green")
    opacity: 0.8
    cursor: pointer

  // .menu

</style>
