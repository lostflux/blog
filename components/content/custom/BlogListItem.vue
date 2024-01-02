<template>
  <div
    class="blog-list-item"
  >
    <div class="blog-list-item-head">
      <!-- <div
        v-if="date"
        class="date"
      >
        {{ date }}
      </div> -->
      <Date
        v-if="props.blog.date"
        :date="props.blog.date"
      />
      <ClientOnly>
        <BlogViews :path="blog._path" />
      </ClientOnly>
    </div>
    <ProseA
      class="blog-list-item-title"
      :href="blog._path"
      fancy
      uppercase
    >
      {{ title }}
    </ProseA>
    <ContentRendererMarkdown
      v-if="description"
      :value="description"
      class="description"
    />
  </div>
</template>

<script setup lang="ts">
// @ts-ignore
// eslint-disable-next-line import/no-unresolved
import markdownParser from "@nuxt/content/transformers/markdown"

const props = defineProps<{
  blog: {
    title: string
    description: string
    excerpt: string
    date: string
    category: string
    _path: string
  }
}>()

// const date = props.blog.date ? new Date(props.blog.date).toLocaleDateString("en-US", {
//   month: "2-digit",
//   day: "2-digit",
// }) : null

const title = computed(() => {
  let _title = props.blog.title.split("|")[0]
  if (_title.toLowerCase() === "alt") {
    _title = "archive"
  }
  return _title
})

const description = props.blog.description
  ? await markdownParser.parse(`description-${props.blog._path}`, props.blog.description)
  : props.blog.excerpt || ""

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
  padding-top: 3em
  justify-content: space-between
  color: inherit
  position: relative
  margin-bottom: 2rem
  font-size: typography.font-size(xs)

  .description
    color: colors.color(dark-foreground)
    font-weight: 400
    line-height: 1.5
    margin-bottom: 0.5rem
    margin-top: 0
    padding-top: 0
    max-width: 40ch

    font-size: typography.font-size(m)
    @media screen and (min-width: 800px)
      font-size: typography.font-size(l)

    &:last-of-type
      padding-bottom: 1em
      border-bottom: 1px solid colors.color(light-background)

    :deep(.square)
      &::before, &::after
        padding: 0 !important
        content: none !important
        float: none !important
        clear: none !important

      .inner
        display: block !important
        padding-top: 0 !important

  &:last-child
    .description
      padding-bottom: 0 !important
      border-bottom: none !important

  .blog-list-item-title
    width: 80%
    // height: 2rem
    overflow: hidden
    text-overflow: ellipsis
    font-size: typography.font-size(m)
    @media screen and (min-width: 800px)
      font-size: typography.font-size(l)

  .blog-list-item-head
    color: colors.color(dark-foreground)
    font-weight: 400
    line-height: 1
    display: inline-flex
    justify-content: flex-start // space-between
    // background: red
    align-items: center
    gap: 2em

    .date
      font-size: typography.font-size(m)
      font-weight: 500
      color: colors.color(dark-foreground)
      text-align: right
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
