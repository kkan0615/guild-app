<template>
  <span
    class="material-icons user-select-none"
  >
    <slot />
  </span>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CMaterialIcon',
  setup: () => {
    return {
    }
  }
})
</script>
