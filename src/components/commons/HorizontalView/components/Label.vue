<template>
  <div
    class="md:tw-w-2/12 tw-w-3/12 tw-text-sm tw-font-semibold"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CHorizontalViewLabel',
  setup: () => {
    return {
    }
  }
})
</script>
