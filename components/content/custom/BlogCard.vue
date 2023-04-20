<template>
  <div class="blog-card">
    <!-- <NuxtLink :to="blog.path" class="blog-click">
      <Icon type="expand-diagonal" class="expand-article-icon" />
    </NuxtLink> -->
    <!-- <h1 class="blog-title">
      {{ blog.title }}
    </h1>
    <div class="blog-description">
      {{ blog.description }}
    </div> -->
    <Date :date="blog.date" />
    <!-- <div v-if="blog.date" class="blog-date">
      {{ getCommentDateAsString(new Date(blog.date)) }}
    </div> -->
    <ContentRenderer
      v-if="blog.excerpt"
      :value="blog"
      :excerpt="true"
    />
    <img
      alt="blog image"
      class="blog-image"
      :src="`${blog._path}/${blog.image}`"
    >
    <div class="blog-actions">
      <NuxtLink
        :to="blog._path"
        class="blog-click"
      >
        <StyledButton
          type="danger"
          size="small"
          class="blog-card-button"
        >
          view
        </StyledButton>
      </NuxtLink>
      <StyledButton
        type="danger"
        size="small"
        class="blog-card-button"
        @click="() => { toggleSubscription(blog._path) }"
      >
        {{ userInfo.isSubscribed(blog._path) ? 'Unsubscribe' : 'Subscribe' }}
      </StyledButton>
    </div>
  </div>
</template>

<script lang="ts">
import { ParsedContent } from "@nuxt/content/dist/runtime/types";
import useUserInfo from "~/composables/users";

export default {
  name: "BlogList",
  props: {
    blog: {
      type: Object as () => ParsedContent,
      required: true,
    },
  },
  data() {
    return {
      userInfo: useUserInfo(),
    };
  },
  methods: {
    toggleSubscription(blogPath: string) {
      this.userInfo.toggleSubscription(blogPath);
    },
  },
};
</script>

<style lang="sass" scoped>
@use "~/styles/colors"
@use "~/styles/geometry"
@use "~/styles/typography"
@use "~/styles/mixins"

.blog-card
  @include mixins.box-shadow
  min-width: 400px
  max-width: 400px
  // width: 400px
  // aspect-ratio: 2.5/3
  padding: 1rem
  margin: 1rem 1rem 0 1rem
  background: colors.color("light-background")
  border-radius: geometry.var("border-radius")
  display: flex
  flex-direction: column
  font-size: typography.font-size("m")
  z-index: 0

  // translate the card up when hovered
  &:hover
    -webkit-transform: translateY(-0.5rem)
    -ms-transform: translateY(-0.5rem)
    -o-transform: translateY(-0.5rem)
    transform: translateY(-0.5rem)

    -webkit-transition: transform 0.1s ease-in
    -moz-transition: transform 0.1s ease-in
    -o-transition: transform 0.1s ease-in
    transition: transform 0.1s ease-in

  .blog-title
    font-weight: 600
    font-size: 1.5rem
    margin-bottom: 1rem
    color: colors.color("secondary-highlight")

  .blog-description
    font-size: 1rem
    margin-bottom: 1rem
    color: colors.color("white")

  .blog-image
    margin-bottom: 1rem
    margin-top: 1rem
    @include mixins.box-shadow
    border-radius: geometry.var("border-radius")
    max-height: 200px
    object-fit: cover

  .blog-actions
    width: fit-content
    height: fit-content
    margin-top: auto
    .blog-card-button
      margin: 0.5rem auto !important
      border: 2px solid colors.color("lightest-background")

      &:not(first-of-type)
        margin-left: 1rem !important

  .blog-click
    pointer-events: all
    float: right
    z-index: 20 !important

    &::hover
      cursor: pointer !important

    .expand-article-icon
      width: 30px
      height: 30px
      color: colors.color("secondary-highlight")

      &::hover
        cursor: pointer

</style>
