// file for nuxt content

<template>
  <main>
    <article class="prose">
      <ContentDoc>
        <ContentSlot />
      </ContentDoc>
    </article>
  </main>
</template>

<script lang="ts">
export default {
  layout: "default",
}
</script>
