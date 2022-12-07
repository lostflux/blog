<template>
  <AppStoreIcon v-if="type?.toLowerCase() === 'app store'" />
  <BookMarkIcon
    v-else-if="type?.toLowerCase() === 'bookmark'"
    :active="active"
  />
  <CodePenIcon v-else-if="type?.toLowerCase() === 'codepen'" />
  <FolderIcon v-else-if="type?.toLowerCase() === 'folder'" />
  <ForkIcon v-else-if="type?.toLowerCase() === 'fork'" />
  <GitHubIcon v-else-if="type?.toLowerCase() === 'github'" />
  <InstagramIcon v-else-if="type?.toLowerCase() === 'instagram'" />
  <LinkedInIcon v-else-if="type?.toLowerCase() === 'linkedin'" />
  <LogoIcon v-else-if="type?.toLowerCase() === 'logo'" />
  <LogoIconLoader v-else-if="type?.toLowerCase() === 'logo loader'" />
  <PlayStoreIcon v-else-if="type?.toLowerCase() === 'play store'" />
  <StarIcon v-else-if="type?.toLowerCase() === 'star'" />
  <TwitterIcon v-else-if="type?.toLowerCase() === 'twitter'" />
  <SearchIcon v-else-if="type?.toLowerCase() === 'search'" />
  <InfoIcon v-else-if="type?.toLowerCase() === 'info'" />
  <SuccessIcon v-else-if="type?.toLowerCase() === 'success'" />
  <ErrorIcon v-else-if="type?.toLowerCase() === 'error'" />
  <WarningIcon v-else-if="type?.toLowerCase() === 'warning'" />
  <CriticalIcon v-else-if="type?.toLowerCase() === 'critical'" />
  <BlogSystemsIcon v-else-if="type?.toLowerCase() === 'blog-systems'" />
  <BlogResearchIcon v-else-if="type?.toLowerCase() === 'blog-research'" />
  <BlogMiscIcon v-else-if="type?.toLowerCase() === 'blog-misc'" />
  <BlogReadingsIcon v-else-if="type?.toLowerCase() === 'blog-readings'" />
  <BlogAppliedIcon v-else-if="type?.toLowerCase() === 'blog-applied'" />
  <BlogTheoryIcon v-else-if="type?.toLowerCase() === 'blog-theory'" />
  <BlogPublicationsIcon v-else-if="type?.toLowerCase() === 'blog-publications'" />
  <ExpandIcon v-else-if="type?.toLowerCase() === 'expand'" />
  <ExpandDiagonalIcon v-else-if="type?.toLowerCase() === 'expand-diagonal'" />
  <DownArrowIcon v-else-if="type?.toLowerCase() === 'down-arrow'" />
  <EditIcon v-else-if="type?.toLowerCase() === 'edit'" />
  <LikeIcon
    v-else-if="type?.toLowerCase() === 'like'"
    :active="active"
  />
  <CommentIcon v-else-if="type?.toLowerCase() === 'comment'" />
  <ExternalLinkIcon v-else />
</template>

<script lang="ts">
export default {
  name: "Icon",
  props: {
    type: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
