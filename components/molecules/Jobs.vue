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
          v-for="job in jobs"
          :identifier="job.i"
          ref="tabButtons"
          :tabindex="activeTabId === job.i ? '0' : '-1'"
          :aria-controls="`panel-${job.i}`"
          :aria-selected="activeTabId === job.i ? true : false"
          @click="
            () => {
              setActiveTabId(job.i);
              selectTab(job.i);
            }"
          role="tab"
        > 
          <span>
            {{ `${job.i}: ${job.company}` }}
          </span>
        </StyledTabButton>
        <StyledHighlight ref="highlight" />
      </StyledTabList>

      <StyledTabPanels>
        <StyledTabPanel
          v-for="job in jobs"
          :identifier="job.i"
          ref="tabs"
          role="tabpanel"
          id="`panel-${job.i}`"
        >
          <h3>
            {{ job.title }}
            <span class="company">
              &nbsp;@&nbsp;
              <a :href="job.url" class="inline-link">
                {{ job.company }}
              </a>
            </span>
          </h3>
          <p class="range">
            {{ job.range }}
          </p>
          <ul class="styled-list">
            <li v-for="point in job.points" :key="point.id">
              <StyledText>
                {{ point.text }}
              </StyledText>
              </li>
            </ul>
        </StyledTabPanel>
      </StyledTabPanels>
    </div>
  </StyledJobsSection>
</template>

<script setup lang="ts">

import {
  NumRefManager
} from "~/src/utils";
import { useState, useRef, useEffect } from "~/src/stateful";
import { srConfig } from '~/src/config';
import { KEY_CODES } from '~/src/utils';
import { usePrefersReducedMotion } from '~/src/hooks';
import { Ref, ref } from "vue";
import { MarkdownRoot, Toc, MarkdownParsedContent } from "@nuxt/content/dist/runtime/types";


class ParsedJobInfo {
  date: Date;
  title: string;
  company: string;
  location: string;
  range: string;
  url: string;
  details: Array<string>;
  points: Array<{ id: number, text: string }>;
  body: MarkdownRoot & { toc?: Toc; };
  i: number;

  constructor(job: MarkdownParsedContent, jobIndex: number) {
    this.body = job.body;
    this.date = job.date;
    this.title = job.title;
    this.company = job.company;
    this.location = job.location;
    this.range = job.range;
    this.url = job.url;
    this.i = jobIndex;
    this.points = job.details.map((detail: any, i: any) => {
      return {
        id: i,
        text: detail
      }
    });
  }

  public compare = (other: ParsedJobInfo) => {
    return this.date > other.date ? -1 : 1;
  }
};




// read 'job-info' data from Markdown files 
const { data: jobsData, error } = await useAsyncData(
  `jobs-${useRoute().path}`,
  async () => {
    const _jobsData = queryContent<MarkdownParsedContent>("jobs")
      .where( { category: "jobs-info" } )
      .sort( { date: -1 } )
      .find();
    return await _jobsData;
});

// parse job info and store in an array, sorted by date
const jobs = Array<ParsedJobInfo>();

jobsData?.value.forEach((item, i) => {
  jobs.push(new ParsedJobInfo(item, i));
});









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

// setActiveTabId(0);





// const [tabFocus, setTabFocus] = useState(0);


  
 


  // const revealContainer = useRef(null);
  // const prefersReducedMotion = usePrefersReducedMotion();

  // useEffect( () => {
  //   if (prefersReducedMotion) {
  //     return;
  //   }
  //   const importScrollReveal = async () => {
  //     const scrollReveal = await import("~/src/utils/sr");
  //     return scrollReveal.default;
  //   }
    
  //   const sr = importScrollReveal()
  //   .then((sr) => {
  //     sr.reveal(revealContainer.value, srConfig());
  //   })
  //   .catch(console.error);    
  //   }, [])
  // ;
  


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
