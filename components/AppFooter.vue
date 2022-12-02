<template>
  <footer class="styled-footer">
    <div class="styled-social-links">
      <ul>
        <li
          v-for="(link, i) in social"
          :key="i"
        >
          <NuxtLink
            :href="link.url"
            aria-label="link to my {{ link.name }} page"
          >
            <Icon :type="link.name" />
      </NuxtLink>
        </li>
      </ul>
    </div>
    <div class="styled-credit-section">
      <div>
        &copy {{ new Date().getFullYear() }}, Altair
      </div>

      <div
        class="github-stats"
      >
        <span>
          <Icon type="star" />
          <span> {{ gitHubInfo.stars }}</span>
        </span>
        <span>
          <Icon type="fork" />
          <span> {{ gitHubInfo.forks }}</span>
        </span>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { social } from '~/src/config';
// import { useEffect } from '~~/src/stateful';

const gitHubInfo = ref({
  stars: 20,
  forks: 23,
  watchers: 564,
});

// useEffect(() => {
//   fetch('https://api.github.com/users/siavava/repos/tau')
//   .then(res => res.json())
//   .then(data => {
//     gitHubInfo.value = {
//       stars: data.stargazers_count,
//       forks: data.forks_count,
//       watchers: data.watchers_count,
//     };
//   })
//   .catch(err => console.error(err));
// }, []);


</script>

<script lang="ts">
  export default {
    name: "AppFooter"
  }
</script>

<style lang="sass" scoped>
@use "../styles/footer"
@use "../styles/mixins"
@use "../styles/typography"
@use "../styles/colors"

.styled-footer
  @include mixins.flex-center
  flex-direction: column
  height: auto
  min-height: 70px
  padding: 15px
  text-align: center

.styled-credit-section
  color: inherit
  font-family: typography.font("font-mono")
  font-size: typography.font-size("xxs")
  line-height: 1

  a
    padding: 10px

  .github-stats
    margin-top: 10px

    & > span
      display: inline-flex
      align-items: center
      margin: 0 7px

    svg
      display: inline-block
      margin-right: 5px
      width: 14px
      height: 14px

.styled-social-links
  display: block
  width: 100%
  max-width: 270px
  margin: 0 auto 10px
  margin: 0 auto 10px
  color: colors.color("light-slate")

  @media (max-width 768px)
    display: block
    width: 100%
    max-width: 270px
    margin: 0 auto 10px
    color: colors.color("light-slate")

  ul
    @include mixins.flex-between
    padding: 0
    margin: 0
    list-style:  none


    a
      padding: 10px

      svg
        width: 20px
        height: 20px
        stroke-width: 3px


</style>
