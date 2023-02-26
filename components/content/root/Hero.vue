<template>
  <section id="hero" class="hero">
    <!-- <div class="hero-background rubik-puddles">
      ALT
    </div> -->
    <div class="hero-content-container">
      <h1 class="hero-h1">
        Hi, my name is
      </h1>

      <h2 class="big-heading" :class="font">
        Altair.
      </h2>

      <h3 class="hero-h3 big-heading reduced">
        I build systems at scale.
      </h3>

      <ContentDoc
        path="profile/hero"
        tag="div"
        class="hero-container"
      />
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
  import { heroFootItems } from "~/src/config";
</script>

<script lang="ts">
export default {
  name: "Hero",
  data() {
    return {
      footItemIndex: 0,
    }
  },
  methods: {
    tick() {
      setTimeout(() => {
        this.footItemIndex = (this.footItemIndex + 1) % heroFootItems.length;
        this.tick();
      }, 4000);

    }
  },
  computed: {
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
    this.tick();
    // let hero = document.getElementById('hero');
    // hero.addEventListener('mousemove', e => {
    //   let rect = hero.getBoundingClientRect();
    //   let x = e.clientX - rect.left;
    //   let y = e.clientY - rect.top;
    //   hero.style.setProperty('--x', x + 'px');
    //   hero.style.setProperty('--y', y + 'px');
    // });
    // this.$forceUpdate();
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

  // position: relative
  // @media(min-width: 1080px)
  //   & > :is(h1), & > * > :is(h1, h2, h3)
  //     opacity: 0.6

  //     &:hover, &:focus
  //       opacity: 1
  // --x: 500
  // --y: 200

  // &::before
  //   content: ''
  //   color: colors.color(secondary-highlight)
  //   // opacity: 0.5
  //   $size: max(20vh, 10vw)
    
  //   position: absolute
  //   left: var(--x)
  //   top: var(--y)
  //   width: $size
  //   height: $size
  //   transform: translate(-50%, -50%)
  //   transition: all 0.5s ease-out
  //   background: radial-gradient(circle closest-side, rgba(colors.color("primary-highlight"), 0.4), transparent)
    

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



    

  .hero-content-container
    width: auto


  .hero-h1
    margin: 0px 0 10px 4px

    color: colors.color("primary-highlight")
    font-family: typography.font("monospace")
    text-transform: uppercase

    font-size: clamp(typography.font-size("xxs"), 1vw, typography.font-size("m"))
    font-weight: 600
    width: 100%

    @media (max-width: 480px)
      margin: 0 0 20px 2px
    
  h3
    margin-top: 10px
    color: colors.color("foreground")
    line-height: 0.9
    padding-top: 0.3em
    font-size: clamp(2.5rem, 4vw, 4rem) !important
  
  p
    margin: 20px 0
    max-width: 540px
    opacity: 1 !important
  
  .email-link
    @include mixins.big-button
    text-transform: uppercase !important

  .reduced
    font-size: clamp(30px,6vw, 80px)

  .rubik
    font-family: typography.font("rubik-fade")
    font-weight: 400
    font-size: clamp(40px, 6vw, 80px)

  .megrim
    font-family: typography.font("megrim")
    font-weight: 500
    font-size: clamp(40px, 6vw, 80px)

  .fredericka
    font-family: typography.font("fredericka")
    font-weight: 500
    font-size: clamp(40px, 6vw, 80px)

  .macondo
    font-family: typography.font("macondo")
    font-weight: 500
    font-size: clamp(40px, 6vw, 80px)

  .rubik-puddles
    font-family: typography.font("rubik-puddles")
    
    font-weight: 500

  .cyber
    font-family: typography.font("twitch")
    text-transform: uppercase
    font-weight: 600
    // font-size: clamp(40px, 6vw, 80px)

  .hero-background
    position: fixed
    opacity: 0.1
    max-width: 100%
    width: 100%
    font-size: 50vw
    color: colors.color("critical-foreground")
    mouse-events: none

</style>
