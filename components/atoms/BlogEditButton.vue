<template>
  <div class="edit-button-container">
    <!-- <ProseA
      :to="fullLink"
      class="edit-button"
      fancy
      uppercase
      external
    >
      Full Version
    </ProseA> -->
    <ProseA
      :to="repoLink"
      class="edit-button"
      fancy
      external
    >
      View on GitHub
    </ProseA>
    <ProseA
      :to="editLink"
      class="edit-button"
      fancy
      uppercase
      external
    >
      Edit
    </ProseA>
  </div>
</template>

<script lang="ts">
export default {
  name: "BlogEditButton",
  data() {
    const { path } = useTrimmedPath()
    return {
      editLink: `https://github.com/siavava/content/blob/main/content/${path}.md`,
      repoLink: "https://github.com/siavava/blog.minimal",
      fullLink: `https://blog.amittai.studio${path}`,
    }
  },
}
</script>

<style lang="sass" scoped>
@use "@/styles/colors"
.edit-button-container
  width: 100%
  padding: 2rem 0
  display: inline-flex
  justify-content: flex-end
  gap: 2rem

  .edit-button
    display: inline-flex
    gap: 0.5rem
    line-height: 1em
    justify-content: flex-end
    align-items: center
    font-weight: 500
    text-transform: uppercase

    & > span
      border-bottom: 2px dotted

    &:hover
      & > span
        border-bottom: 2px solid

</style>
