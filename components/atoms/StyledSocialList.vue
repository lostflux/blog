<template>
  <ul
    v-for="item in social"
    :key="item.name"
    class="social-list"
  >
    <li>
      <a
        :href="item.url"
        :aria-label="item.name"
        :title="item.name"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Icon :type="item.name" />
      </a>
    </li>
    
  </ul>


</template>

<script lang="ts" setup>

import { social } from '~/src/config';

</script>

<script lang="ts">
  export default {
    name: "SocialLinks",
    props: {
      isHome: {
        type: Boolean,
        default: false
      }
    }
  }
</script>
