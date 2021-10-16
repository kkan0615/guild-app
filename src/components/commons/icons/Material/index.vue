<template>
  <span
    class="user-select-none tw-cursor-auto"
    :class="{
      'material-icons': type === '',
      [`material-icons-${type}`]: type !== '',
      [`tw-text-${size}`]: !!size,
      'tw-mr-2': left,
      'tw-cursor-pointer': clickable,
    }"
  >
    <slot />
  </span>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'CMaterialIcon',
  props:{
    type: {
      type: String as PropType<'outlined' | '' | 'round' | 'sharp' | 'two-tone'>,
      required: false,
      default: 'round',
    },
    clickable: {
      type: Boolean,
      required: false,
      default: false,
    },
    left: {
      type: Boolean,
      required: false,
      default: false,
    },
    size: {
      type: String,
      required: false,
      default: 'base',
    }
  },
  setup: () => {
    return {
    }
  }
})
</script>
