<template>
  <div
    class="mb-2 tw-flex tw-items-center tw-w-full"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'

export default defineComponent({
  name: 'CHorizontalView',
  setup: () => {
    const message = ref('Hello world prototype')
    return {
      message
    }
  }
})
</script>
