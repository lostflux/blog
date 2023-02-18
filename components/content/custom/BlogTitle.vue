<template>
  <div class="title-container">
    <div class="text-container">
      <div class="title">
        <div class="category">
          <Icon :type="`blog-${primaryCategory}`" class="category-icon" />
          <ul class="category-labels">
            <li
              class="category-label"
              v-for="_category in categories"
              @click="showCategory(_category)" 
              purpose="button"
            >
              {{  _category  }}
            </li>
          </ul>
        </div>
        <h1 class="title-heading">{{title}}</h1>
        <p class="title-description">{{description}}</p>
        <span class="date">
          {{ new Date(date)
            .toLocaleDateString('en-us', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })
          }}
        </span>
      </div>
    </div>
    <figure
      v-if="image"
      class="title-image-wrapper"
    >
      <img
        class="title-image"
        :src="`${path}/${image}`"
        alt="Title Image"
      />
      <figcaption
        v-if="caption"
        class="title-image-caption">
        {{ caption }}
      </figcaption>
    </figure>
  </div>
</template>

<style lang="sass" scoped>
@use "../styles/typography"
@use "../styles/colors"
@use "../styles/mixins"
@use "../styles/geometry"

*
  // z-index: 1

.title-container
  width: 100%
  height: fit-content
  align-content: center
  padding: 0.5rem 0 2rem 0

  overflow: hidden

  @include mixins.fancy-background

  .text-container
    width: min(100%, 1200px)
    margin: auto
    padding: 0 5vw
    height: 100%
    display: flex
    flex-direction: column



    .title
      width: 100%

      .category
        color: colors.color("primary-highlight")
        display: inline-flex
        height: clamp(1.4rem, 2vh, 2rem)
        position: relative

        .category-icon
          width: fit-content
          height: 70%
          margin-right: 1rem
          vertical-align: middle
          max-width: 1.5rem

        .category-labels
          display: inline-flex
          flex-direction: row
          cursor: pointer
          // background: yellow
          // height: max-content
          position: absolute
          top: 50%
          transform: translateY(-60%)
          left: 2.5rem


          .category-label
            font-size: clamp(typography.font-size("s"), 1.5vw, typography.font-size("m"))
            font-weight: 500
            font-family: typography.font("monospace")
            text-transform: capitalize
            line-height: 1
            align-self: center

            &:not(:last-child)::after
              content: ","
              margin-right: 0.5rem

      .title-heading
        font-size: clamp(1.3rem, 3.5vw, 3rem)
        font-weight: 700
        line-height: 130%
        margin: 0.5em 0
        color: colors.color("primary-highlight")

      .title-description
        font-size: clamp(typography.font-size("m"), 1.7vw, 1.53rem)
        font-weight: 500
        line-height: 1.5
        margin-bottom: 0.5rem
        color: colors.color("light-foreground")

      .date
        color: colors.color("primary-highlight")
        font-family: typography.font("monospace")
        font-size: typography.font-size("s")
        font-weight: 500

  .title-image-wrapper
    width: min(90%, 1200px)
    // height: fit-content
    margin: auto
    margin-top: 2em
    max-width: 100%
    display: flex
    flex-direction: column
    align-items: center
    // gap: 0.5em
    // border-radius: geometry.var("border-radius")
    // background-color: colors.color("primary-highlight")


  .title-image
    @include mixins.box-shadow
    
    border-radius: geometry.var("border-radius")
    
    
  .title-image-caption
    width: fit-content
    align-self: flex-end
    margin-right: clamp(3em, 4vw, 5em)
    font-size: clamp(typography.font-size("s"), 2vw,  typography.font-size("l"))
    font-weight: 600
    font-style: italic
    color: colors.color("primary-highlight")




</style>

<script lang="ts" setup>
const { path } = useRoute();
const { primaryCategory, categories, image, caption, date, title, description } = await queryContent(path)
.only(['category', 'date', 'image', 'caption', 'title', 'description'])
.findOne()
.then((data) => {
  return {
    categories: data.category.filter((category) => category !== "featured"),
    primaryCategory: data.category[0] || data.category,
    date: data.date,
    title: data.title,
    description: data.description,
    image: data.image || null,
    caption: data.caption || null,
  };
});

function showCategory(category) {
  console.log(`Showing category: ${category}`);
  return category !== "featured";
}
</script>

<script lang="ts">
export default {
  name: 'BlogTitle',
}
</script>
