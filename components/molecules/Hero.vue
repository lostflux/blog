<template>
  <div class="fill-height">
    <div id="hero">
      <template v-for="{level, content} in items">
        <h1 v-if="level === 'h1'"> {{ content }} </h1>
        <h2 v-else-if="level === 'h2'"> {{ content }} </h2>
        <h3 v-else-if="level === 'h3'"> {{ content }} </h3>
        <p v-else-if="level === 'p'"> {{ content }} </p>
        <a
          v-else-if="level === 'a'"
          href="mailto:amittaijoel@outlook.com"
          target="_blank"
          rel="noreferrer"
        > {{ content }} </a>
      
      </template>
    </div>

  </div>
</template>

<script lang="ts" setup>
import { useState, useEffect } from "~/src/stateful";

const [isMounted, setIsMounted] = useState(false);

onMounted(() => {
  setIsMounted(true);
});

const one = {level: "h1", content: "Hi, my name is"};
const two = {level: "h2", content: "Altair"};
const three = {level: "h3", content: "I build things for the web"};
const four = {
  level: "p",
  content: `
    I am a software engineer and student at Dartmouth College.
    I am passionate about building the next important solutions
    using emerging technologies such as Machine Learning and Blockchain.`,
};

const five = {level: "a", content: "Up for a chat?" };

const items = [one, two, three, four, five];

</script>

<script lang="ts">
export default {
  name: "Hero",
}
</script>

<style lang="sass">
@use "~/styles/mixins"
@use "~/styles/colors"
@use "~/styles/typography"

#hero
  @include mixins.flex-center
  flex-direction: column
  align-items: flex-start
  min-height: 100vh
  padding: 0

  @media (max-width: 480px) and (min-height: 700px)
    padding-bottom: 10vh

  h1
    margin: 0 0 30px 4px
    color: colors.color("green")
    font-family: typography.font("font-mono")
    font-size: clamp(typography.font-size("s"), 5vw, typography.font-size("m"))
    font-weight: 400

    @media (max-width: 480px)
      margin: 0 0 20px 2px
    
  h3
    margin-top: 10px
    color: colors.color("slate")
    line-height: 0.9
  
  p 
    margin: 20px 0 0
    max-width: 540px
  
  a
    // @include mixins.big-button
    margin-top: 50px
  
</style>
