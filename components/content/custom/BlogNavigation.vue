<template>
  <div
    v-if="toc && toc.links"
    class="navigation"
  >
    <span class="title"> Navigation </span>

    <!-- {{ expandedCategories }} -->
    <!-- <ContentNavigation
      :query="blogContent"
    /> -->
    <ContentNavigation
      v-slot="{ navigation }"
    >
      <!-- {{  navigation }} -->
      <ul v-if="navigation">
        <li
          v-for="directory in navigation[0].children.map((item) => item.children).flat()"
          :key="directory.id"
        >
          <!-- {{ directory }} -->
          <ul v-if="directory.children">
            <template v-for="category in directory.children">
              <li
                v-if="category && category.children"
                :key="category.id"
                :class="{
                  'blog-category': true,
                  'expanded': expandedCategories.has(category.title.toLowerCase()),
                }"
              >
                <button
                  :id="`link-${category._path}`"
                  :href="`${category._path}`"
                  class="category-label"
                  @click.prevent="toggleCategory(category.title)"
                >
                  <span class="category-label-text">
                    {{ category.title }}
                  </span>
                  <Icon
                    :id="`navigation-${category.title?.toLowerCase()}`"
                    class="expand-icon"
                    type="expand"
                  />
                </button>

                <ul class="category-children">
                  <li
                    v-for="child in category.children"
                    :key="child.id"
                    :class="{
                      'category-child': true,
                      'active': path.includes(child._path)
                    }"
                  >
                    <a
                      :id="`link-${child._path}`"
                      :href="`${child._path}`"
                    >
                      {{ child.title }}
                    </a>
                  </li>
                </ul>
              </li>
            </template>
          </ul>
        </li>
      </ul>
    </ContentNavigation>
  </div>
</template>

<script lang="ts">
export default {
  name: "BlogNavigation",
  props: {
    activeTocItem: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      refreshKey: 0,
      expandedCategories: new Set<string>(),
    };
  },
  watch: {
    expandedCategories() {
      this.$forceUpdate();
    },
  },
  async mounted() {
    let { path: currentPath } = useRoute();

    // trim trailing slash if any
    currentPath = currentPath.replace(/\/$/, "");

    await queryContent("/blog")
      .where({ _path: { $eq: currentPath } })
      .findOne().then((page) => {
        page?.category?.forEach((category) => {
          this.toggleCategory(category);
        });
      });
  },
  methods: {
    toggleCategory(category) {
      const _category = category.toLowerCase();
      const element = document.getElementById(`navigation-${_category}`);
      if (this.expandedCategories.has(_category)) {
        this.expandedCategories.delete(_category);
        element?.classList.remove("expanded");
      } else {
        this.expandedCategories.add(_category);
        element?.classList.add("expanded");
      }
    },
  },
};
</script>

<script lang="ts" setup>
const { toc } = useContent();
const { path } = useRoute();

</script>

<style lang="sass">
@use "../styles/typography"
@use "../styles/colors"

// .list-item
//   margin: 0 !important
.navigation
  line-height: 2
  counter-reset: toc-0

  .title
    font-size: typography.font-size("xl")
    color: colors.color("primary-highlight")
    font-weight: 700
    line-height: 2
    width: 100%

  .blog-category
    font-size: typography.font-size("m")
    font-weight: 700
    position: relative
    margin: 0
    // color:  colors.color("dark-foreground")
    height: fit-content
    transition: height 5.2s ease-in-out

    & > ul
      display: block
      height: 100%
      transition-delay: 0.2s

    &:not(.expanded) > ul
      display: none
      height: 0%

    &.active
      color: colors.color("primary-highlight")

    .category-label
      height: fit-content
      display: inline-flex
      width: 100%
      // background: yellow

      .category-label-text
        vertical-align: bottom
        line-height: 1
        vertical-align: middle
        text-transform: uppercase
        width: fit-content
        padding-top: 0.5em

      .expand-icon
        position: absolute
        right: 0
        // height: 1.2em
        // margin-top: 0.2em

    .category-child
      font-size: typography.font-size("xs")
      font-weight: 400
      margin-left: 0.6rem
      padding-left: 1rem
      border-left: 3px solid

      &:hover > *
        transform: scale(1.02)

      &.active
        color: colors.color("primary-highlight")
        font-weight: 600

</style>
