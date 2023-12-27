<template>
  <ContentRenderer
    v-if="page.body"
    :value="page"
  />
</template>

<script setup lang="ts">
const route = useRoute()

definePageMeta({
  layout: "article",
})

const { data: page } = await useAsyncData(route.path, () => queryContent()
  .where({ _path: route.path })
  .findOne())
if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: "Page not found", fatal: true })
}

useSeoMeta({
  titleTemplate: "%s | amittai",
  title: page.value.title,
  ogTitle: `${page.value.title} | amittai`,
  description: page.value?.description || page.value.excerpt || "",
  ogDescription: page.value.description || page.value.excerpt || "",
})
</script>
