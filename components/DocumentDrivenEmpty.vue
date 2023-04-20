<template>
  <section class="not-found">
    <div class="not-found-main">
      <div class="not-found-background">
        <span class="error-code">404</span>
        <span class="error-message"> Page empty.</span>
      </div>
      <div class="message-wrapper">
        <p class="error-message-paragraph">
          Target page is empty.
        </p>
        <div class="buttons">
          <button
            class="error-page-button"
            @click="$router.back()"
          >
            Go back
          </button>
          <NuxtLink
            class="error-page-button"
            to="/"
          >
            Go home
          </NuxtLink>
          <NuxtLink
            class="error-page-button"
            to="/blog"
          >
            Show me the blog
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
export default {
  name: "404",
};
</script>

<style lang="sass" scoped>
@use "~/styles/mixins"
@use "~/styles/colors"
@use "~/styles/typography"
@use "~/styles/geometry"

.not-found
  @include mixins.flex-center
  height: max-content
  min-height: 600px

  .not-found-main
    position: absolute
    top: 50%
    left: 50%
    transform: translate(-50%, -50%)
    // background: yellow
    min-width: max(480px, 100vw)

    .not-found-background
      font-family: typography.font("fredericka")
      opacity: 0.3
      z-index: 0
      display: flex
      flex-direction: column
      align-items: center
      // min-height: 0px
      // background: yellow

      .error-code
        font-size: clamp(30px, min(40vw, 30vh), 1000px)

      .error-message
        font-size: min(6vw, clamp(10px, min(8vw, 8vh), 90px))

  .message-wrapper
    display: flex
    flex-direction: column
    align-items: center
    z-index: 1
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100%
    @include mixins.flex-center

    .error-message-paragraph
      font-size: clamp(20px, 2vw, typography.font-size("xl"))
      color: colors.color("primary-highlight")

    .error-page-button
      @include mixins.big-button
</style>
