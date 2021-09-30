<template>
  <div
    class="tw-px-1 tw-text-cxs tw-font-semibold tw-text-gray-300"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'

export default defineComponent({
  name: 'SideBarLabel',
  setup: () => {
    return {
    }
  }
})
</script>
