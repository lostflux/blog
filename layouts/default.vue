<template>
  <div id="root">
    <a class="skip-to-content" href="#content">
      Skip to Content
    </a>
    <div class="styled-content">
      <AppHeader/>
      <slot />
      <AppFooter/>
    </div>
  </div>
</template>

<style lang="sass">
@use "../styles/default"

.styled-content
  display: flex
  flex-direction: column
  min-height: 100vh
</style>

<script lang="ts">
  export default {
    name: "DefaultLayout",
    props: {
      title: {
        type: String,
        default: "Default Layout"
      },
      children: {
        type: Object,
        default: null
      }
    }
  }
</script>

<script setup lang="ts">

import { useState, useEffect, useRef } from "~/src/stateful";

const isHome = useRoute().path === "/";
const [isLoading, setIsLoading] = useState(isHome);
const [isMounted, setMounted] = useState(false);

// Sets target="_blank" rel="noopener noreferrer" on external links
const handleExternalLinks = () => {
  const allLinks = Array.from(document.querySelectorAll('a'));
  if (allLinks.length > 0) {
    allLinks.forEach(link => {
      if (link.host !== window.location.host) {
        link.setAttribute('rel', 'noopener noreferrer');
        link.setAttribute('target', '_blank');
      }
    });
  }
};

useEffect(() => {
  if (isLoading) {
    return;
  }

  if (location.hash) {
    const id = location.hash.substring(1); // location.hash without the '#'
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView();
        el.focus();
      }
    }, 0);
  }

  handleExternalLinks();
}, [useRef(isLoading)]);
</script>
