<template>
  <div class="comment-wrapper">
    <div
        v-if="comment.avatar && comment.text"
        class="comment-avatar"
        v-html="comment.avatar"
      />
    <div
      class="comment"
      :id="`comment-${id}`"
      v-if="comment.text"
    >
      <div class="comment-header">
        {{ comment.author }}
        <span
          class="comment-date"
          v-if="comment.date"
        >
          {{ "on " + new Date(comment.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) }}
        </span>
      </div>
      <div class="comment-body">
        <ContentRenderer class="markdown-comment" :value="parsedMarkdown" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Comment, getCommentDateAsString } from "~/modules/utils";
import markdownParser from '@nuxt/content/transformers/markdown';

export default {
  name: "BlogComment",
  components: {},

  // define props
  props: {
    comment: {
      type: Object as () => Comment,
      required: true,
    },
    id: Number,
  },
  // init
  async setup(props) {
    return {
      parsedMarkdown: await markdownParser.parse(props.id, props.comment.text),
    }
  },
}
</script>

<style lang="sass">
@use "~/styles/colors"
@use "~/styles/typography"

.comment-wrapper
  display: flex
  flex-direction: row
  width: 100%

  .comment-avatar
    width: 30px
    height: 30px
    border-radius: 50%
    // margin-top: 0.5rem
    margin-right: 1rem


  .comment
    margin-top: 0
    background: colors.color("background")
    border: 3px solid colors.color("light-background")
    border-radius: 0.5rem
    line-height: 1.5
    width: calc(100% - 50px)
    align-self: flex-end
    margin-bottom: 1rem

    .comment-body
      white-space: pre-line
      line-height: 1.3

    .comment-header
      padding: 0 1.5em
      background-color: colors.color("light-background")
      color: colors.color("primary-highlight")
      height: 2em
      line-height: 2em
      
      .comment-date
        font-size: 0.9em
        margin-left: 0.5em
        color: colors.color("secondary-highlight")
        text-align: left
        font-weight: 400

    .markdown-comment
      padding: 1em 1em

      .prose-ul
        font-size: 0.9em

        .prose-li
          font-size: 1em
          line-height: 1
          margin: 0.4em 0
</style>