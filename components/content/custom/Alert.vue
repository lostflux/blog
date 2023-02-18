<template>
  <div 
  class="alert-container"
  :class="type"
  >
    <div class="title-container">
      <Icon :type="type" class="alert-icon" />
      <span class="title">
        {{ title || type }}
      </span>
    </div>
    <slot id="alert-content" />
  </div>
</template>

<script lang="ts">
export default {
  name: 'Alert',
  props: {
    type: {
      type: String,
      default: 'info',
      validator: (value: string) => [
        'info', 'success', 'error', 'warning', 'critical'
      ].includes(value)
    },
    title: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="sass">
@use "~/styles/colors"
@use "~/styles/typography"

.alert-container
  margin: 1em 0
  padding: 1em 1em 0.5em 1em
  border-radius: 0.5rem

  & > ul > li::before
    color: inherit !important

  .alert-icon
    width: 1.5em
    height: 1.5em
    margin-right: 0.5em
    padding-bottom: 0.25em

  .title-container
    margin-bottom: 1em
    display: flex
    flex-direction: row

    .title
      font-weight: 600
      font-family: typography.font("monospace")
      text-transform: capitalize
      width: fit-content


  &.info
    background-color: colors.color("info-background") !important
    color: colors.color("info-foreground") !important
    
    & > .paragraph
      color: colors.color("info-foreground") !important


  &.success
    background-color: colors.color("success-background")
    color: colors.color("success-foreground")

    & > .paragraph
      color: colors.color("success-foreground") !important


  &.error
    background-color: colors.color("error-background") !important
    color: colors.color("error-foreground") !important

    & > .paragraph
      color: colors.color("error-foreground") !important


  &.warning
    background-color: colors.color("warning-background")
    color: colors.color("warning-foreground")

    & > .paragraph
      color: colors.color("warning-foreground") !important


  &.critical
    background-color: colors.color("critical-background") !important
    color: colors.color("critical-foreground") !important

    & > .paragraph
      color: colors.color("critical-foreground") !important

</style>
