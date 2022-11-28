<template>
  <div class="styled-side-element">
    <TransitionGroup component="null">
      <Transition
        :if="isMounted"
        :class="className"
        :timeout="timeout"
      >
        { children }
      </Transition>
    </TransitionGroup>
  </div>
</template>

<script lang="ts" setup>
import { useState, useEffect } from '~/src/stateful';
import { loaderDelay } from '~~/src/utils';

const isHome = useRoute().path === "/";
const timeout = isHome ? loaderDelay : 0;
const className = isHome ? 'fade' : '';

const [isMounted, setMounted] = useState(false);

onMounted(() => {
  setTimeout(() => {
    setMounted(true);
  }, loaderDelay);
});

</script>

<script lang="ts">
export default {
  name: "StyledSideElement",
  props: {
    orientation: {
      type: String,
      default: "left"
    },
    children: {
      type: Object,
      required: true
    }
  }
}
</script>
