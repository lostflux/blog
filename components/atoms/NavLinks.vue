<template>
  <div class="home-links">
    <template v-if="(isHome && menuIsCollapsed)">
      <ol v-for="{ name, url }, i in homeLinks">
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
    </template>
  </div>
</template>

<script lang="ts" setup>
  import { navLinks } from "~/src/config";
  import { loaderDelay } from '~/src/utils';

  const { homeLinks } = navLinks;

  const { path } = useRoute();
  const isHome = path === "/";
  const menuIsCollapsed = ref(true);

  const timeout = isHome ? loaderDelay : 0;
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

  
.home-links
  display: flex
  margin: 0 auto

  @media (max-width: 768px)
    display: none

  ol
    @include mixins.flex-between
    padding: 0
    margin: 0
    list-style: none

    li
      margin: 0 5px
      position: relative
      counter-increment: item 1
      font-size: typography.font-size("xs")

      a
        padding: 10px
        
        &:before
          content: '0' counter(item) '.'
          margin-right: 5px
          color: colors.color("green")
          font-size: typography.font-size("xxs")
          text-align: right

</style>
