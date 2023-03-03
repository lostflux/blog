<template>
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <div id="root" :class="{home: isHome}">
    <!-- <div ref="blob" id="blob" /> -->
    <!-- <div class="blur"/> -->
    <AppHeader />
    <body> <!-- header in body == not sticky -->
      <main class="home">
        <a class="skip-to-content" href="#content" />
        <!-- <body> -->
          <div class="content" id="content">
            <slot />
          </div>
          <!-- <slot id="content"/> -->
        </main>
        <AppFooter class="default-footer" />
    </body>
  </div>
</template> 

<style lang="sass" scoped>
// @use "~/styles/default"
@use "~/styles/colors"
@use "~/styles/typography"

.content
  font-size: typography.font-size("m")

// #root
//   // background: url("~/assets/images/noise.svg") !important

//   body
//     background-image: url("~/assets/images/noise.svg") !important
//     background: rgba(colors.color("background"), 0.1) !important

#root
  // all: unset
  width: 100vw !important
  // background-color: green

  body.home
    // all: unset
    // width: 100% !important
    margin: 0
    padding: 0

    main.home
      width: 100vw !important
      margin: 0
      padding: 0
      

      .container
        width: 100vw
        margin: 0 auto


// header
//   background-color: rgba(colors.color(background), 0.1) !important

#root
  all: unset
  // background-color: #000000

  z-index: 3

body.home
  // all: unset
  *
    z-index: 3


#blob
  position: fixed
  background-color: white
  height: 40vmin
  aspect-ratio: 1
  border-radius: 50%
  z-index: 1

  // center to mouse
  transform: translate(-50%, -50%)

  // background: linear-gradient(to right, aquamarine, mediumpurple)
  // background teal, purple, khaki
  background: linear-gradient(to right, colors.color("teal"), colors.color("purple"), colors.color("khaki"))
  animation: rotate 5s infinite


@keyframes rotate
  0%
    transform: translate(-50%, -50%) rotate(0deg)

  50%
    scale: 1 1.5
  100%
    transform: translate(-50%, -50%) rotate(360deg)


.blur
  position: fixed
  width: 100%
  height: 100%
  z-index: 2
  backdrop-filter: blur(200px)




</style>

<script lang="ts">

export default {
  name: 'DefaultLayout',

  data() {
    return {
      // blob x, y
      X: 0,
      Y: 0,
      blob: null
    }
  },

  computed: {
    isHome() {
      return useRoute().path === '/'
    }
  },

  watch: {
    X() {
      const blob = document.getElementById('blob');
      blob?.animate({
        left: `${this.X}px`,
        top:  `${this.Y}px`
      }, {
        duration: 1000,
        // easing: 'cubic-bezier(.47,.26,.4,1.58)',
        fill: 'forwards'
      })
    },
    Y() {
      const blob = document.getElementById('blob');
      blob?.animate({
        left: `${this.X}px`,
        top:  `${this.Y}px`
      }, {
        duration: 1000,
        // easing: 'cubic-bezier(.47,.26,.4,1.58)',
        fill: 'forwards'
      })
    }
  },

  // mounted
  mounted() {
    const blob = document.getElementById('blob');
    document.onpointermove = (event) => {
      const { clientX, clientY } = event;
      this.X = clientX;
      this.Y = clientY;
    } 

  }
}
</script>
