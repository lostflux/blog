<template>
  <div class="blog-hero" />
  <div class="blog-list-container">
    <div
      v-if="userInfo.getSubscriptionCount"
      class="blog-category"
    >
      <!-- <div v-for="blog in blogs.filter(blog => blog.category.)" -->
      <div class="blog-category-section-title">
        Subscribed
      </div>
      <!-- <Button class="scroll-button left">
        &lt;
      </Button>
      <Button class="scroll-button right">
        &gt;
      </Button> -->
      <div class="horizontal-scroll">
        <BlogCard
          v-for="(blog, i) in blogsSubscribedTo(blogs)"
          :key="i"
          :blog="blog"
        />
      </div>
    </div>

    <div
      v-for="(category, i) in categories"
      :key="i"
      class="blog-category"
    >
      <div class="blog-category-section-title">
        {{ category }}
      </div>
      <!-- <Button class="scroll-button left">
        &lt;
      </Button>
      <Button class="scroll-button right">
        &gt;
      </Button> -->
      <div class="horizontal-scroll">
        <BlogCard
          v-for="blog in blogsByCategory(category)"
          :key="blog.id"
          :blog="blog"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ParsedContent } from "@nuxt/content/dist/runtime/types";
import useUserInfo from "~/composables/users";

export default {
  name: "BlogList",
  props: {
    subscribedOnly: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      userInfo: useUserInfo(),
    };
  },
  methods: {
    toggleSubscription(blogPath: string) {
      if (this.userInfo.isSubscribed(blogPath)) {
        this.userInfo.unsubscribe(blogPath);
      } else {
        this.userInfo.subscribe(blogPath);
      }
    },

    blogsSubscribedTo(allBlogs: ParsedContent[]) {
      return allBlogs.filter((blog) => {
        return this.userInfo.isSubscribed(blog._path);
      });
    },
  },
};
</script>

<script lang="ts" setup>

const { data: blogs } = await useAsyncData(
  `blogs-${useRoute().path}`,
  async () => {
    const _blogs = queryContent("blog/posts")
      .where({ draft: false })
      .sort({ date: -1 })
      .find();
    return _blogs;
  },
);

const categories = new Set<string>();
blogs.value.forEach((blog) => {
  if (typeof blog.category === "string") {
    categories.add(blog.category);
  } else {
    blog.category.forEach((category) => {
      categories.add(category);
    });
  }
});

const blogsByCategory = (category: string) => {
  return blogs.value.filter((blog) => {
    if (typeof blog.category === "string") {
      return blog.category === category;
    } else {
      return blog.category.includes(category);
    }
  });
};

</script>

<style lang="sass" scoped>
@use "~/styles/colors"
@use "~/styles/typography"
@use "~/styles/mixins"
@use "~/styles/geometry"

.blog-list-container
  display: flex-row

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

.blog-category
  display: flex-column
  width: 100%
  position: relative
  border-top: 1px solid colors.color("lightest-background")
  padding: 30px 0

  .blog-category-section-title
    color: colors.color("secondary-highlight")
    font-weight: 500
    width: fit-content
    text-transform: lowercase

    padding: 0 0 0 20px

.scroll-button
  position: absolute
  width: 50px
  height: 200px
  top: 31%
  background-color: rgba(colors.color("dark-background"), 0.3)
  background-filter: blur(50px)
  color: colors.color("secondary-highlight")
  display: flex
  justify-content: center
  align-items: center
  cursor: pointer
  z-index: 1
  transition: all 0.2s ease-in-out

  &:hover
    background-color: rgba(colors.color("light-background"), 0.5)

  &.left
    left: 0

  &.right
    right: 0

.horizontal-scroll
  display: flex
  flex-wrap: nowrap
  overflow-x: scroll
  width: 100%
  position: relative

  &::-webkit-scrollbar
    display: none

</style>
