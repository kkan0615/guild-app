<template>
  <div
    class="md:tw-border tw-rounded"
  >
    <slot />
  </div>
</template>
<script
    lang="ts"
>
export default {
  name: 'CCard',
}
</script>
<script setup lang="ts">
import { defineProps } from 'vue'

// const props = defineProps({})
</script>
