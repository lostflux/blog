  <template>
  <nav class="nav">
    <Logo class="logo" />
    <div class="nav-links">
      <ol>
        <li>
          <NuxtLink to="#About" class="nav-link">About</NuxtLink>
        </li>
        <li>
          <NuxtLink to="#Experience" class="nav-link">Experience</NuxtLink>
        </li>
        <li class="nav-column">
          <NuxtLink to="#Work" class="nav-link">Work</NuxtLink>
        </li>
        <li class="nav-column">
          <NuxtLink to="#Contact" class="nav-link">Contact</NuxtLink>
        </li>
      </ol>
    </div>
  </nav>
</template>
<script lang="ts">
  export default {
    name: "Nav",
  }
</script>

<style lang="sass" scoped>
  @use "../styles/header"
</style>
