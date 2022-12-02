<template>
  <section id="projects">
    <h2 class="numbered-heading">
      Some Things I've Built
    </h2>
    <StyledProjectsGrid>
      <StyledProject
        v-for="project, i in projects"
        :key="i"
      >
        <div class="project-content">
          <div>
            <p class="project-overline">Featured Project</p>
            <h3 class="project-title">
              <a
                v-if="project?.url !== null"
                :href="project.url"
              >
                {{ project.title }}
              </a>
              <span v-else>
                {{ project.title }}
              </span>
              <template v-if="hasCompany(project)">
                <span 
                  v-if="hasCompany(project)"
                  class="project-company">
                  &nbsp;@&nbsp;
                </span>
                <a
                  v-if="
                    project?.company?.url !== null &&
                    project?.company?.name !== ''"
                  :href="project.company.url">
                  {{ project.company.name }}
                </a>
              </template>
            </h3>
            <div class="project-description">
              <ContentDoc :value="project" />
            </div>
          </div>
          <ul class="project-tech-list">
            <li v-for="tech in project.tech" :key="tech">
              {{ tech }}
            </li>
          </ul>
          <div class="project-links">
            <a
              v-if="project?.repo !== null"
              :href="project.repo"
              aria-label="GitHub Link"
            >
              <Icon type="GitHub" />
            </a>
            <a
              v-if="project.url !== null"
              :href="project.url"
            >
              <Icon type="ExternalLink" />
            </a>
          </div>
        </div>   
        <div class="project-image">
          <a :href="project.url ? project.url : project.repo ? project.repo : '#'">
            <img
              src="~assets/images/neural.gif"
              :alt="project.title"
              class="img"
              quality="100"
              formats="AUTO, WEBP, AVIF"
            />
          </a>
        </div>
      </StyledProject>
    </StyledProjectsGrid>
  </section>
  
</template>

<script lang="ts">
  export default {
    name: "Featured",
  }
</script>

<script lang="ts" setup>

const hasCompany = (project: any) => typeof project.company !== 'undefined';


// read 'job-info' data from Markdown 
const { data } = await useAsyncData(
  `projects-${useRoute().path}`,
  async () => {
    const _projectsData = queryContent("projects/featured")
      .where( {show: "true"} )
      .sort( {date: -1} )
      .find();
    return await _projectsData;
});

const projects = data.value;

</script>
