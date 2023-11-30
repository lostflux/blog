<template>
  <div>
    <!-- <template #title> -->
    <!-- <span v-html="page?.hero?.title" /> -->
    <!-- </template> -->

    <!-- <span v-html="page?.hero?.description" /> -->

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

useSeoMeta({
  titleTemplate: "",
  title: page.value.title,
  ogTitle: page.value.title,
  description: page.value.description,
  ogDescription: page.value.description,
  ogImage: page.value.image || "",
  twitterImage: page.value.image || "",
})

provide("page", page)

</script>
