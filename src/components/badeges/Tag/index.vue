<template>
  <span
    class="badge"
    :class="{
      [colorComputed]: true,
    }"
  >
    <slot />
  </span>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { tailwindDefaultColors } from '@/data/color'

export default defineComponent({
  name: 'TagBadge',
  props: {
    color: {
      type: String,
      required: false,
      default: 'blue',
    }
  },
  setup: (props) => {
    const colorComputed = computed(() => tailwindDefaultColors.includes(props.color) ? `tw-bg-${props.color}-500` : 'tw-bg-blue-500')
    return {
      colorComputed,
    }
  }
})
</script>
