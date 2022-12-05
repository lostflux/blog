<template>

</template>
<script lang="ts" setup>
const { path } = useRoute();

const { data: rootHead } = await useAsyncData(
  "root-head",
  async () => {
    const _rootHead = queryContent("root-head")
      .find();
    return await _rootHead;
});
  
if ( path === '/' ) {
  if (rootHead.value && rootHead.value.length > 0) {
    console.log("Found Head Meta")
    useContentHead(rootHead.value[0])
  }
} else {
  const { page } = useContent();
  console.log("Found Page Meta via 2nd useContent()")
  useContentHead(page);
}
</script>

<script lang="ts">
export default {
  name: "Head",
}
</script>
