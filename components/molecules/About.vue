<template>
  <StyledAboutSection class="about-section">
    <StyledText>
      <p>
        Hello, my name is Altair, a current undergraduate student
        at Dartmouth College. I am passionate about data and computation,
        hence my dual major in Mathematics and Computer Science.
        I am seeking internship roles in Machine Learning.
        What else do you need to know?
        <br>
        It gives Azure users a single platform for Big Data processing and 
        Machine Learning.
      </p>
      <p>
        Fast-forward to today, and I’ve had the privilege of working at
        <a href="https://us.mullenlowe.com/">an advertising agency</a>,
        <a href="https://starry.com/">a start-up</a>,
        <a href="https://www.apple.com/">a huge corporation</a>, and
        <a href="https://scout.camd.northeastern.edu/">a student-led design studio</a>. My
        main focus these days is building accessible, inclusive products and digital
        experiences at <a href="https://upstatement.com/">Upstatement</a> for a variety of
        clients.
      </p>

      <p>
        Here are a few technologies I've been working with recently:
      </p>
      <ul class="styled-list">
        <li v-for="skill in skills"> {{ skill }}</li>
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

import { skills } from "~/src/config";

</script>

<script lang="ts">
  export default {
    name: "About"
  }
</script>
