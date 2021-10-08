<template>
  <ul
    class="tw-flex tw-flex-col"
  >
    <slot />
  </ul>
</template>
<script
    lang="ts"
>
export default {
  name: 'CList',
}
</script>
<script setup lang="ts">
import { defineProps } from 'vue'

// const props = defineProps({})
</script>
