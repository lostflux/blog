<template>
  <blockquote class="prose-blockquote">
    <slot />
    <div
      v-if="name"
      class="author"
    >
      <ProseA
        v-if="link"
        :href="link"
        class="name"
        fancy
      >
        {{ name }}
      </ProseA>
      <div
        v-else
        class="name"
      >
        {{ name }}
      </div>
      <ul
        v-if="tags"
        class="tag-list"
      >
        <li
          v-for="tag in tags"
          :key="tag"
          class="tag-item"
        >
          {{ tag }}
        </li>
      </ul>
    </div>
  </blockquote>
</template>

<script lang="ts">

export default {
  name: "ProseBlockquote",
  props: {
    name: {
      type: String,
      default: "",
    },
    link: {
      type: String,
      default: "",
    },
    tags: {
      type: String,
      default: "",
    },
  },
}
</script>

<style lang="sass">
@use "@/styles/typography"
@use "@/styles/colors"
@use "@/styles/mixins"

.prose-blockquote
  width: calc(100% - 1rem)
  position: relative
  margin: 0.5rem
  padding: 0 2rem 0 1em
  border-left: 2px solid colors.color(primary-highlight)
  color: colors.color(primary-highlight)

  .author
    border-top: 1px solid colors.color(lightest-background)
    padding-top: 0.5em
    display: flex
    flex-direction: column

    .name
      text-transform: capitalize
      position: relative
      padding-left: 1.4em
      font-style: italic

      &::before
        content: "—"
        position: absolute
        left: 0
        top: 0

    .tag-list
      display: inline-flex

      .tag-item
        width: fit-content
        padding: 0
        margin-right: 0.3em
        font-weight: 400
        font-style: italic
        font-size: 0.8em
        letter-spacing: 0.01rem

        &:not(:last-child)::after
          content: ','

</style>
