<template>
  <div
    id="site-search-background"
    ref="siteSearchBackground"
    :class="{
      'site-search-background': true,
      'hidden': !open
    }"
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

          <!-- <div
            v-if="result2.length > 0"
            class="blog-search-result-container"
          >
            <div
              v-for="blog in result2"
              class="blog-search-result"
            >
              <div class="blog-title">
                <ProseA :to="blog.path">
                  {{ "this is a title" }}
                </ProseA>
                <BlogViews :path="blog.path" />
              </div>
              <ul
                v-for="blog in result2"
                class="blog-sections-list"
              >
                <li
                  v-for="section in blog.sections"
                  :key="section.id"
                  class="blog-section"
                >
                  <ProseA
                    class="blog-section-title"
                    :to="section.id"
                  >
                    {{ section.title }}
                  </ProseA>
                  <div>
                    {{ section.match.join(", ") }}
                  </div>
                </li>
              </ul>
            </div>
          </div> -->

          <div
            v-if="searchTerm.length > 0 && blogs.length > 0"
            class="blog-list-container"
          >
            <ul class="blog-list">
              <BlogListItem
                v-for="blog in blogs"
                :key="blog._path"
                :blog="blog"
              />
            </ul>
          </div>

          <div
            v-else
            class="blog-list-container"
          >
            <ProseP v-if="searchTerm.length == 0">
              Type something...
            </ProseP>
            <ProseP v-else>
              No results found.
            </ProseP>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { withoutTrailingSlash } from "ufo"

// import { defineMiniSearchOptions } from "@nuxt/content/dist/runtime/composables/search";

interface SearchResultSection {
  id: string
  title: string
  match: string[]
}

interface SearchResult {
  path: string
  title?: string
  sections: SearchResultSection[]
}

const searchTerm = ref("")
const result = ref(null)
const textBar = ref<HTMLInputElement>(null)
const blogs = ref([])

const result2 = ref<SearchResult[]>([])

// function to search content
const search2 = async () => {
  await searchContent(searchTerm).then((res) => {
    // result2.value = []

    console.log(`RES: ${JSON.stringify(res.value)}`)

    const acc = new Map<string, SearchResultSection[]>()

    // result2.value.
    res.value.forEach((r: any) => {
      console.log(`MATCH: ${JSON.stringify(r.match)}`)

      const match = Object.keys(r.match)

      console.log(`WORDS: ${JSON.stringify(match)}`)

      const path = r.id.split("#")[0]
      const { id, title } = r

      const searchResultSection: SearchResultSection = { id, title, match }

      if (acc.has(path)) {
        acc.get(path).push(searchResultSection)
      } else {
        acc.set(path, [searchResultSection])
      }

      console.log(`
        PATH: ${path}
        TITLE: ${title}
        ID: ${id}
        MATCH: ${match}
      `)
    })

    console.log(`ACC: ${JSON.stringify(acc)}`)

    // build the final result
    const searchResults: SearchResult[] = []

    acc.forEach((sections, path) => {
      searchResults.push({
        path,
        sections,
      })
    })

    // for (const [path, sections] of acc) {
    //   searchResults.push({
    //     path,
    //     sections,
    //   })
    // }

    result2.value = searchResults

    // concat all the 'match' keys into a single string

    // console.log(`RES: ${JSON.stringify(res.value)}`)
    // result2.value = Array.from(res.value)
    // console.log(`RES: ${JSON.stringify(result2)}`)
  })
}

watch(searchTerm, search2)

const siteSearch = ref<HTMLElement>(null)
const siteSearchBackground = ref<HTMLElement>(null)

defineProps<{
  open: boolean
}>()

// focus on search bar when mounted
onMounted(() => textBar.value.focus())

const searchFun = () => {
  if (!searchTerm.value) {
    result.value = null
    return
  }
  const { search } = useAlgoliaSearch("netlify_e0f5d7d0-9d2a-45ae-8962-6e3af2ec4cf3_main_all")
  search({ query: searchTerm.value })
    .then(async (response) => {
      result.value = response

      const searchData = result.value?.hits?.map((res) => ({
        _path: withoutTrailingSlash(res.url) || "",
        title: res?.title || "",
        description: res?.description || "",
      })) || []

      blogs.value = searchData
    })
}

watch(searchTerm, searchFun)
</script>

<style lang="sass" scoped>
@use "@/styles/colors"
@use "@/styles/typography"
@use "@/styles/mixins"

.blog-search-result-container
  display: flex
  flex-direction: column
  gap: 1em

  *
    line-height: 2

  .blog-search-result
    border: 1px solid colors.color(light-background)
    padding: 1em 0

  .blog-title
    // font-size: 1.5rem
    font-weight: 600
    color: colors.color(lightest-foreground)
    text-transform: capitalize

.site-search-background
  position: fixed
  top: 0
  left: 0
  width: 100vw
  height: 100vh
  overflow-y: scroll

  background: rgba(colors.color(background), 0.9)
  backdrop-filter: blur(10px)
  z-index: 10
  display: flex
  flex-direction: column
  justify-content: flex-start
  align-items: center

  &.hidden
    display: none !important

  .site-search
    width: min(100%, 75ch)
    @include mixins.line-split

    @media screen and (max-width: 1150px)
      padding-top: 5em
      .left
        display: none

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
    padding: 0
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
