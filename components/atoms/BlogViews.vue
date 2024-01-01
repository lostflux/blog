<script lang="ts" setup>
const props = defineProps({
  path: {
    type: String,
    required: false,
    default: "",
  },
})
const views = await usePageViews(props.path)
const numViews = computed(() => Number(views.value) || 0)
</script>

<template>
  <div
    v-if="numViews > 0"
    class="views-container"
  >
    <div>{{ views }} {{ numViews === 1 ? "view" : "views" }}</div>
  </div>
</template>

<style lang="sass" scoped>
@use "@/styles/colors"
@use "@/styles/typography"
.views-container
  text-transform: uppercase
  color: colors.color(dark-foreground)
  font-size: typography.font-size("xxs")
  font-weight: 600
  // font-size: 0.8em
</style>
