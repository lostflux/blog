  <template>
  <nav class="nav">
    <Logo />
    <NavLinks />
  </nav>
</template>
<script lang="ts">
  export default {
    name: "Nav",
  }
</script>

<style lang="sass" scoped>
  @use "~/styles/colors"
  @use "~/styles/typography"
  @use "~/styles/geometry"
  @use "~/styles/mixins"

  .nav
    @apply mixins.flex-between
    position: relative
    width: 100%
    color: colors.color("lightest-slate")
    font-family: typography.font("font-mono")
    counter-reset: item 0
    z-index: 12

</style>
