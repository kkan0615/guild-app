<template>
  <li
    class="tw-p-2"
    :class="{
      'tw-border-l-4': active,
      'tw-border-blue-500': active,
      'tw-bg-gray-300': active,
      'tw-cursor-pointer': clickable,
      'hover:tw-bg-gray-200': !disableHover,
    }"
  >
    <slot />
  </li>
</template>
<script
    lang="ts"
>
export default {
  name: 'CListItem',
}
</script>
<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps({
  active: {
    type: Boolean,
    required: false,
    default: false
  },
  clickable: {
    type: Boolean,
    required: false,
    default: false,
  },
  disableHover: {
    type: Boolean,
    required: false,
    default: false
  }
})
</script>
