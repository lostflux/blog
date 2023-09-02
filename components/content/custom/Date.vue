<template>
  <div :class="{ 'date-component': true, 'left': left }">
    {{ formattedDate }}
  </div>
</template>
<script lang="ts">
export default {
  name: "Date",
  props: {
    date: {
      type: String,
      required: true,
    },
    weekday: {
      type: Boolean,
      default: true,
    },
    left: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const date = new Date(props.date);
    return {
      formattedDate: date.toLocaleDateString(),
    };
  },
};
</script>

<style lang="sass" scoped>
@use "@/styles/colors"
@use "@/styles/typography"
.date-component
  font-size: typography.font-size(m)
  font-weight: 500
  color: colors.color(dark-foreground)

</style>
