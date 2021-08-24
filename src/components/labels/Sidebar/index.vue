<template>
  <div
    class="tw-px-2 tw-text-sm tw-font-bold"
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
