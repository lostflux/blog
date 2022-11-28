<template>
    <StyledJobsSection>
      <h2 class="numbered-heading">Work Experience</h2>
      <div class="inner">
        <StyledTabList
          role="tablist"
          aria-label="Job tabs"
          @keyDown="onKeyDown"
        >
          <StyledTabButton
            v-for="job in jobs"
            :id="`tab-${job.i}`"
            :tabindex="activeTabId === job.i ? '0' : '-1'"
            :aria-controls="`panel-${job.i}`"
            :aria-selected="activeTabId === job.i ? true : false"
            @click="logSetActiveTabId(job.i)"
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
            <p> Active: {{ tabs[job.i] }} </p>
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
            <StyledText>
              <ul class="styled-list">
                <li v-for="point in job.points" :key="point.id">
                  {{ point.text }}
                </li>
              </ul>
            </StyledText>
          </StyledTabPanel>
        </StyledTabPanels>
      </div>
    </StyledJobsSection>
</template>

<script setup lang="ts">

import { 
  MarkdownParsedContent,
  MarkdownRoot,
  Toc 
} from "@nuxt/content/dist/runtime/types";
import { useState, useRef, useEffect } from "~/src/stateful";
import { srConfig } from '~/src/config';
import { KEY_CODES } from '~/src/utils';
import { usePrefersReducedMotion } from '~/src/hooks';
import { ref } from "vue";

const path = useRoute();


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

  constructor(job: MarkdownParsedContent) {
    this.body = job.body;
    this.date = job.date;
    this.title = job.title;
    this.company = job.company;
    this.location = job.location;
    this.range = job.range;
    this.url = job.url;
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
const { data, error } = await useAsyncData(`content-${path.path}`, async () => {
  let jobsData = queryContent<MarkdownParsedContent>().where({category: "jobs-info"}).find();
  const data = await jobsData.then((item) => {
    return item 
  });
  return data;
});




// parse job info and store in an array, sorted by date
var jobs = Array<ParsedJobInfo>();

data?.value.forEach((item, i) => {
  jobs.push(new ParsedJobInfo(item));
});

jobs.sort((a, b) => a.compare(b));

// index jobs by order
jobs.map((job, i) => {
  job.i = i;
});


const initTabs = () => {
  var _tabs = ref([])
  return _tabs;
};
    
  // const [activeTabId, setActiveTabId] = useState(0);
var activeTabId = 0;
var tabs = initTabs();
var highlight = ref(null);
// console.log(`tabs: ${tabs}`);

const setActiveTabId = (id: number) => {
  tabs.value[activeTabId]?.muteTab();
  // tabs[activeTabId]. = 0;
  activeTabId = id;
  // tabs[activeTabId] = 1;
  tabs.value[activeTabId]?.activateTab();
  highlight.value?.highlight(id)
}

const logSetActiveTabId = (id: number) => {
  console.log(`current activeTabId: ${activeTabId}`);
  console.log(`Setting active tab to ${id}`);
  // activeTabId = id;
  setActiveTabId(id);
  console.log(`new activeTabId: ${activeTabId}`);
  console.log(`tabs: ${tabs}`);
}

logSetActiveTabId(0);





const [tabFocus, setTabFocus] = useState(0);


  
 


  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect( () => {
    if (prefersReducedMotion) {
      return;
    }
    const importScrollReveal = async () => {
      const scrollReveal = await import("~/src/utils/sr");
      return scrollReveal.default;
    }
    
    const sr = importScrollReveal()
    .then((sr) => {
      sr.reveal(revealContainer.value, srConfig());
    })
    .catch(console.error);    
    }, [])
  ;
  


  const focusTab = () => {
    console.log(`focusTab: ${tabFocus}`);
    if (tabs[tabFocus]) {
      tabs[tabFocus].focus();
      return;
    }
    // If we're at the end, go to the start
    if (tabFocus >= tabs.value.length) {
      setTabFocus(0);
    }
    // If we're at the start, move to the end
    if (tabFocus < 0) {
      setTabFocus(tabs.value.length - 1);
    }
  };

  // Only re-run the effect if tabFocus changes
  useEffect(() => focusTab(), [ useRef(tabFocus) ]);

  // Focus on tabs when using up & down arrow keys
  const onKeyDown = e => {
    switch (e.key) {
      case KEY_CODES.ARROW_UP: {
        e.preventDefault();
        setTabFocus(tabFocus - 1);
        break;
      }

      case KEY_CODES.ARROW_DOWN: {
        e.preventDefault();
        setTabFocus(tabFocus + 1);
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
