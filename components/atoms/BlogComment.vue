<template>
  <div class="comment-wrapper">
    <div
      class="comment"
      :id="`comment-${id}`"
      v-if="comment.text"
    >
      <div class="comment-header">
        <div
        v-if="comment.avatar && comment.text"
        class="comment-avatar"
        v-html="comment.avatar"
      />
        <div class="comment-meta">
          <span class="comment-author">
            {{ comment.author }}
          </span>
          <span
            class="comment-date"
            v-if="comment.date"
          >
            {{ new Date(comment.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) }}
          </span>
        </div>
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



  .comment
    // margin-top: 0
    background: colors.color("background")
    border: 3px solid colors.color("light-background")
    border-radius: 0.5rem
    line-height: 1.5
    // width: calc(100% - 50px)
    align-self: flex-end
    // margin-bottom: 1rem

    .comment-body
      white-space: pre-line
      line-height: 1.3

    .comment-header
      // padding: 0 1.5em
      // background-color: colors.color("light-background")
      color: colors.color("primary-highlight")
      height: 2em
      line-height: 2em
      display: inline-flex
      background: yellow
      width: 100%
      height: 42.4px
      margin: 0 0 6px
      // padding: 0 0 0 0.5em

      .comment-avatar
        width: 32px
        height: 32px
        border-radius: 50%
        // margin-top: 0.5rem
        // margin-right: 1rem

      .comment-meta
        display: flex
        flex-direction: column
        // align-items: center
        // justify-content: space-between
        width: fit-content
        height: 100%
        padding: 0 0 0 12px
        // background: red

        .comment-author
          font-size: 0.9em
          font-weight: 400
          color: colors.color("primary-highlight")
          text-align: left
          align-self: flex-start
          // background: green
          line-height: 20px
          height:  20px
      
        .comment-date
          font-size: 0.9em
          // margin-left: 0.5em
          line-height: 1
          color: colors.color("secondary-highlight")
          text-align: left
          font-weight: 400
          height: 20px
          line-height: 20px

    .markdown-comment
      padding: 1em 1em

      .prose-ul
        font-size: 0.9em

        .prose-li
          font-size: 1em
          line-height: 1
          margin: 0.4em 0
</style>
