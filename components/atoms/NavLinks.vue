<template>
  <div class="nav-links">
    <ol v-for="{ name, url }, i in navLinks">
      <TransitionGroup :component="null">
        <Transition :key="i" :class="fadeDownClass" :timeout="timeout">
          <li
            :key="i"
            :style="isHome ? { transitionDelay: '100ms' } : { transitionDelay: '0ms' }"
          >
            <NuxtLink
              :to="url"
              class="nav-link"
            >
              {{ name }}
        </NuxtLink>
          </li>
        </Transition>
      </TransitionGroup>
    </ol>
    <TransitionGroup>
      <Transition :class="fadeDownClass" :timeout="timeout">
        <div :style="isHome ? { transitionDelay: '100ms' } : { transitionDelay: '0ms' }">
          <a 
            class="resume-button"
            href="~/assets/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            Resume
          </a>
        </div>
      </Transition>
    </TransitionGroup>
  </div>
</template>

<script lang="ts" setup>
  import { navLinks } from "~/src/config";
  import { loaderDelay } from '~/src/utils';

  const isHome = useRoute().path === "/";

  const timeout = isHome ? loaderDelay : 0;
  const fadeClass = isHome ? 'fade' : '';
  const fadeDownClass = isHome ? 'fadedown' : '';
</script>

<script lang="ts">
  export default {
    name: "NavLinks",
  }
</script>

<style lang="sass">


@use "~/styles/colors"
@use "~/styles/typography"
@use "~/styles/geometry"
@use "~/styles/mixins"

  
.nav-links
  display: flex
  align-items: center
  // position: relative
  // float: right

  @media (max-width: 768px)
    display: none
  
  ol
    @include mixins.flex-between
    padding: 0
    margin: 0
    list-style: none
    // display: flex

    li
      margin: 0 5px
      position: relative
      counter-increment: item 1
      font-size: typography.font-size("xs")
      // float: left

      a
        padding: 10px
        
        &:before
          content: '0' counter(item) '.'
          margin-right: 5px
          color: colors.color("green")
          font-size: typography.font-size("xxs")
          text-align: right

.resume-button
  @include mixins.small-button
  margin-left: 15px
  font-size: typography.font-size("xs")
</style>
