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

useHead({
  titleTemplate: "%s | alt",
  title: page.value.title,
  meta: [
    {
      hid: "description",
      name: "description",
      content: page.value?.description || page.value.excerpt || "",
    },
    {
      hid: "og:description",
      name: "og:description",
      content: page.value?.description || page.value.excerpt || "",
    },
    {
      hid: "og:title",
      name: "og:title",
      content: `${page.value.title} | alt`,
    },
  ],
})

useSeoMeta({
  titleTemplate: "%s | alt",
  title: page.value.title,
  ogTitle: `${page.value.title} | alt`,
  description: page.value?.description || page.value.excerpt || "",
  ogDescription: page.value?.description || page.value.excerpt || "",
})
</script>
