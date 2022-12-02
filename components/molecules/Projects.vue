<template>
  <StyledArchivedProjectsSection>
    <h2>Other Noteworthy Projects</h2>

    <Link class="inline-link archive-link" to="/archive" ref={revealArchiveLink}>
      view the archive
    </Link>
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
                        v-if="project?.repo != null"
                        :href="project.repo"
                        aria-label="GitHub Link"
                        target="_blank"
                        rel="noreferrer"
                      >
                          <Icon type="GitHub" />
                      </a>
                      <a
                        v-if="project?.url != null"
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
                      v-if="project?.url != null"
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
                      v-for="tech, i in project?.tech"
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

const projectsGrid = ref<HTMLElement | null>(null); 
const GRID_LIMIT = 6;

// read 'job-info' data from Markdown files 
const { data: projectData } = await useAsyncData(
  `archived-projects-${useRoute().path}`,
  async () => {
    const _projectsData = queryContent<MarkdownParsedContent>("projects/all")
      .where( {show: true} )
      .sort( {date: -1} )
      .find();
    return await _projectsData;
});


const projects = projectData.value;

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

var timer = null; /// debug: I should catch this on destruction!
onMounted(() => {
  timer = setInterval(() => {
    showMore.value
      ? showAnotherProject()
      : hideAnotherProject();
  }, 1000);
});

onUnmounted(() => {
  clearInterval(timer);
});

</script>

<script lang="ts">
  export default {
    name: "Projects",
  }
</script>

<style lang="sass">
.list-enter-active, .list-leave-active
  transition: all 2s ease

.list-enter, .list-leave-to
  opacity: 0
  transform: translateY(30px)
</style>
