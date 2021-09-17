<template>
  <router-link
    :to="{
      name,
    }"
  >
    <div
      class="tw-flex tw-items-center tw-px-4 tw-py-2 tw-cursor-pointer tw-text-base tw-font-medium tw-capitalize hover:tw-bg-gray-200 tw-text-gray-700"
      :class="{
        'tw-border-l-4': active,
        'tw-border-blue-500': active,
        'tw-text-blue-500': active,
        'tw-bg-blue-100': active,
      }"
    >
      <slot />
    </div>
  </router-link>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SingleMenu',
  props: {
    active: {
      type: Boolean,
      required: false,
      default: false,
    },
    name: {
      type: String,
      required: false,
      default: '',
    },
  },
  setup: () => {
    return { }
  }
})
</script>
