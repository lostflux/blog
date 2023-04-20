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
    day: {
      type: Boolean,
      default: true,
    },
    month: {
      type: Boolean,
      default: true,
    },
    year: {
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
    const options = {
      weekday: props.weekday ? "long" : undefined,
      year: props.year ? "numeric" : undefined,
      month: props.month ? "short" : undefined,
      day: props.day ? "2-digit" : undefined,
    } as any;

    return {
      formattedDate: date.toLocaleDateString("en-US", options),
    };
  },
};
</script>

<style lang="sass" scoped>
@use "~/styles/colors"
@use "~/styles/typography"
.date-component
  // font-size: 1rem !important
  padding-top: 0.5rem
  font-weight: 400
  font-size: 0.8em
  color: colors.color("secondary-highlight") !important
  font-family: typography.font("sans-serif")
  background: transparent
  // width: fit-content

  border-left: 1px solid
  border-right: none

  padding-left: 1rem
  padding-right: 0

  &.left
    border-left: none
    border-right: 1px solid

    padding-left: 0
    padding-right: 1rem
    justify-self: end

</style>
