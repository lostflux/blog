import VueResizeObserver from "vue-resize-observer";
// import { createApp } from "vue";

// const app = createApp({});
// app.use(VueResizeObserver);

// nuxtApp.vueApp.use(VueResizeObserver);

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueResizeObserver);
  nuxtApp.vueApp.directive("resizetrack", {
    mounted(el, binding) {
      el.id = binding.value;
    }
  });
});
