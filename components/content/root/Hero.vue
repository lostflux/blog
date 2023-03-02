<template>
  <section id="hero" class="hero">
    <!-- <div class="hero-background rubik-puddles">
      ALT
    </div> -->
    <div class="hero-container">
      <div class="blurb-container">
        <div class="big-title">
          <span class="strike-through">
            Talkers
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
            class="highlight"
            id="action"
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
      <div class="name">
        <!-- <div class="name-inner">
          altair
        </div> -->
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
      </div>
      <div class="down-link">
        <NuxtLink class="down-link-inner" to="/#about">
          <Icon type="down-arrow" />
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
  import { heroFootItems, heroCallOuts } from "~/src/config";
</script>

<script lang="ts">
export default {
  name: "Hero",
  data() {
    return {
      footItemIndex: 0,
      activeCallOutIndex: 0,
      heroColorsDict: {
        "teal": "#16f1d1",
        "purple": "#a374ff",
        "khaki": "#ffd074",
        "white": "#ecf7fa",
        "black": "#282723"
      },
      currentAction: heroCallOuts[0].action,
    }
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
          actionElement.innerText += "?";
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
      });
    },
    getColor(index: number) {
      const i = index % this.heroColors.length;
      return this.heroColors[i];
    },
    tick() {
      setTimeout(() => {
        this.footItemIndex = (this.footItemIndex + 1) % heroFootItems.length;
        this.activeCallOutIndex = this.activeCallOutIndex + 1 % 1000;
        this.changeAction();
        this.tick();
      }, 4000);

    }
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
      ]
    },
    font() {
      const fonts = [
        "cyber",
        // "fredericka",
        // "megrim",
        // "macondo",
        // "rubik-puddles",
        // "DM Mono",
      ]
      return fonts[Math.floor(Math.random() * fonts.length)];
    },
    footItems() {
      const active = [];
      
      for (let i = this.footItemIndex; i < this.footItemIndex + 3; i++) {
        const index = i % heroFootItems.length;
        active.push(index);
      }
      return active;
    }
  },
  mounted() {
    this.changeAction();
    this.tick();
  },
  watch: {
    currentAction() {
      this.$forceUpdate();
    }
  }
}
</script>

<style lang="sass">
@use "~/styles/mixins"
@use "~/styles/colors"
@use "~/styles/typography"
@use "~/styles/geometry"

.hero
  @include mixins.flex-center
  flex-direction: column
  align-items: center
  min-height: calc(100vh - geometry.var("nav-height"))
  padding-top: calc(geometry.var("nav-height"))
  padding: 0 20px
  width: 100%

  .hero-container
    .blurb-container
      width: fit-content

      transition: all 0.5s ease-in-out
      &.inactive
        display: none
      .big-title
        width: fit-content
        font-family: typography.font("big-heading")
        color: colors.color("white")
        font-size: clamp(20px, 10vw, 100px)
        font-weight: 800
        margin: 0
        padding: 0

        & > .strike-through
          // background: yellow
          text-decoration: line-through
          text-decoration-thickness: 2px
          color: colors.color(foreground)

    .pique
      margin: 0px 0 10px 4px

      // color: colors.color("purple")
      font-family: typography.font("sans-serif")
      // text-transform: uppercase

      font-size: clamp(typography.font-size("l"), 3vw, typography.font-size("xl"))
      font-weight: 800
      width: 100%

      @media (max-width: 480px)
        margin: 0 0 20px 2px

    .digression
      font-family: typography.font("sans-serif")
      font-weight: 400
      margin: 0 0 20px 4px

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
    left: 0
    right: 0

    @media(max-height: 1020px)
      position: relative
      padding: 2rem 0
    
    padding: 2rem clamp(0px, 5vw, 5rem)
    min-height: 10%
    height: clamp(130px, 10vh, 150px)
    width: 100%
    display: flex
    justify-content: space-between
    text-align: left

    // background-color: rgba(colors.color(background), 0.4)
    backdrop-filter: blur(10px)


    .name
      font-size: clamp(1.8rem, 1.6vw, 1rem)
      color: colors.color(foreground)
      font-weight: 600
      font-family: typography.font(fredericka)
      justify-content: center
      align-items: center
      display: flex

    .item
      flex: 1
      display: flex
      flex-direction: column
      justify-content: center
      align-items: center
      transition: all 0.5s ease-out

      @media(max-width: 960px)
        display: none

    .single-item
      display: none

      @media(max-width: 960px)
        flex: 1
        display: flex
        flex-direction: column
        justify-content: center
        align-items: left
        display: flex

        .item-title
          font-size: clamp(1.7rem, 1.6vw, 1.5rem)
          margin-bottom: 0.5rem
          color: rgba(colors.color(lightest-foreground), 0.9)
          width: 100%

        .item-subscript
          font-size: clamp(0.8rem, 1.6vw, 1rem)
          color: colors.color(foreground)
          width: 100%
      

    .item-title
      font-weight: 600
      font-size: clamp(0.9rem, 2vw, 1.2rem)
      margin-bottom: 0.5rem
      color: rgba(colors.color(lightest-foreground), 0.9)
      width: 100%

    .item-subscript
      font-size: clamp(0.7rem, 1.6vw, 1rem)
      color: colors.color(foreground)
      width: 100%

    .down-link
      height: 60px
      width: 60px
      display: flex
      align-items: center
      justify-content: center


      .down-link-inner
        width: 100%
        height: 100%
        
        &:is(:hover, :focus, :selected)
          color: colors.color(lightest-foreground)

        svg
          // animate up and down
          animation: up-down 1s ease-in-out infinite alternate



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







  // .hero-h2
  //   // margin: 0px 0 10px 4px

  //   color: colors.color("primary-highlight")
  //   font-family: typography.font("monospace")
  //   text-transform: uppercase

  //   font-size: clamp(typography.font-size("xxs"), 1vw, typography.font-size("m"))
  //   font-weight: 600
  //   width: 100%

  //   @media (max-width: 480px)
  //     margin: 0 0 20px 2px
    
  // h3
  //   margin-top: 10px
  //   color: colors.color("foreground")
  //   line-height: 0.9
  //   padding-top: 0.3em
  //   font-size: clamp(2.5rem, 4vw, 4rem) !important
  
  // p
  //   margin: 20px 0
  //   max-width: 540px
  //   opacity: 1 !important
  
  // .email-link
  //   @include mixins.big-button
  //   text-transform: uppercase !important

  // .reduced
  //   font-size: clamp(30px,6vw, 80px)

  // .rubik
  //   font-family: typography.font("rubik-fade")
  //   font-weight: 400
  //   font-size: clamp(40px, 6vw, 80px)

  // .megrim
  //   font-family: typography.font("megrim")
  //   font-weight: 500
  //   font-size: clamp(40px, 6vw, 80px)

  // .fredericka
  //   font-family: typography.font("fredericka")
  //   font-weight: 500
  //   font-size: clamp(40px, 6vw, 80px)

  // .macondo
  //   font-family: typography.font("macondo")
  //   font-weight: 500
  //   font-size: clamp(40px, 6vw, 80px)

  // .rubik-puddles
  //   font-family: typography.font("rubik-puddles")
    
  //   font-weight: 500

  // .cyber
  //   font-family: typography.font("big-heading")
  //   text-transform: lowercase
  //   font-size: clamp(30px, 2vw, 80px)
  //   // background: yellow
  //   font-weight: 800
  //   font-size: 80px
    
    // make the text transparent with outline 
    // to make it look like it's glowing
    // color: transparent
    // -webkit-text-stroke: 1px colors.color("primary-highlight")
    // text-shadow: 0 0 10px colors.color("primary-highlight")


  .hero-background
    position: fixed
    opacity: 0.1
    max-width: 100%
    width: 100%
    font-size: 50vw
    color: colors.color("critical-foreground")
    mouse-events: none

</style>
