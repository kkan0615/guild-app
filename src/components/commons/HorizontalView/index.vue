<template>
  <div
    class="mb-2 md:tw-flex md:tw-items-center md:tw-w-full"
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
