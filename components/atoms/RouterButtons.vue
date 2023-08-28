<template>
  <div class="buttons-container">
    <ProseA
      class="error-page-button"
      fancy
      forced
      @click="$router.back()"
    >
      <span>back</span>
    </ProseA>
    <ProseA
      class="error-page-button"
      href="/"
      fancy
    >
      <span>home</span>
    </ProseA>
    <ProseA
      class="error-page-button"
      :href="parentPath"
      fancy
    >
      <span>up</span>
    </ProseA>
  </div>
</template>
<script lang="ts">
export default {
  name: "RouterButtons",
  setup() {
    // eslint-disable-next-line no-unused-vars
    const { path } = useTrimmedPath();
    let parentPath = "";
    if (path.length > 1) {
      parentPath = path.split("/").slice(0, -1).join("/");
      parentPath = parentPath === "" ? "/" : parentPath;
    }

    // const parentPath = (path.length >= 1)
    //   ? path === "/" ? "" : path.split("/").slice(0, -1).join("/")
    //   : "";

    return {
      parentPath,
    };
  },
};
</script>

<style lang="sass" scoped>
@use "@/styles/colors"
.buttons-container
  display: inline-flex
  justify-content: space-between
  width: 100%
  padding: 50px 0

.error-page-button
  //color: rgba(colors.color(primary-highlight), 0.8)
  //transition: all 0.2s ease-in-out

  & > span
    transition: all 0.2s ease-in-out
    padding-bottom: 0.1rem

  &::before
    content: "❯"
    margin-right: 0.5rem

  //&:hover
  //  cursor: pointer
  //  & > span
      //color: colors.color(primary-highlight)
      //border-bottom: 1px solid
</style>
