<template>
  <div>
    <BlogList title="" />
  </div>
</template>

<script setup lang="ts">

definePageMeta({
  layout: "article",
})

const { data: page } = await useAsyncData("index", () => queryContent().findOne())
if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: "Page not found", fatal: true })
}

useHead({
  titleTemplate: "",
  title: "alt",
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
      content: "alt",
    },
  ],
})

useSeoMeta({
  titleTemplate: "",
  title: "alt",
  ogTitle: "alt",
  description: page.value?.description || page.value.excerpt || "",
  ogDescription: page.value?.description || page.value.excerpt || "",
})

provide("page", page)

</script>
