<template>
  <div class="date-component">
    {{ formattedDate }}
  </div>
</template>
<script lang="ts" setup>

const props = defineProps({
  date: {
    type: String,
    default: new Date().toDateString(),
  },
})

const formattedDate = computed(() => {
  const date = new Date(props.date)
  const options = {
    month: "numeric",
    day: "numeric",
    year: "numeric",
    weekday: "short",
  }
  return date.toLocaleDateString("en-US", options)
})

</script>

<style lang="sass" scoped>
@use "@/styles/colors"
@use "@/styles/typography"
.date-component
  color: colors.color(dark-foreground)
  font-size: typography.font-size("xxs")
  font-weight: 600
  text-transform: uppercase
</style>
