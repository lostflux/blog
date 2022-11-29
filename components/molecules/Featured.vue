<template>
  <section id="projects">
    <h2 class="numbered-heading">
      Some Things I've Built
    </h2>
    <StyledProjectsGrid>
      <StyledProject
        v-for="project in projects"
        :key="project.i"
      >
        <div class="project-content">
          <div>
            <p class="project-overline">Featured Project</p>
            <h3 class="project-title">
              <a
                v-if="project.url !== null"
                :href="project.url"
              >
                {{ project.title }}
              </a>
              <span v-else>
                {{ project.title }}
              </span>
              <span v-if="project.company !== null"  class="project-company">
                &nbsp;@&nbsp;
                <a :href="project.company.url" class="inline-link">
                  {{ project.company.name }}
                </a>
              </span>
            </h3>
            <div class="project-description">
              <p>
                {{ project.description }}
              </p>
            </div>
          </div>
          <ul class="project-tech-list">
            <li v-for="tech in project.tech" :key="tech">
              {{ tech }}
            </li>
          </ul>
          <div class="project-links">
            <a
              v-if="project.repo !== null"
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

import { MarkdownParsedContent, MarkdownRoot, Toc } from '@nuxt/content/dist/runtime/types';

const joinPaths = (...args: string[]) => {
  args.forEach((arg, i) => {
    if ( (arg.startsWith('/') || arg.startsWith('./')) && i !== 0) {
      args[i] = arg.slice(1);
    }
    if (arg.endsWith('/') && i !== args.length - 1) {
      args[i] = arg.slice(0, -1);
    }
  });
  return args.join('/').replace(/\/+/g, '/');
}

class ParsedProjectInfo {
  title: string;
  description: string;
  tech: Array<string>;
  
  url: string | null;
  repo: string | null;

  cover: string;


  body: MarkdownRoot & { toc?: Toc; };
  i: number;
  company: {
    name: string;
    url: string;
  } | null;

  constructor(project: MarkdownParsedContent, projectIndex: number) {
    this.title = project.title;
    this.description = project.description;
    this.tech = project.tech;
    this.url = project.external || null;
    this.repo = project.github || null;
    this.body = project.body;
    this.i = projectIndex;
    this.company = project.company || null;

    var coverPath = joinPaths("~assets", project._path, project.cover).trim();
    // if (coverPath.startsWith('/')) {
    //   coverPath = coverPath.substring(1);
    // }
    this.cover = coverPath
    this.cover = "~assets/images/halcyon.jpg"
    console.log(`
      project._path: ${project._path}
      project.cover: ${project.cover}
      this.cover: ${this.cover}
      `);
  }
}


// read 'job-info' data from Markdown files 
const { data: projectData, error } = await useAsyncData(
  `projects-${useRoute().path}`,
  async () => {
    const _projectsData = queryContent<MarkdownParsedContent>()
      .where( {category: "featured-project"} )
      .sort( {date: -1} )
      .find();
    return await _projectsData;
});

// parse job info and store in an array, sorted by date
const projects = Array<ParsedProjectInfo>();

/// DEBUG
// projectData ? projectData.value.forEach(console.log) : console.log(error);

projectData.value?.forEach((item, i) => {
  projects.push(new ParsedProjectInfo(item, i));
});
</script>
