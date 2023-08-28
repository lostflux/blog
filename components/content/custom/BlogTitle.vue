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
            Amittai Siavava
          </ProseA>
          <div class="bio-title">
            non-deterministic infinite automaton
          </div>
        </div>
      </div>
      <div class="title">
        <h1 class="title-heading">
          {{ customTitle || title }}
        </h1>
        <TableOfContents
          v-if="tocVisible && !customTitle"
          class="table-of-contents"
        />
      </div>

      <div
        v-if="!isMeta"
        class="blog-actions-and-date"
      >
        <div
          v-if="!customTitle"
          class="blog-actions"
        >
          <button class="blog-action left">
            <Icon
              type="comment"
              :active="false"
              class="blog-action-icon"
              @click="showComments"
            />
            <span class="blog-action-count">
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
          v-if="!customTitle"
          :date="date"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { path } = useTrimmedPath();
const { showToc } = useConfig();
const tocVisible = await showToc();

defineProps({
  customTitle: {
    type: String,
    default: "",
  },
});

const {
  date, title,
} = await queryContent()
  .where({ _path: path })
  .only(["category", "date", "imageUrl", "caption", "title", "description"])
  .findOne()
  .then((data) => {
    return {
      categories: data.category.filter((category) => category !== "featured"),
      primaryCategory: data.category[0] || data.category,
      date: data.date,
      title: data.title,
      description: data.description,
      image: data.imageUrl || null,
      caption: data.caption || null,
    };
  });

const { useMetaPage } = useConfig();
const isMeta = await useMetaPage();

const toggleSubscription = () => {
  // if user logged in, toggle subscription
  if (userInfo.active) userInfo.toggleSubscription();
  // otherwise, show auth modal
  else {
    const authModal = document.getElementsByClassName("auth-modal")[0];
    authModal?.classList.remove("hidden");
  }
};

const showComments = () => {
  const commentsContainer = document.getElementsByClassName("comments-section-wrapper")[0];
  if (commentsContainer) {
    commentsContainer.classList.remove("hidden");
  }
};

</script>

<script lang="ts">
const userInfo = useUserInfo();
export default {
  name: "BlogTitle",
};
</script>

<style lang="sass" scoped>
@use "../styles/typography"
@use "../styles/colors"
@use "../styles/mixins"
@use "../styles/geometry"

.bio
  width: 100%
  height: 400px
  display: flex
  flex-direction: column
  justify-content: center
  //align-items: center

  text-transform: uppercase
  //margin-left: 1em

  .bio-name
    font-size: typography.font-size(l)
    color: colors.color(lightest-foreground)
    //font-weight: 600

  .bio-title
    font-size: typography.font-size(s)

.table-of-contents
  position: fixed

  top: 50vh //calc(50vh - 500px)

  @media screen and (max-width: 1150px)
    display: none

  @media screen and (max-height: 1000px)
    display: none

.blog-title-container
  //width: 100%
  align-content: center
  //padding: 0.5rem 0 2rem 0
  overflow: hidden
  margin: 0
  padding: 0
  margin-bottom: 1em
  margin-right: 70px
  position: relative

  &.search-variant
    @media screen and (max-width: 1150px)
      margin-top: 40px

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

      .title-heading
        font-size: typography.font-size("m")
        text-transform: uppercase

        @media screen and (max-width: 600px)
          font-size: typography.font-size("s")

      .title-description
        font-size: clamp(1rem, 1.8vw, 1.5rem)
        font-weight: 500
        line-height: 1.5
        //margin-bottom: 0.5rem
        color: colors.color("lightest-foreground")

  .blog-actions-and-date
    width: 100%
    height: 30px
    display: flex
    flex-direction: row
    justify-content: space-between
    align-items: center
    margin: 1rem 0

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
