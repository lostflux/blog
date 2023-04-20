<template>
  <StyledArchivedProjectsSection>
    <h2 class="other-projects-header">
      Other Noteworthy Projects
    </h2>

    <!-- <NuxtLink class="inline-link archive-link" to="/archive" ref="revealArchiveLink">
      view the archive
    </NuxtLink> -->
    <TransitionGroup
      ref="projectsGrid"
      component="null"
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
        mode="in-out"
        tag="StyledArchivedProject"
        :style="{
          transitionDelay: `${i >= GRID_LIMIT ? (i - GRID_LIMIT) * 100 : 0}ms`,
        }"
      >
        <StyledArchivedProject>
          <div class="project-inner">
            <header class="archived-project-text">
              <div class="project-top">
                <div class="folder">
                  <Icon type="Folder" />
                </div>
                <div class="project-links">
                  <a
                    v-if="project.repo"
                    :href="project.repo"
                    aria-label="GitHub Link"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Icon type="GitHub" />
                  </a>
                  <a
                    v-if="project.url"
                    :href="project.url"
                    aria-label="External Link"
                    class="external"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Icon type="External" />
                  </a>
                </div>
              </div>

              <h3 class="project-title">
                <a
                  v-if="(project?.url || project.repo)"
                  :href="project.url ? project.url : project.repo"
                  target="_blank"
                  rel="noreferrer"
                >
                  {{ project.title }}
                </a>
                <span v-else>
                  {{ project.title }}
                </span>
              </h3>
              <ContentDoc :value="project" />
            </header>

            <Date
              v-if="project.date"
              class="archived-project-date"
              :weekday="false"
              :date="project.date"
            />

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

    <StyledButton
      v-if="projects.length > 6"
      id="more-button"
      ref="showMoreButton"
      class="more-button"
      @click="toggleShowMore"
    >
      Show {{ showMore ? 'Less' : 'More' }}
    </StyledButton>
  </StyledArchivedProjectsSection>
</template>

<script lang="ts" setup>

import { MarkdownParsedContent } from "@nuxt/content/dist/runtime/types";
import { delimiter } from "path";

const projectsGrid = ref<HTMLElement | null>(null);
const GRID_LIMIT = 6;

// read 'job-info' data from Markdown files
const { data: projectData } = await useAsyncData(
  `archived-projects-${useRoute().path}`,
  async () => {
    const _projectsData = queryContent<MarkdownParsedContent>("projects")
      .where({ featured: false })
      .sort({ date: -1 })
      .find();
    return await _projectsData;
  },
);

const projects = projectData.value;

const showMore = ref(false);
const showMoreButton = ref(null);
const totalCount = ref(projects.length);
const currentlyShowing = ref(Math.min(GRID_LIMIT, totalCount.value));

const toggleShowMore = () => {
  showMore.value = !showMore.value;
};

const isMax = () => currentlyShowing.value > (projects.length - 1);
const isMin = () => currentlyShowing.value <= GRID_LIMIT;

function showAnotherProject() {
  if (!isMax()) {
    currentlyShowing.value += 1;
  }
}

function hideAnotherProject() {
  if (!isMin()) {
    currentlyShowing.value -= 1;
  }
}

let timer = null; /// debug: I should catch this on destruction!
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
};
</script>

<style lang="sass">
@use "~/styles/typography"
@use "~/styles/colors"

.list-enter-active, .list-leave-active
  transition: all 2s ease

.list-enter, .list-leave-to
  opacity: 0
  transform: translateY(30px)

.other-projects-header
  font-weight: 600

* > h3
  font-weight: 600

.archived-project-date
  margin-top: 2em
  justify-self: end
  margin-top: auto
  margin-bottom: 10px

.archived-project-text
  margin-bottom: 2em
</style>
