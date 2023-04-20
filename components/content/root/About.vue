<template>
  <StyledAboutSection
    id="about"
    class="about-section"
  >
    <ContentDoc
      path="profile/brief"
      class="doc"
    />
    <!-- <StyledImage>
      <img
        src="~assets/images/profile-image.jpg"
        class="img"
        width="500"
        quality="100"
        formats="AUTO, WEBP, AVIF"
        alt="head shot"
        loading="lazy"
      />
    </StyledImage> -->
  </StyledAboutSection>
</template>

<script lang="ts">
export default {
  name: "About",
};
</script>

<style lang="sass">
// .about-section
//   z-index: 2 !important

//   *
//     z-index: auto
</style>
