<template>
  <InlineFlex
    v-if="surround"
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
        fancy
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
          fancy
        >
          {{ i == 0 ? "previous" : "next" }}
        </ProseA>
      </div>
    </template>
  </InlineFlex>
</template>

<script setup lang="ts">
const { path } = useTrimmedPath();

// use props
// const props = defineProps({
//   category: {
//     type: String,
//     default: "",
//   },
// });

// get current category
const { category } = await queryContent()
  .where({ _path: path })
  .only(["category"])
  .findOne();

const { data: surround } = await useAsyncData(
  // "prev-next",
  async () => {
    const surround = ["moments", "aphorisms"].some((cat) => {
      return category.includes(cat);
    }) ? await queryContent()
        .where({ draft: false })
        .where({ category: { $contains: category } })
        .only(["_path", "title", "category", "date"])
        .sort({ date: -1 })
        .findSurround(path)
      : await queryContent()
        .where({ draft: false })
        .where({ category: { $not: { $containsAny: ["moments", "aphorisms"] } } })
        .only(["_path", "title", "category", "date"])
        .sort({ date: -1 })
        .findSurround(path);
    return surround;
  },
);

</script>

<script lang="ts">
// fetch the current route

export default {
  name: "Surround",
};
</script>

<style lang="sass">
@use "~/styles/colors"
.surround
  width: 100%
  display: flex
  justify-content: space-between
  margin: 100px 0

  .surround-link
    width: 45%
    padding: 0.5rem 0
    text-transform: uppercase

    display: flex
    //justify-content: center

</style>
