<template>
  <!-- <div> -->
    <!-- <div class="hero"> -->
    <section>

      <ContentDoc
        path="profile/hero"
        class="hero"
        tag="div"

      />
    </section>
      <!-- <template v-for="{level, content} in items">
        <h1 v-if="level === 'h1'"> {{ content }} </h1>
        <h2 v-else-if="level === 'h2'" class="big-heading"> {{ content }} </h2>
        <h3 v-else-if="level === 'h3'" class="big-heading"> {{ content }} </h3>
        <p v-else-if="level === 'p'"> {{ content }} </p>
        <a
          v-else-if="level === 'a'"
          href="mailto:amittaijoel@outlook.com"
          class="email-link"
          target="_blank"
          rel="noreferrer"
        > {{ content }} </a>
      
      </template> -->
    <!-- </div> -->

  <!-- </div> -->
</template>

<script lang="ts" setup>
import { useState, useEffect } from "~/src/stateful";

const { data } = await useAsyncData(
  `profile-hero-${useRoute().path}`,
  async () => {
    const _projectsData = queryContent("profile/hero")
      .findOne();
    return await _projectsData;
});

</script>

<script lang="ts">
export default {
  name: "Hero",
}
</script>

<style lang="sass">
@use "~/styles/mixins"
@use "~/styles/colors"
@use "~/styles/typography"

.hero
  @include mixins.flex-center
  flex-direction: column
  align-items: flex-start
  min-height: 100vh
  padding: 0  // fix alignment ?
  // justify-content: center
  // box-sizing: border-box
  // max-width: 1000px
  position: static

  @media (max-width: 480px) and (min-height: 700px)
    padding-bottom: 10vh

  h1
    margin: 0 0 30px 4px
    color: colors.color("green")
    font-family: typography.font("font-mono")
    font-size: clamp(typography.font-size("s"), 5vw, typography.font-size("m"))
    font-weight: 400

    @media (max-width: 480px)
      margin: 0 0 20px 2px
    
  h3
    margin-top: 10px
    color: colors.color("slate")
    line-height: 0.9
  
  p p
    margin: 20px 0 0
    max-width: 540px
  
  .email-link
    @include mixins.big-button
    margin-top: 50px
    color: colors.color("lightest-slate")
    
    border: none  // remove terrible border
</style>
