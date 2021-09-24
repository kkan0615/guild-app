<template>
  <div
    class="md:tw-w-2/12 tw-w-3/12 tw-text-sm tw-font-semibold"
  >
    <slot />
    <span
      v-if="required"
      class="tw-text-red-500"
    >
      *
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CHorizontalViewLabel',
  props: {
    required: {
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
