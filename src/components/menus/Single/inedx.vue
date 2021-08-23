<template>
  <div
    class="tw-flex tw-items-center tw-p-2 tw-cursor-pointer tw-font-semibold hover:tw-bg-gray-200"
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
