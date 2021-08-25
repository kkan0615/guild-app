<template>
  <div
    class="tw-flex tw-items-center tw-px-2 tw-py-2 tw-cursor-pointer tw-font-semibold tw-capitalize tw-text-sm hover:tw-bg-gray-200"
    :class="{
      'tw-border-l-4': active,
      'tw-border-blue-500': active,
      'tw-text-blue-500': active,
    }"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SingleMenu',
  props: {
    active: {
      type: Boolean,
      required: false,
      default: false,
    }
  },
  setup: () => {
    return { }
  }
})
</script>
