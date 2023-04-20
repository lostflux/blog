<template>
  <section id="hero">
    <div class="hero">
      <!-- <div class="hero-background rubik-puddles">
      ALT
    </div> -->
      <div class="hero-container">
        <div class="blurb-container">
          <div class="big-title">
            <span class="strike-through">
              {{ "Talkers" }}
            </span>
            <span>Doers.</span>
          </div>
          <h1
            class="pique"
            :style="{ 'color': getColor(activeCallOutIndex) }"
          >
            sure, let's talk about it.
          </h1>

          <div class="digression">
            <span class="normal"> but first, let's </span>
            <span
              id="action"
              class="highlight"
              :style="{ 'color':getColor(activeCallOutIndex) }"
            >
              {{ currentAction }}
            </span>
          </div>
        </div>

      <!-- <h3 class="hero-h3 big-heading reduced">
        I build systems at scale.
      </h3> -->

      <!-- <ContentDoc
        path="profile/hero"
        tag="div"
        class="hero-container"
      /> -->
      </div>
      <div class="hero-footer">
        <!-- <div class="name">
        <div class="name-inner">
          altair
        </div>
      </div>
      <div class="single-item">
        <div class="item-title">
          {{ heroFootItems[footItemIndex].title }}
        </div>
        <div class="item-subscript">
          {{ heroFootItems[footItemIndex].subscript }}
        </div>
      </div>
      <div
        v-for="index in footItems"
        class="item"
      >
        <div class="item-2">
          <div class="item-title">
            {{ heroFootItems[index].title }}
          </div>
          <div class="item-subscript">
            {{ heroFootItems[index].subscript }}
          </div>
        </div>
      </div> -->
        <div class="down-link">
          <NuxtLink
            class="down-link-inner"
            to="/#about"
          >
            <Icon
              type="down-arrow"
              :style="{ 'color':getColor(activeCallOutIndex) }"
            />
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { heroFootItems, heroCallOuts } from "~/modules/config";
</script>

<script lang="ts">
export default {
  name: "Hero",
  data() {
    return {
      footItemIndex: 0,
      activeCallOutIndex: 0,
      heroColorsDict: {
        teal: "#16f1d1",
        purple: "#a374ff",
        khaki: "#ffd074",
        white: "#ecf7fa",
        black: "#282723",
      },
      currentAction: heroCallOuts[0].action,
      changingAction: null,
    };
  },
  computed: {
    activeCallOut() {
      const index = this.activeCallOutIndex % heroCallOuts.length;
      return heroCallOuts[index];
    },
    heroColors() {
      return [
        this.heroColorsDict.teal,
        this.heroColorsDict.purple,
        this.heroColorsDict.khaki,
      ];
    },
    font() {
      const fonts = [
        "cyber",
        // "fredericka",
        // "megrim",
        // "macondo",
        // "rubik-puddles",
        // "DM Mono",
      ];
      return fonts[Math.floor(Math.random() * fonts.length)];
    },
    footItems() {
      const active = [];

      for (let i = this.footItemIndex; i < this.footItemIndex + 3; i++) {
        const index = i % heroFootItems.length;
        active.push(index);
      }
      return active;
    },
  },
  watch: {
    currentAction() {
      this.$forceUpdate();
    },
  },
  mounted() {
    // this.changeAction();
    this.tick();
  },

  unmounted() {
    clearInterval(this.changingActions);
  },

  methods: {
    changeAction() {
      const curr = this.activeCallOutIndex % heroCallOuts.length;
      const nextAction = heroCallOuts[curr].action;
      const actionElement = document.getElementById("action");

      if (actionElement.innerText.length > nextAction.length) {
        actionElement.innerText = actionElement.innerText.slice(0, nextAction.length);
      } else {
        for (let i = actionElement.innerText.length; i < nextAction.length; i++) {
          actionElement.innerText += String.fromCharCode(Math.floor(Math.random() * 26) + 97);
        }
      }

      // randomize the entire word
      let iterations = 0;
      const shuffle = setInterval(() => {
        if (iterations >= 2 * nextAction.length) {
          clearInterval(shuffle);
        }

        actionElement.innerText = actionElement.innerText
          .split("")
          .map((char, index) => {
            const randomChar = String.fromCharCode(Math.floor(Math.random() * 26) + 97);
            const modIndex = iterations - nextAction.length;
            if (iterations < nextAction.length) {
              return (index <= iterations)
                ? randomChar
                : char;
            } else {
              return (index === modIndex)
                ? nextAction.charAt(index)
                : char;
            }
          }).join("");
        iterations++;
      }, 60);
    },
    getColor(index: number) {
      const i = index % this.heroColors.length;
      return this.heroColors[i];
    },
    tick() {
      this.changingActions = setInterval(() => {
        this.footItemIndex = (this.footItemIndex + 1) % heroFootItems.length;
        this.activeCallOutIndex += 1 % 1000;
        this.changeAction();
      }, 5000);
    },
  },
};
</script>

<style lang="sass">
@use "~/styles/mixins"
@use "~/styles/colors"
@use "~/styles/typography"
@use "~/styles/geometry"

.profile
  background: colors.color("light-background")
  width: 400px
  aspect-ratio: 2/1
  border-radius: geometry.var("border-radius")

#hero

  .hero
    @include mixins.flex-center
    flex-direction: column
    width: 100%
    min-height: 100%
    align-items: center
    position: absolute
    top: 0
    left: 0

  min-height: calc(100vh - 2 *  geometry.var("nav-height"))
  width: 100%
  position: relative

  .hero-container
    .blurb-container
      width: fit-content
      font-family: typography.font("matter")

      &.inactive
        display: none
      .big-title
        width: fit-content
        font-family: typography.font("big-heading")
        color: colors.color("white")
        font-size: clamp(20px, 8vw, 100px)
        // font-size: 120px
        font-weight: 800
        margin: 1rem 0
        padding: 0

        & > .strike-through
          // background: yellow
          text-decoration: line-through
          text-decoration-thickness: 2px
          color: colors.color(dark-foreground)
          padding-right: 0.5em
          margin-right: 0

    .pique
      margin: 1.5em 0 0.5em 0.2rem

      font-size: clamp(typography.font-size("l"), 3vw, typography.font-size("xl"))
      font-weight: 800
      width: 100%
      // animate change of color
      -webkit-transition: all 3s ease-in-out
      -moz-transition: all 3s ease-in-out
      -ms-transition: all 3s ease-in-out
      -o-transition: all 3s ease-in-out
      transition: all 3s ease-in-out

      @media (max-width: 480px)
        margin: 0 0 20px 2px

    .digression
      // font-family: typography.font("sans-serif")
      font-weight: 400
      margin: 0.5rem 0 1.5rem 0.2rem

      &:is(:last-child)::after
        content: '.'
        color: colors.color("white")

      .normal
        color: colors.color("white")

      @media (max-width: 480px)
        margin: 0 0 20px 2px

  .hero-footer
    position: absolute
    bottom: 0
    right: 0
    width: 100%
    align-self: flex-end

    .down-link
      height: 60px
      width: 60px
      display: flex
      align-items: center
      justify-content: center
      position: absolute
      bottom: 0
      right: 0
      margin-right: 10%
      margin-bottom: 10%
      float: right

      .down-link-inner
        width: 100%
        height: 100%

        &:is(:hover, :focus, :selected)
          color: colors.color(lightest-foreground)

        svg
          // animate up and down
          animation: up-down 1s ease-in-out infinite alternate
          margin: auto
          // animate change of color
          -webkit-transition: color 3s ease-in-out
          -moz-transition: color 3s ease-in-out
          -ms-transition: color 3s ease-in-out
          -o-transition: color 3s ease-in-out
          transition: color 3s ease-in-out

          &:is(:hover, :selected, :focus)
            stroke-width: 1px
            cursor: pointer
            transform: scale(1.5)
            transition: all 0.2s ease-out

          @keyframes up-down
            0%
              transform: translateY(0)
            50%
              transform: translateY(-5px)
            100%
              transform: translateY(0)

</style>
