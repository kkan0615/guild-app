<template>
  <span
    class="user-select-none tw-cursor-auto"
    :class="{
      'material-icons': type === '',
      [`material-icons-${type}`]: type !== '',
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
      default: '',
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
    }
  },
  setup: () => {
    return {
    }
  }
})
</script>
