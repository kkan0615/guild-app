<template>
  <span
    class="user-select-none tw-cursor-auto"
    :class="{
      'material-icons': type === '',
      [`material-icons-${type}`]: type !== '',
      'tw-cursor-pointer': !!click,
      'tw-mr-2': left,
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
    click: {
      type: Function,
      required: false,
      default: () => {},
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
