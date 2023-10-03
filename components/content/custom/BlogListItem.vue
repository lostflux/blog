<template>
  <div
    class="blog-list-item"
  >
    <div class="blog-list-item-head">
      <div class="date">
        {{ date }}
      </div>

      <ProseA
        class="blog-list-item-category"
        :href="path"
        fancy
        lowercase
      >
        {{ mainCategory }}
      </ProseA>
    </div>
    <ProseA
      class="blog-list-item-title"
      :href="blog._path"
      fancy
      uppercase
    >
      {{ title }}
    </ProseA>
  </div>
</template>
<script lang="ts">
export default {
  name: "BlogListItem",
  props: {
    blog: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    // const { path } = useTrimmedPath();
    // eslint-disable-next-line vue/no-setup-props-destructure
    const mainCategory = props.blog.category[props.blog.category.length - 1];
    const mainCategoryPath = useNavigationRoutes()[mainCategory];
    return {
      // eslint-disable-next-line vue/no-setup-props-destructure
      date: new Date(props.blog.date).toLocaleDateString("en-US", {
        month: "2-digit",
        day: "2-digit",
      }),
      title: props.blog.subtitle || props.blog.title,
      mainCategory,
      path: mainCategoryPath.path || "",
    };
  },
};
</script>
<style lang="sass" scoped>
@use "@/styles/colors"
@use "@/styles/typography"

.blog-list-item
  width: 100%
  display: flex
  flex-direction: column
  vertical-align: middle
  padding-right: 0.5rem
  justify-content: space-between
  color: inherit
  position: relative

  .blog-list-item-title
    width: 80%
    height: 2rem
    overflow: hidden
    text-overflow: ellipsis
    font-size: typography.font-size(s)
    line-height: 1.2
    margin-bottom: 0.5rem

  .blog-list-item-head
    color: colors.color(dark-foreground)
    font-weight: 400
    line-height: 2
    display: inline-flex
    justify-content: space-between

    .blog-list-item-category
      text-align: right
      height: 1.5rem
      max-width: 20ch
      font-size: typography.font-size(xxs)
      overflow: hidden
      text-overflow: ellipsis
      white-space: nowrap
</style>
