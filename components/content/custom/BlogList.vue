<template>
  <Square margin="0%">
    <div class="blog-list-container">
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
    </div>
  </Square>
</template>

<script setup lang="ts">

defineProps<{
  title: string
}>()
const { data: blogs } = await useAsyncData(async () => {
  const _blogs = await queryContent()
    .only(["title", "description", "excerpt", "date", "_path"])
    .sort({ date: -1 })
    .find()
  return _blogs
})

const _years = blogs.value.map((blog) => new Date(blog.date).getFullYear()).filter(Boolean)
const years = [...new Set(_years)]

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
  gap: 0
  font-family: typography.font("sans-serif")

  @media (max-width: 640px)
    font-size: typography.font-size(xs)

  .blog-list-title
    font-size: 1rem
    font-weight: 500
    color: colors.color(lightest-foreground)

  .blog-list-year
    @include mixins.split
    padding-top: 1em
    gap: 1em

    @include mixins.shift-left

    border-bottom: 1px solid colors.color(light-background)

    &:not(:first-child)
      margin-top: -2em

    &:first-child
      border-top: 1px solid colors.color(light-background)

    .blog-list-year-title
      width: 15%
      color: colors.color(dark-foreground)
      font-weight: 500

      line-height: 2.9

      @media (max-width: 800px)
        line-height: 2.7

      @media (min-width: 540px)
        margin-top: 50px

    .blog-list
      width: 85%

</style>
