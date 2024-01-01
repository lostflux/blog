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
            fancy
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
        <div
          v-if="userInfo && includeActions"
          class="blog-actions"
        >
          <button class="blog-action left">
            <Icon
              type="comment"
              :active="false"
              class="blog-action-icon"
              @click="showComments"
            />
            <span
              class="blog-action-count"
            >
              {{ userInfo.getCommentCount }}
            </span>
          </button>
          <button class="blog-action">
            <BookMarkIcon
              :active="userInfo.isSubscribed()"
              class="blog-action-icon"
              @click="toggleSubscription"
            />
          </button>
        </div>
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
const includeActions = false

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

const toggleSubscription = () => {
  // if user logged in, toggle subscription
  if (userInfo.active) userInfo.toggleSubscription()
  // otherwise, show auth modal
  else {
    const authModal = document.getElementsByClassName("auth-modal")[0]
    authModal?.classList.remove("hidden")
  }
}

const showComments = () => {
  const commentsContainer = document.getElementsByClassName("comments-section-wrapper")[0]
  if (commentsContainer) {
    commentsContainer.classList.remove("hidden")
  }
}

</script>

<script lang="ts">
const userInfo = useUserInfo()
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
  text-transform: uppercase
  flex-grow: 0
  font-size: typography.font-size("m")

  @media screen and (max-width: 1150px)
    height: 400px
    font-size: typography.font-size("m")

  .bio-name
    font-size: typography.font-size(l)
    color: colors.color(lightest-foreground)

  .bio-title
    font-size: typography.font-size(s)

.table-of-contents
  position: fixed

  top: 50vh

  @media screen and (max-width: 1150px)
    display: none

  @media screen and (max-height: 1000px)
    display: none

.blog-title-container
  align-content: center
  overflow: hidden
  margin: 0
  padding: 0
  //margin-bottom: 1em
  margin-right: 70px
  position: relative

  .text-container
    //width: min(100%, 1200px)
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
      // background: yellow

      .title-heading
        font-size: typography.font-size("l")
        text-transform: uppercase

        @media screen and (max-width: 800px)
          font-size: typography.font-size("m")

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
          font-family: typography.font(sans-serif)
          font-size: typography.font-size(xs)
          font-weight: 600

          // align centrally
          display: flex
          align-items: center

</style>
