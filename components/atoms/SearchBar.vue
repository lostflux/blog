<template>
  <div
    id="site-search-background"
    ref="siteSearchBackground"
    class="site-search-background hidden"
  >
    <div
      ref="siteSearch"
      class="site-search"
    >
      <!-- <div class="blog-list-container"> -->
      <div class="left">
        <BlogTitle custom-title="search" />
      </div>
      <div class="right">
        <div class="content">
          <form class="site-search-form">
            <input
              id="searchbar"
              ref="textBar"
              v-model="searchTerm"
              type="text"
              class="site-search-input"
              tabindex="0"
              placeholder="search"
            >
          </form>
          <div
            v-for="year in years"
            :key="year"
            class="blog-list-year"
          >
            <div class="blog-list-year-title">
              {{ year }}
            </div>
            <ul class="blog-list">
              <BlogListItem
                v-for="(blog, i) in blogs.filter((blog) => new Date(blog.date).getFullYear() === year)"
                :key="i"
                :blog="blog"
              />
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const textBar = ref(null);

const siteSearch = ref<HTMLElement>(null);
const siteSearchBackground = ref<HTMLElement>(null);
onClickOutside(siteSearch, () => {
  const btn = document.querySelector(".menu-button");
  btn.classList.remove("clicked");
  siteSearchBackground.value?.classList.add("hidden");
});

</script>

<script lang="ts">

export default {
  name: "SearchBar",
  data() {
    return {
      searchTerm: "",
      result: null,
      searchPaths: [],
      blogs: [],
      years: [],
    };
  },

  watch: {
    searchTerm() {
      this.search();
    },
    // hideResults() {
    //   console.log(`hideResults: ${this.hideResults}`);
    // },
    // result() {
    //   console.log(this.result);
    // },
  },
  mounted() {
  },

  methods: {
    async search() {
      if (!this.searchTerm) {
        this.result = null;
        return;
      }
      const { search } = useAlgoliaSearch("netlify_e0f5d7d0-9d2a-45ae-8962-6e3af2ec4cf3_main_all");
      search({ query: this.searchTerm })
      // search({ query: "machine learning" })
        .then(async (result) => {
          /**
           * Only show content pages in search results.
           * NOTE on depths:
           * 1: /
           * 2: /writing
           * 3: /writing/{computing, math, misc, etc}
           * 4: /writing/{computing, math, misc, etc}/{post}
          */
          // result.hits = result.hits.filter((hit) => hit.urlDepth === 4);
          this.result = result;
          this.searchPaths = this.result.hits.map((hit) => useTrimmedPath(hit.url).path);
          console.log(`result: ${JSON.stringify(result)}`);
          console.log(`searchPaths: ${JSON.stringify(this.searchPaths)}`);

          const { data: rawData } = await useAsyncData(
            "search-page-data",

            async () => {
              const _data = queryContent()
                .only(["title", "date", "category", "_path"])
                .find();

              return _data;
            },
          );

          let data = rawData.value || [];

          data = data.filter((blog) => blog.category !== "meta");

          data = data.filter((blog) => {
            const _path = useTrimmedPath(blog._path).path;
            return this.searchPaths.includes(_path);
          });

          console.log(`data: ${JSON.stringify(data)}`);
          this.blogs = data;
          console.log(`blogs: ${JSON.stringify(this.blogs)}`);
          const _years = this.blogs.map((blog) => new Date(blog.date).getFullYear());
          this.years = [...new Set(_years)].sort().reverse();
          console.log(`years: ${JSON.stringify(this.years)}`);
        });
      // .catch((err) => {
      //   console.error(err);
      // });
    },
    focus() {
      this.$refs.textBar.focus();
    },
  },
};

</script>

<style lang="sass" scoped>
@use "~/styles/colors"
@use "~/styles/typography"
@use "@/styles/mixins"

.site-search-background
  position: fixed
  top: 0
  left: 0
  width: 100svw
  height: 100svh
  background: rgba(colors.color(background), 0.9)
  backdrop-filter: blur(10px)
  z-index: 9
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center

  overflow-y: scroll

  &.hidden
    display: none !important

  .site-search
    width: min(100%, 75ch)
    height: 100%
    @include mixins.line-split

    &::-webkit-scrollbar
      width: 0px
      background: transparent !important

  .site-search-input
    width: 100%
    height: 40px
    background: inherit
    font-size: 20px
    justify-self: center
    align-self: center
    padding-right: 50px
    color: colors.color(foreground)
    font-family: typography.font("sans-serif")
    padding: 0 // 15px
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.2)
    text-transform: lowercase
    transition: all 0.3s ease-in-out

    border-bottom: 1px solid colors.color(light-background)
    margin: -7px 0 1em 0

    &:is(:hover, :focus, :active)
      color: colors.color(lightest-foreground)

    // prevent zooming
    font-size: 16px
    -moz-text-size-adjust: none
    -webkit-text-size-adjust: none
    -ms-text-size-adjust: none

    &::placeholder
      font-size: typography.font-size("m")
      color: colors.color(dark-foreground)
      opacity: 0.6

  .search-results
    width: 100%
    display: flex
    flex-direction: column

    @media screen only and (max-width: 800px)
      font-size: typography.font-size("xxs") !important

      .highlight-inner
        font-size: typography.font-size("xxs") !important

    &.hidden
      display: none

    .search-results-container
      @include mixins.line-split

.blog-list-container
  width: 100%
  line-height: 3
  font-size: typography.font-size(m)
  color: colors.color(lightest-foreground)
  align-self: flex-start

  @media (max-width: 640px)
    font-size: typography.font-size(xs)

  *
    transition: all 50ms ease-in-out

  &:hover
    color: colors.color(foreground)

  .blog-list-title
    font-size: 1rem
    font-weight: 500
    color: colors.color(lightest-foreground)

  .blog-list-year
    @include mixins.split
    border-top: 1px solid colors.color(light-background)
    padding-top: 1em
    gap: 1em

    .blog-list-year-title
      width: 15%
      color: colors.color(foreground)
      font-weight: 400
      line-height: 2

    .blog-list
      width: 85%
</style>
