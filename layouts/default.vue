<template>
  <body>
    <div id="root">
      <a class="skip-to-content" href="#content">
        Skip to Content
      </a>
      <AppHeader/>
        <div id="content">
          <slot />
        </div>
      <AppFooter/>
    </div>
  </body>
</template>

<style lang="sass">
@use "../styles/default"
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


/// either fix the functionality or drop these...
isMounted;
setMounted;
setIsLoading;

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
    console.log(`id: ${id}`);
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
