<template>
  <p class="prose-p">
    <slot />
  </p>
</template>

<style lang="sass">
@use "@/styles/typography"
@use "@/styles/colors"
@use "@/styles/geometry"
@use "@/styles/mixins"

.prose-p
  font-family: typography.font("sans-serif"), sans-serif
  // margin-bottom: 1em
  // line-height: 24px

  // if not following a .prose-hr, indent first line
  // :not(.prose-hr, .prose-title-wrapper) + &
  //   &:not(:first-child)
  //     text-indent: 1.5em

  // &:not(:last-of-type)
  &:not(:last-child)
    // margin: 0 0 1.5em 0
    margin-bottom: 1em
    // padding-bottom: 1em

  // if not first child, indent first line
  &:not(:first-of-type)
    text-indent: 1.5em

    // but if immediately following a .prose-hr, don't indent
  :is(.prose-hr, .prose-title-wrapper) + &
    text-indent: 0

  // if pred is a .prose-p, remove bottom margin
  &:has(+ .prose-ul)
    margin-bottom: 0.5em

  // // if followed by a .prose-ul or .prose-ol, don't indent
  // & + .prose-ul,
  // & + .prose-ol
  //   text-indent: 0

    
</style>
