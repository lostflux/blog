<template>
  <div id="root">
    <main>
      <slot id="content" />
    </main>
    <AppFooter identifier="in-page" />
  </div>
</template>

<style lang="sass" scoped>
@use "@/styles/colors"
@use "@/styles/typography"

#root
  height: 100svh
  display: flex
  flex-direction: column
  // flex-grow: 1
  justify-content: space-between

main
  margin: 0 auto
  width: min(100svw, 640px)
  margin: auto
  font-weight: 400
  font-size: typography.font-size(s)

</style>
