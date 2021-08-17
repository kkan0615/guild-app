<template>
  <div
    class="tw-relative"
    :class="{
      [`tw-w-${size}`]: true,
      [`tw-h-${size}`]: true
    }"
  >
    <div class="tw-group tw-w-full tw-h-full tw-rounded-full tw-overflow-hidden tw-shadow-inner tw-text-center tw-bg-purple tw-table tw-cursor-pointer">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'

export default defineComponent({
  name: 'TAvatar',
  props: {
    size: {
      type: [Number, String],
      required: false,
      default: 12
    },
  },
  setup: () => {
    const message = ref('Hello world prototype')
    return { message }
  }
})
</script>
