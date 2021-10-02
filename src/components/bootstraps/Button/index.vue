<template>
  <button
    :type="type"
    class="tw-flex tw-flex-wrap tw-items-center btn"
  >
    <slot />
  </button>
</template>
<script
    lang="ts"
>
export default {
  name: 'CBButton',
}
</script>
<script setup lang="ts">
import { defineProps, ref } from 'vue'

const props = defineProps({
  type: {
    type: String,
    required: false,
    default: 'button'
  }
})
</script>
