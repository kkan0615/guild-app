<template>
  <span
    class="material-icons tw-mr-2 tw-text-base"
  >
    <slot />
  </span>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'

export default defineComponent({
  name: 'SingMenuIcon',
  setup: () => {
    return {

    }
  }
})
</script>
