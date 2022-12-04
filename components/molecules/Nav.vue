  <template>
  <nav>
    <TransitionGroup :component="null">
      <Transition
        :if="isMounted"
        :class="fadeDownClass"
        :timeout="timeout"
      >
        <div class="nav-inner">
          <Logo class="logo"/>
        </div>
      </Transition>
    </TransitionGroup>
    <NavLinks />
    <Menu class="menu"/>
  </nav>
</template>

<script lang="ts" setup>
import { loaderDelay } from '~/src/utils';
import { useState } from '~/src/stateful';

const [isMounted, setMounted] = useState(false); 

onMounted(() => {
  console.log("Mounted!");
  setTimeout(() => {
    setMounted(true);
  }, loaderDelay);
});

const { path } = useRoute();
const isHome = () => path === "/";

const timeout = isHome ? loaderDelay : 0;
const fadeDownClass = isHome ? 'fadedown' : '';
</script>

<script lang="ts">
  export default {
    name: "Nav",
  }
</script>

<style lang="sass">

@use "~/styles/colors"
@use "~/styles/typography"
@use "~/styles/geometry"
@use "~/styles/mixins"


nav
  @include mixins.flex-between
  position: relative
  width: 100%
  max-width: 1600px
  color: colors.color("lightest-slate")
  font-family: typography.font("font-mono")
  counter-reset: item 0
  z-index: 12
  float: right
  margin: 0 auto
  overflow: none



.menu-button, .nav-inner
  width: auto
  height: auto
  color: colors.color("green")


.logo
  svg
    width: 50px
    height: 50px


// .menu
//   position: absolute
//   top: 0px
//   right: 0px    
//   height: 100%

//   // center vertically
//   transform: translateY(-25%)
//   -webkit-transform: translateY(-25%)
//   margin-right: 10px
//   margin-left: 100px

</style>
