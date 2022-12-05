<template>
  <StyledJobsSection id="jobs">
    <h2 class="numbered-heading">Work Experience</h2>
    <div class="inner">
      <StyledTabList
        role="tablist"
        aria-label="Job tabs"
        @keydown="onKeyDown"
      >
        <StyledTabButton
          v-for="job, i in jobs"
          :identifier="i"
          ref="tabButtons"
          :tabindex="activeTabId === i ? '0' : '-1'"
          :aria-controls="`panel-${i}`"
          :aria-selected="activeTabId === i ? true : false"
          @click="
            () => {
              setActiveTabId(i);
              selectTab(i);
            }"
          role="tab"
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
            :key="i"
            :identifier="i"
            ref="tabs"
            role="tabpanel"
            :id="`panel-${i}`"
          >
            <h3>
              {{ job.title }}
              <span class="company">
                &nbsp;@&nbsp;
                <a :href="job.url" class="link">
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

import {
  NumRefManager
} from "~/src/utils";
import { useEffect } from "~/src/stateful";
import { KEY_CODES } from '~/src/utils';
import { ref } from "vue";
import { MarkdownParsedContent } from "@nuxt/content/dist/runtime/types";


// read 'job-info' data from Markdown files 
const { data: jobsData } = await useAsyncData(
  `jobs-${useRoute().path}`,
  async () => {
    const _jobsData = queryContent<MarkdownParsedContent>("jobs")
      .where( { category: "jobs-info" } )
      .sort( { date: -1 } )
      .find();
    return await _jobsData;
});

// parse job info and store in an array, sorted by date
// const jobs = Array<ParsedJobInfo>();
const jobs = jobsData.value
  ? jobsData.value
  : [];



var activeTabId = 0;
const tabFocus = new NumRefManager(jobs.length - 1);





const tabs = ref([]);
const tabButtons = ref([]);
var highlight = ref(null);

const setActiveTabId = (id: number) => {

  // mute old tab if active
  tabs.value[activeTabId]?.muteTab();

  // change active tab to current
  tabFocus.value = id;

  activeTabId = id;
  tabs.value[activeTabId]?.activateTab();

  // show the corresponding tab panel
  highlight.value?.highlight(id)

}

const focusTab = () => {
  tabButtons.value[tabFocus.value]?.focus();
};

var selectedTab = 0;
const selectTab = (id: number) => {
  if (id !== selectedTab) {
    tabButtons.value[selectedTab]?.deselect();
    selectedTab = id;
    tabButtons.value[selectedTab]?.select();
  }
};

// Only re-run the effect if tabFocus changes
useEffect(() => focusTab(), tabFocus.ref);

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
}
</script>

<style lang="sass" scoped>
// @use "~/styles/default"

</style>
