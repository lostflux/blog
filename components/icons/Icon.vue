<template>
  <AppStoreIcon          v-if="type.toLowerCase() === 'app store'" />
  <BookMarkIcon     v-else-if="type.toLowerCase() === 'bookmark'" />
  <CodePenIcon      v-else-if="type.toLowerCase() === 'codepen'" />
  <ExternalLinkIcon v-else-if="type.toLowerCase() === 'external link'" />
  <FolderIcon       v-else-if="type.toLowerCase() === 'folder'" />
  <GitHubIcon       v-else-if="type.toLowerCase() === 'github'" />
  <InstagramIcon    v-else-if="type.toLowerCase() === 'instagram'" />
  <LinkedInIcon     v-else-if="type.toLowerCase() === 'linkedin'" />
  <LogoIcon         v-else-if="type.toLowerCase() === 'logo'" />
  <LogoIconLoader   v-else-if="type.toLowerCase() === 'logo loader'" />
  <PlayStoreIcon    v-else-if="type.toLowerCase() === 'play store'" />
  <StarIcon         v-else-if="type.toLowerCase() === 'star'" />
  <TwitterIcon      v-else-if="type.toLowerCase() === 'twitter'" />
  <ExternalLinkIcon v-else />

</template>

<script lang="ts">

/// accept name as icon identifier

export default {
  name: "Icon",
  props: {
    type: {
      type: String,
      required: true
    }
  },
}
</script>
