<template>
  <StyledArchivedProjectsSection>
    <h2>Other Noteworthy Projects</h2>

    <Link class="inline-link archive-link" to="/archive" ref={revealArchiveLink}>
      view the archive
    </Link>

    <!-- <ul class="projects-grid"> -->
        <TransitionGroup
          component="null"
          ref="projectsGrid"
          tag="ul"
          class="projects-grid"
        >
          <Transition
            v-for="project, i in projects"
            v-show="i < currentlyShowing"
            :key="i"
             class="fadeup"
            :timeout="i >= GRID_LIMIT ? (i - GRID_LIMIT) * 300 : 300"
            :exit="false"
            mode="fade"
            tag="StyledArchivedProject"
            :style="{
              transitionDelay: `${i >= GRID_LIMIT ? (i - GRID_LIMIT) * 100 : 0}ms`,
            }"
          >
            <StyledArchivedProject
            >
              <div class="project-inner">
                <header>
                  <div class="project-top">
                    <div class="folder">
                      <Icon type="Folder" />
                    </div>
                    <div class="project-links">
                      <a
                        v-if="project.repo !== null"
                        :href="project.repo"
                        aria-label="GitHub Link"
                        target="_blank"
                        rel="noreferrer"
                      >
                          <Icon type="GitHub" />
                      </a>
                      <a
                        v-if="project.url !== null"
                        :href="project.url"
                        aria-label="External Link"
                        class="external"
                        target="_blank"
                        rel="noreferrer">
                        <Icon type="External" />
                      </a>
                    </div>
                  </div>

                  <h3 class="project-title">
                    <a
                      v-if="project.url !== null"
                      :href="project.url"
                      target="_blank"
                      rel="noreferrer">
                      {{ project.title }}
                    </a>
                    <span v-else>
                      {{ project.title }}
                    </span>
                  </h3>

                  <p class="project-description">
                    {{ project.description }}
                  </p>
                </header>

                <footer>
                  <ul class="project-tech-list">
                    <li
                      v-for="tech, i in project.tech"
                      :key="i"
                    >
                      {{ tech }}
                    </li>
                  </ul>
                </footer>
              </div>
            </StyledArchivedProject>
          </Transition>
        </TransitionGroup>
    <!-- </ul> -->

    <button
      v-if="projects.length > 6"
      class="more-button"
      ref="showMoreButton"
      id="more-button"
      @click="toggleShowMore">
      Show {{ showMore ? 'Less' : 'More' }}
    </button>
  </StyledArchivedProjectsSection>
</template>

<script lang="ts" setup>

import { MarkdownParsedContent } from '@nuxt/content/dist/runtime/types';

class ParsedProjectInfo {
  title: string;
  tech: Array<string>;
  url: string | null;
  repo: string | null;
  description: string;

  constructor( _raw: MarkdownParsedContent) {
    this.title = _raw.title;
    this.tech = _raw.tech;
    this.url = _raw.url || null;
    this.repo = _raw.repo || null;
    this.description = _raw.description;
  }
}

const projectsGrid = ref<HTMLElement | null>(null); 
const GRID_LIMIT = 6;

// read 'job-info' data from Markdown files 
const { data: projectData, error } = await useAsyncData(
  `archived-projects-${useRoute().path}`,
  async () => {
    const _projectsData = queryContent<MarkdownParsedContent>("projects/all")
      .where( {show: true} )
      .sort( {date: -1} )
      .find()
      .then( (projects) => {
        return projects.map( (project) => new ParsedProjectInfo(project) );
      });
    return await _projectsData;
});


const projects = projectData
  ? projectData.value
  : [];

const showMore = ref(false);
const showMoreButton = ref(null);
const totalCount = ref(projects.length);
const currentlyShowing = ref(Math.min(GRID_LIMIT, totalCount.value));

const toggleShowMore = () => {
  // currentlyShowing.value = showMore.value ? 6 : projects.length;
  // this.more = !this.more;
  showMore.value = !showMore.value;
};

const isMax = () => currentlyShowing.value == (projects.length - 1);
const isMin = () => currentlyShowing.value <= GRID_LIMIT;

function showAnotherProject() {
  if (!isMax()) {
    currentlyShowing.value += 1;
    // this.current = currentlyShowing.value;
    this.$forceUpdate();
  }
}

function hideAnotherProject() {
  if (!isMin()) {
    currentlyShowing.value -= 1;
    // this.current = currentlyShowing.value;
    this.$forceUpdate();
  }
}

var timer = null;
onMounted(() => {
  timer = setInterval(() => {
    showMore.value
      ? showAnotherProject()
      : hideAnotherProject();
  }, 1000);
});



</script>

<script lang="ts">



  export default {
    name: "Projects",

    // data() {
    //   return {
    //     more: false,
    //     current: 6,
    //     timer: null,
    //   };
    // },
    // methods: {
    //   // toggleMore() {
    //   //   // this.$forceUpdate();
    //   //   // this.more = !this.more;
    //   // },
    //   showAnotherProject() {
    //     if (!isMax()) {
    //       currentlyShowing.value += 1;
    //       // this.current = currentlyShowing.value;
    //       this.$forceUpdate();
    //     }
    //   },
    //   hideAnotherProject() {
    //     if (!isMin()) {
    //       currentlyShowing.value -= 1;
    //       // this.current = currentlyShowing.value;
    //       this.$forceUpdate();
    //     }
    //   },
    // },
    // watch: {
    //   current(newVal) {
    //     this.$forceUpdate();
    //   }
    // },

    // mounted() {
    //   this.timer = setInterval(() => {
    //     if (showMore.value) {
    //       this.showAnotherProject();
    //     } else {
    //       this.hideAnotherProject();
    //     }
    //   }, 3000);
    // },
    // beforeDestroy() {
    //   clearInterval(this.timer);
    // },
  }
</script>

<style lang="sass">
.list-enter-active, .list-leave-active
  transition: all 2s ease

.list-enter, .list-leave-to
  opacity: 0
  transform: translateY(30px)
</style>
