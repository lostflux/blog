<!-- eslint-disable vue/no-v-html -->
<template>
  <!-- <div> -->
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <!-- </div> -->
</template>

<script setup lang="ts">
// import { withoutTrailingSlash } from "ufo"

// const route = useRoute()

const { data: nav } = await useAsyncData("navigation", () => fetchContentNavigation())
const navigation = computed(() => nav.value)

useHead({
  htmlAttrs: {
    lang: "en",
  },
})

useServerSeoMeta({
  ogSiteName: "Amittai's Blog",
})

provide("navigation", navigation)
</script>
