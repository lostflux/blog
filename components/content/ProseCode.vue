<template>
  <div class="code-container">
    <div class="top-container">
      <span
        v-if="filename"
        class="filename"
      >{{ filename }}</span>
      <span
        v-if="language"
        class="language"
      >{{ language }}</span>
      <div class="copy-container">
        <button
          class="copy-button"
          @click="copy(code)"
        >
          <svg
            v-if="copied"
            fill="none"
            viewBox="0 0 24 24"
            class="w-4 h-4"
          >
            <title>Check</title>
            <path
              d="M20 6L9 18l-5-5.454"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <svg
            v-else
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="w-4 h-4"
          >
            <path
              d="M19.0781 6H8.67187C7.19624 6 6 7.19624 6 8.67187V19.0781C6 20.5538 7.19624
                 21.75 8.67187 21.75H19.0781C20.5538 21.75 21.75 20.5538 21.75
                 19.0781V8.67187C21.75 7.19624 20.5538 6 19.0781 6Z"
              stroke="currentColor"
              stroke-width="1.49375"
              stroke-linejoin="round"
            />
            <path
              d="M17.9766 6L18 4.875C17.998 4.17942 17.7208 3.51289 17.229 3.02103C16.7371
                 2.52918 16.0706 2.25198 15.375 2.25H5.25C4.45507 2.25235 3.69338 2.56917
                 3.13128 3.13128C2.56917 3.69338 2.25235 4.45507 2.25 5.25V15.375C2.25198
                 16.0706 2.52918 16.7371 3.02103 17.229C3.51289 17.7208 4.17942 17.998 4.87518H6"
              stroke="currentColor"
              stroke-width="1.49375"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
    <div class="code-internal-1">
      <div class="code-internal-2">
        <slot class="code" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { copy, copied } = useClipboard();
</script>

<script lang="ts">
export default {
  props: {
    code: {
      type: String,
      default: "",
    },
    language: {
      type: String,
      default: null,
    },
    filename: {
      type: String,
      default: null,
    },
    highlights: {
      type: Array as () => number[],
      default: () => [],
    },
  },
};
</script>

<style lang="sass">
@use "../styles/colors"
@use "../styles/typography"

.code-container
  background: colors.color("light-background")
  background: rgba(colors.color("light-background"), 0.7)
  position: relative
  margin: 1rem 0
  padding: 0.5rem
  padding-top: 0
  border-radius: 0.3rem
  font-size: typography.font-size("m")
  min-width: 100%

  counter-reset: line

  .code-internal-1
    overflow-x: scroll
    min-width: 100%

    &::-webkit-scrollbar
      display: none

    .code-internal-2
      min-width: 100%

      pre
        display: inline-block
        overflow-x: scroll
        -ms-overflow-style: none
        overflow-style: none
        scrollbar-width: none
        min-width: 100%

        &::-webkit-scrollbar
          display: none

        code
          font-family: typography.font("monospace")
          font-size: typography.font-size("xs")
          line-height: 1.7em
          display: flex
          flex-direction: column

          & > span
            counter-increment: line

            &.highlight
              background-color: rgba(colors.color("lightest-background"), 0.5)
              width: 100%
              padding-right: 1em

              &::before
                content: '+'
                color: colors.color("critical-foreground")
                // color: colors.color("primary-highlight")
                border-right: 1px solid

            &::before
              display: inline-block
              width: 2.5em
              text-align: right
              content: counter(line)
              margin-right: 1em
              padding-right: 0.5em
              color: colors.color("foreground")
              border-right: 1px solid colors.color("lightest-background")

            &:hover
              background-color: rgba(colors.color("lightest-background"), 0.7)

              &::before
                display: inline-block
                content: counter(line)
                padding-right: 0.5em
                color: colors.color("lightest-foreground")
                border-right: 1px solid

.language
  padding: 0 1em
  margin: auto 0
  padding-top: 7px
  line-height: 1
  font-weight: 400
  text-transform: capitalize

.top-container
  display: flex
  justify-content: flex-end
  margin-bottom: 1rem
  border-bottom: 1px solid colors.color("lightest-background")

.copy-button
  font: typography.font("monospace")
  color: colors.color("primary-highlight")
  padding: 1em

  & > svg
    fill: none

.filename
  position: absolute
  margin: 1em
  left: 1em
  top: 5px
  font-family: typography.font("monospace")
  font-size: typography.font-size("xs")

</style>
