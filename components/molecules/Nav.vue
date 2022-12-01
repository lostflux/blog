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

const isHome = useRoute().path === "/";

const timeout = isHome ? loaderDelay : 0;
const fadeClass = isHome ? 'fade' : '';
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

*
  margin: 0
  padding: 0


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
  // display: flex
  // justify-content: flex-end

  // debug stuff
  // background-color: colors.color("lightest-navy") 

</style>
