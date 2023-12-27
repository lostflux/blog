<template>
  <div
    class="blog-list-item"
  >
    <div class="blog-list-item-head">
      <div
        v-if="date"
        class="date"
      >
        {{ date }}
      </div>
    </div>
    <ProseA
      class="blog-list-item-title"
      :href="blog._path"
      fancy
      uppercase
    >
      {{ title }}
    </ProseA>
    <ProseP v-if="description" class="description">
      {{ description }}
    </ProseP>
    <ContentRendererMarkdown v-else-if="excerpt" :value="excerpt" class="description"/>
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
    return {
      // eslint-disable-next-line vue/no-setup-props-destructure
      date: props.blog.date ? new Date(props.blog.date).toLocaleDateString("en-US", {
        month: "2-digit",
        day: "2-digit",
      }) : null,
      title: props.blog?.title,
      description: props.blog?.description || "",
      excerpt: props.blog?.excerpt || "",
    }
  },
}
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
  margin-bottom: 1.5rem

  .description
    color: colors.color(dark-foreground)
    font-weight: 400
    line-height: 1.5
    font-size: typography.font-size(s)
    margin-bottom: 0.5rem
    margin-top: 0
    padding-top: 0
    max-width: 40ch

  .blog-list-item-title
    width: 80%
    height: 2rem
    overflow: hidden
    text-overflow: ellipsis
    font-size: typography.font-size(s)

  .blog-list-item-head
    color: colors.color(dark-foreground)
    font-weight: 400
    line-height: 1
    display: inline-flex
    justify-content: space-between

    .date
      font-size: typography.font-size(xxs)
      font-weight: 500
      line-height: 2
      color: colors.color(light-foreground)
      text-align: right
      height: 1rem
      max-width: 20ch
      overflow: hidden
      text-overflow: ellipsis
      white-space: nowrap

    .blog-list-item-category
      text-align: right
      height: 1.5rem
      max-width: 20ch
      font-size: typography.font-size(xxs)
      overflow: hidden
      text-overflow: ellipsis
      white-space: nowrap
</style>
