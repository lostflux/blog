<template>
  <StyledAboutSection id="about" class="about-section">
    <StyledText>
      <ContentDoc :value="data" />
      <ul class="styled-list">
        <li v-for="skill in data.skills"> {{ skill }}</li>
      </ul>
    
    </StyledText>

    <StyledImage>
      <img
        src="~assets/images/profile-image.jpg"
        class="img"
        width="500"
        quality="100"
        formats="AUTO, WEBP, AVIF"
        alt="head shot"
      />
    </StyledImage>
  </StyledAboutSection>
</template>

<script lang="ts" setup>

const { data } = await useAsyncData(
  `profile-brief-${useRoute().path}`,
  async () => {
    const _projectsData = queryContent("profile/brief")
      .where({ category: 'profile-brief' })
      .findOne();
    return await _projectsData;
});

console.log(data);

</script>

<script lang="ts">
  export default {
    name: "About"
  }
</script>
