<template>
  <StyledJobsSection id="jobs">
    <h2 class="numbered-heading">
      Work Experience
    </h2>
    <div class="inner hide fade-in">
      <StyledTabList
        role="tablist"
        aria-label="Job tabs"
        @keydown="onKeyDown"
      >
        <StyledTabButton
          v-for="job, i in jobs"
          ref="tabButtons"
          :identifier="i"
          :tabindex="activeTabId === i ? '0' : '-1'"
          :aria-controls="`panel-${i}`"
          :aria-selected="activeTabId === i ? true : false"
          role="tab"
          @click="
            () => {
              setActiveTabId(i);
              selectTab(i);
            }"
        >
          <span>
            {{ `${job.company}` }}
          </span>
        </StyledTabButton>
        <StyledHighlight ref="highlight" />
      </StyledTabList>

      <StyledTabPanels>
        <TransitionGroup
          name="fade"
          :timeout="250"
        >
          <StyledTabPanel
            v-for="job, i in jobs"
            :id="`panel-${i}`"
            :key="i"
            ref="tabs"
            :identifier="i"
            role="tabpanel"
          >
            <h3>
              {{ job.title }}
              <span class="company">
                &nbsp;@&nbsp;
                <a
                  :href="job.url"
                  class="link"
                >
                  {{ job.company }}
                </a>
              </span>
            </h3>
            <p class="range">
              {{ job.range }}
            </p>
            <ContentDoc :value="job" />
          </StyledTabPanel>
        </TransitionGroup>
      </StyledTabPanels>
    </div>
  </StyledJobsSection>
</template>

<script setup lang="ts">

import { ref } from "vue";
import { MarkdownParsedContent } from "@nuxt/content/dist/runtime/types";
import {
  NumRefManager,
  KEY_CODES,
} from "~/modules/utils";

// read 'job-info' data from Markdown files
const { data: jobsData } = await useAsyncData(
  `jobs-${useRoute().path}`,
  async () => {
    const _jobsData = queryContent<MarkdownParsedContent>("jobs")
      .where({ category: "jobs-info" })
      .sort({ date: -1 })
      .find();
    return await _jobsData;
  },
);

// parse job info and store in an array, sorted by date
// const jobs = Array<ParsedJobInfo>();
const jobs = jobsData.value
  ? jobsData.value
  : [];

let activeTabId = 0;
const tabFocus = new NumRefManager(jobs.length - 1);

const tabs = ref([]);
const tabButtons = ref([]);
const highlight = ref(null);

const setActiveTabId = (id: number) => {
  // mute old tab if active
  tabs.value[activeTabId]?.muteTab();

  // change active tab to current
  tabFocus.value = id;

  activeTabId = id;
  tabs.value[activeTabId]?.activateTab();

  // show the corresponding tab panel
  highlight.value?.highlight(id);
};

const focusTab = () => {
  tabButtons.value[tabFocus.value]?.focus();
};

let selectedTab = 0;
const selectTab = (id: number) => {
  if (id !== selectedTab) {
    tabButtons.value[selectedTab]?.deselect();
    selectedTab = id;
    tabButtons.value[selectedTab]?.select();
  }
};

// Only re-run the effect if tabFocus changes
watch(tabFocus.ref, focusTab);

// Focus on tabs when using up & down arrow keys
const onKeyDown = (event) => {
  switch (event.key) {
    case KEY_CODES.ARROW_UP: {
      event.preventDefault();
      tabFocus.prev();
      break;
    }

    case KEY_CODES.ARROW_DOWN: {
      event.preventDefault();
      tabFocus.next();
      break;
    }

    default: {
      break;
    }
  }
};

</script>

<script lang="ts">
export default {
  name: "Jobs",
};
</script>

<style lang="sass" scoped>
// @use "~/styles/default"

</style>
