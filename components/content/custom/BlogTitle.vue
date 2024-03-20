<template>
  <div
    :class="{
      'blog-title-container': true,
      'search-variant': customTitle
    }"
  >
    <div class="text-container">
      <div class="bio">
        <div>
          <ProseA
            href="https://amittai.studio"
            class="bio-name"
            bare
          >
            {{ profile.name }}
          </ProseA>
          <div class="bio-title">
            {{ profile?.title }}
          </div>
        </div>
      </div>
      <div class="title">
        <h1 class="title-heading">
          {{ title }}
        </h1>
        <TableOfContents
          class="table-of-contents"
        />
      </div>

      <div class="blog-actions-and-date">
        <Date
          v-if="date"
          :date="date"
        />
        <BlogViews />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { path } = useTrimmedPath()

defineProps({
  customTitle: {
    type: String,
    default: "",
  },
})

const { profile } = useConfig()

const header = await useAsyncData(
  async () => {
    const _data = await queryContent()
      .where({ _path: path })
      .only(["date", "title"])
      .findOne()

    return _data
  },
)

if (!header.data.value) {
  throw createError({ statusCode: 404, statusMessage: "Page not found", fatal: true })
}

const { date, title } = header.data.value

</script>

<script lang="ts">
export default {
  name: "BlogTitle",
}
</script>

<style lang="sass" scoped>
@use "@/styles/typography"
@use "@/styles/colors"
@use "@/styles/mixins"
@use "@/styles/geometry"

.bio
  width: 100%
  height: 650px
  display: flex
  flex-direction: column
  justify-content: center
  // text-transform: uppercase
  text-transform: lowercase
  flex-grow: 0
  font-size: typography.font-size("m")

  @media screen and (max-width: 1150px)
    height: 400px
    font-size: typography.font-size("m")

  .bio-name
    // font-size: typography.font-size(l)
    // color: colors.color(lightest-foreground)
    // font-weight: 600
    // font-size: 20px
    font-weight: 600
    letter-spacing: -1.2px
    margin: 0
    font-size: 30px
    text-transform: lowercase

  .bio-title
    font-size: typography.font-size(s)
    text-transform: lowercase

.table-of-contents
  position: fixed

  // top: 50vh
  top: max(50%, min(65%, 750px))

  @media screen and (max-width: 1150px)
    display: none

  @media screen and (max-height: 1200px)
    display: none

.blog-title-container
  align-content: center
  overflow: hidden
  margin: 0
  padding: 0
  margin-right: 70px
  position: relative

  .text-container
    width: fit-content
    height: 100%
    display: flex
    flex-direction: column
    display: flex
    flex-direction: column

    .title
      width: 100%
      margin-top: 1rem
      margin-bottom: 1em

      .title-heading
        font-size: typography.font-size("xl")
        // font-size: 1.1em
        // text-transform: uppercase
        text-transform: lowercase
        font-weight: 600

        @media screen and (max-width: 800px)
          font-size: typography.font-size("l")

      .title-description
        font-size: clamp(1rem, 1.8vw, 1.5rem)
        font-weight: 500
        line-height: 1.5
        color: colors.color("lightest-foreground")

  .blog-actions-and-date
    width: 100%
    height: 30px
    display: flex
    flex-direction: row
    justify-content: flex-start
    gap: 2em
    align-items: center
    margin: -0.8rem 0 1rem 0

    .blog-actions
      width: 100px
      height: 30px
      display: inline-flex
      gap: 20px
      pointer-events: all

      .blog-action
        height: 100%
        pointer-events: all
        display: inline-flex
        gap: 5px
        align-items: center

        &:not(:last-child)::after
          content: "|"
          color: colors.color(dark-foreground)
          margin: 0 0 0 0.5rem

        &:hover
          cursor: pointer
          color: colors.color("primary-highlight")

        .blog-action-count
          height: 100%
          padding-left: 0.3rem
          font-family: typography.font(sans-serif), sans-serif
          font-size: typography.font-size(xs)
          font-weight: 600

          // align centrally
          display: flex
          align-items: center

</style>
