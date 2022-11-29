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
import { useState, useEffect } from '~/src/stateful';

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
  @apply mixins.flex-between
  position: relative
  width: 100%
  color: colors.color("lightest-slate")
  font-family: typography.font("font-mono")
  counter-reset: item 0
  z-index: 12
  float: right
  display: flex
  justify-content: flex-end

</style>
