<template>
  <div class="buttons-container">
    <ProseA
      class="error-page-button"
      fancy
      bare
      forced
      @click="$router.back()"
    >
      <span>back</span>
    </ProseA>
    <ProseA
      class="error-page-button"
      href="/"
      fancy
      bare
    >
      <span>home</span>
    </ProseA>
    <!-- <ProseA
      class="error-page-button"
      :href="parentPath"
      fancy
    >
      <span>up</span>
    </ProseA> -->
  </div>
</template>
<script lang="ts">
export default {
  name: "RouterButtons",
  setup() {
    const { path } = useTrimmedPath()
    let parentPath = ""
    if (path.length > 1) {
      parentPath = path.split("/").slice(0, -1).join("/")
      parentPath = parentPath === "" ? "/" : parentPath
    }

    return {
      parentPath,
    }
  },
}
</script>

<style lang="sass" scoped>
@use "@/styles/colors"
.buttons-container
  display: inline-flex
  justify-content: space-between
  width: 100%
  padding: 50px

.error-page-button
  & > span
    transition: all 0.2s ease-in-out
    padding-bottom: 0.1rem

  &:hover
   cursor: pointer
</style>
