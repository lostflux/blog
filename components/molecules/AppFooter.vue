<template>
  <footer class="styled-footer">
    <div class="footer-inner">
      <div class="styled-links">
        <StyledButton href="/">
          home
        </StyledButton>
        <StyledButton href="/blog">
          blog
        </StyledButton>
      </div>
      <div class="styled-credit-section">
        <NuxtLink
          to="https://github.com/siavava/altair"
          target="_blank"
          class="year"
        >
          {{ new Date().getFullYear() }} Amittai. All rights reserved.
        </NuxtLink>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
// import { social } from '~/modules/config';

// interface GitHubInfo {
//   stars?: Number;
//   forks?: Number;
//   watchers?: Number;
// }

// const repoInfo = ref<GitHubInfo>({} as GitHubInfo);

// await fetch('https://api.github.com/repos/siavava/altair')
// .then((response) => {
//   response.json()
//   .then((data) => {
//     repoInfo.value = {
//       stars: data?.stargazers_count || 0,
//       forks: data?.forks || 0,
//       watchers: data?.watchers_count || 0,
//     }
//   });
// });

</script>

<script lang="ts">
export default {
  name: "AppFooter",
};
</script>

<style lang="sass" scoped>
@use "../styles/footer"
@use "../styles/mixins"
@use "../styles/typography"
@use "../styles/colors"

.styled-footer
  @include mixins.flex-center
  flex-direction: row
  min-height: 70px
  padding: 30px
  border-top: 2px solid colors.color("light-background")
  color: colors.color("primary-highlight")
  display: flex
  flex-direction: column

  .footer-inner
    @include mixins.flex-between
    width: 100%
    max-width: 848px

  .styled-links
    width: fit-content
    display: inline-flex
    gap: 10px

    @media screen and (max-width: 768px)
      display: none

  .styled-credit-section
    color: inherit
    line-height: 3
    font-size: 0.8em
    display: inline-flex
    justify-content: space-between
    color: colors.color("primary-highlight")

    @media screen and (max-width: 768px)
      margin: 0 auto

    .year
      width: fit-content
      font-size: typography.font-size("m")

      &:hover
        scale: 1.01
        color: colors.color("secondary-highlight")

      &::before
        content: "©"
        font-family: typography.font("sans-serif")

    .github-stats
      font-family: typography.font("monospace")
      font-size: typography.font-size("xxs")
      align-self: flex-start
      // margin-top: 10px

      & > span
        display: inline-flex
        align-items: center
        margin: 0 7px

      svg
        display: inline-block
        margin-right: 5px
        width: 14px
        height: 14px

</style>
