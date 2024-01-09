<template>
  <div
    v-if="surround"
    :key="`surround-${route.path}`"
    class="surround"
  >
    <template
      v-for="(link, i) in surround"
    >
      <ProseA
        v-if="link"
        :key="i"
        :href="link._path"
        class="surround-link"
      >
        {{ i == 0 ? "previous" : "next" }}
      </ProseA>
      <div
        v-else
        :key="i+10"
        class="surround-link inactive"
      >
        <ProseA
          :key="i"
          class="surround-link"
        >
          {{ i == 0 ? "previous" : "next" }}
        </ProseA>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { withoutTrailingSlash } from "ufo"

const route = useRoute()

const { data: surround } = await useAsyncData(
  async () => {
    const { path } = route
    const _surround = await queryContent()
      .where({ _extension: "md" })
      .sort({ date: 1 })
      .only(["_path", "title"])
      .findSurround(withoutTrailingSlash(path))
    return _surround
  },
)

</script>

<script lang="ts">
export default {
  name: "Surround",
}
</script>

<style lang="sass">
@use "@/styles/colors"
.surround
  display: inline-flex
  justify-content: space-between
  align-items: center
  height: 1rem
  width: 30%

  .surround-link
    text-transform: uppercase

</style>
