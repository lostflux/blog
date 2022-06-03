<template>
  <div id="root">
    <AppHeader/>
    <div id="theme">
      <a className="skip-to-content" href="#content">
        Skip to Content
      </a>
      <div className="styled-content">
        <AppHeader />
        <!-- <Nav isHome={isHome} /> -->
        <!-- <Social isHome={isHome} /> -->
        <!-- <Email isHome={isHome} /> -->

        <div id="content">
          {children}
          <AppFooter />
        </div>
      </div>

    </div>
    <!-- <slot/> -->
    <!-- <AppFooter/> -->
  </div>
</template>

<style lang="sass">

  .styled-content
    display: flex
    flex-direction: column
    min-height: 100vh
    
</style>

<script lang="ts">
  import AppHeader from "../components/AppHeader.vue"
  import AppFooter from "../components/AppFooter.vue"
  import { useState, useEffect } from 'react'

  const Layout = ({ children, location }) => {
    const isHome = location.pathname === '/';
    const [isLoading, setIsLoading] = useState(isHome);

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
    }, [isLoading]);
  };
  export default {
    components: {
      AppHeader,
      AppFooter
    },
    layout: 'default'
  }
</script>
