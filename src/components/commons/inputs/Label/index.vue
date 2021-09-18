<template>
  <label
    class="form-label"
  >
    <slot />
  </label>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CInputLabel',
  setup: () => {
    return {
    }
  }
})
</script>
