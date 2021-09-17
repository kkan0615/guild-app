<template>
  <div
    class="tw-px-1 tw-text-xs tw-font-semibold tw-text-gray-500"
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
