<template>
  <Square margin="0%">
    <div class="blog-list-container">
      <ProseH1
        v-if="title"
        :id="title"
      >
        {{ title }}
      </ProseH1>
      <div
        v-for="year in years"
        :key="year"
        class="blog-list-year"
      >
        <div class="blog-list-year-title">
          {{ year }}
        </div>
        <ul class="blog-list">
          <BlogListItem
            v-for="(blog, i) in blogs.filter((blog) => new Date(blog.date).getFullYear() === year)"
            :key="i"
            :blog="blog"
          />
        </ul>
      </div>
      <div style="padding: 0 40px;">
        <RouterButtons />
      </div>
    </div>
  </Square>
</template>

<script lang="ts">
export default {
  name: "BlogList",
  props: {
    category: {
      type: Array<string>,
      default: [],
    },
    title: {
      type: String,
      default: "",
    },
  },
  async setup(props) {
    // eslint-disable-next-line vue/no-setup-props-destructure
    const { category } = props;
    const { data: blogs } = category.length
      ? await useAsyncData(
        `blogs-list-${category.join("-")}`,
        async () => {
          const _blogs = await queryContent()
            .where({ draft: false })
            .where({ category: { $containsAny: props.category } })
            .only(["title", "date", "category", "_path"])
            .sort({ date: -1 })
            .find();
          return _blogs;
        },
      )
      : await useAsyncData(
        async () => {
          const _blogs = await queryContent()
            .where({ draft: false })
            .where({ category: { $contains: "long-form" } })
            .only(["title", "date", "category", "_path"])
            .sort({ date: -1 })
            .find();
          return _blogs;
        },
      );

    const _years = blogs.value.map((blog) => new Date(blog.date).getFullYear());
    const years = [...new Set(_years)];
    return {
      blogs, years,
    };
  },
  data() {
    return {
      userInfo: useUserInfo(),
    };
  },
};
</script>

<style lang="sass">
@use "@/styles/colors"
@use "@/styles/typography"
@use "@/styles/mixins"
@use "@/styles/geometry"

.blog-list-container
  width: 100%
  line-height: 3
  font-size: typography.font-size(m)
  color: colors.color(lightest-foreground)
  align-self: flex-start

  @media (max-width: 640px)
    font-size: typography.font-size(xs)

  *
    transition: all 50ms ease-in-out

  &:hover
    color: colors.color(foreground)

  .blog-list-title
    margin-bottom: 5rem
    font-size: 1rem
    font-weight: 500
    color: colors.color(lightest-foreground)

  .blog-list-year
    @include mixins.split
    border-top: 1px solid colors.color(light-background)
    padding-top: 1em
    gap: 1em

    .blog-list-year-title
      width: 15%
      color: colors.color(foreground)
      font-weight: 400
      line-height: 2

    .blog-list
      width: 85%

</style>
