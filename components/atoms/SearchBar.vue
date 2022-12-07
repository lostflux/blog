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
              autocomplete="off"
              autofocus
            >
          </form>
          <div
            v-if="searchTerm.length > 0 && years.length > 0"
            class="blog-list-container"
          >
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

          <div
            v-else
            class="blog-list-container"
          >
            <ProseP v-if="searchTerm.length == 0">
              Empty query.
              <br>
              Please type something to search.
            </ProseP>
            <ProseP v-else>
              No results found.
              <br>
              Please try broadening your search.
            </ProseP>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "SearchBar",

  async setup() {
    const siteSearch = ref<HTMLElement>(null);
    const siteSearchBackground = ref<HTMLElement>(null);
    onClickOutside(siteSearch, () => {
      const btn = document.querySelector(".menu-button");
      btn.classList.remove("clicked");
      siteSearchBackground.value?.classList.add("hidden");
    });

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

    const textBar = ref<HTMLInputElement>(null);

    return { data, textBar };
  },
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
  },
  mounted() {
    // get text bar
    const searchInput = document.querySelector("#searchbar") as HTMLInputElement;
    searchInput.focus();
    searchInput?.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        const btn = document.querySelector(".menu-button");
        btn.classList.remove("clicked");
        this.$refs.siteSearchBackground.classList.add("hidden");
      }
    });
  },

  methods: {
    async search() {
      if (!this.searchTerm) {
        this.result = null;
        return;
      }
      const { search } = useAlgoliaSearch("netlify_e0f5d7d0-9d2a-45ae-8962-6e3af2ec4cf3_main_all");
      search({ query: this.searchTerm })
        .then(async (result) => {
          /**
           * Only show content pages in search results.
           * NOTE on depths:
           * 1: /
           * 2: /writing
           * 3: /writing/{computing, math, misc, etc}
           * 4: /writing/{computing, math, misc, etc}/{post}
          */
          this.result = result;
          this.searchPaths = this.result.hits.map((hit) => useTrimmedPath(hit.url).path);

          const searchData = this.data.filter((blog) => {
            const _path = useTrimmedPath(blog._path).path;
            return this.searchPaths.includes(_path) && blog.category !== "meta";
          });

          this.blogs = searchData;
          const _years = this.blogs
            .map((blog) => new Date(blog.date).getFullYear())
            .filter((year) => year);
          this.years = [...new Set(_years)].sort().reverse();
        });
    },
    focus() {
      this.$refs.textBar.focus();
    },
  },
};

</script>

<style lang="sass" scoped>
@use "@/styles/colors"
@use "@/styles/typography"
@use "@/styles/mixins"

.site-search-background
  position: fixed
  top: 0
  left: 0
  width: 100svw
  height: 100svh
  overflow-y: scroll

  background: rgba(colors.color(background), 0.9)
  backdrop-filter: blur(10px)
  z-index: 9
  display: flex
  flex-direction: column
  justify-content: flex-start
  align-items: center

  &.hidden
    display: none !important

  .site-search
    width: min(100%, 75ch)
    //height: 100%
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
    margin: -7px 0 1.4em 0

    background: rgba(colors.color(lightest-background), 0.1)

    border: 1px solid colors.color(light-background)
    border-radius: 5px
    padding: 15px

    &:is(:hover, :focus, :active)
      color: colors.color(lightest-foreground)
      border: 1px solid colors.color(lightest-background)

    // prevent zooming
    font-size: 16px
    -moz-text-size-adjust: none
    -webkit-text-size-adjust: none
    -ms-text-size-adjust: none

    &::placeholder
      font-size: typography.font-size("m")
      color: colors.color(dark-foreground)
      opacity: 0.6

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
