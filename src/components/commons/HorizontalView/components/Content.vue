<template>
  <div
    class="md:tw-w-10/12 md:tw-text-sm tw-w-full"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CHorizontalViewContent',
  setup: () => {
    return {
    }
  }
})
</script>
