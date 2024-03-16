<script lang="ts" setup>
import { computedAsync } from "@vueuse/core"
import { withoutTrailingSlash } from "ufo"

const props = defineProps({
  path: {
    type: String,
    required: false,
    default: "",
  },
})
// const views = await usePageViews(props.path)
// const numViews = computed(() => Number(views.value) || 0)

const pageViews = await getPageViews()

const cleanedPath = withoutTrailingSlash(props.path || useRoute().path)
const increment = cleanedPath === withoutTrailingSlash(useRoute().path)

const views = computedAsync(async () => pageViews.getViews(cleanedPath, increment))
</script>

<template>
  <div
    v-if="views > 0"
    class="views-container"
  >
    <div>
      <span class="num">{{ views }}</span> {{ views === 1 ? "view" : "views" }}
    </div>
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

  .num
    width: 4ch
</style>
