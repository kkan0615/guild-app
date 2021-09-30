<template>
  <router-link
    :to="{
      name,
    }"
  >
    <div
      class="tw-flex tw-items-center tw-px-4 tw-py-2 tw-cursor-pointer tw-text-sm tw-font-medium tw-capitalize hover:tw-bg-blue-500 tw-text-gray-300 tw-rounded-md tw-mb-1"
      :class="{
        'tw-rounded-l-none': active,
        'tw-border-l-4': active,
        'tw-border-blue-500': active,
        'tw-text-white': active,
        'tw-bg-blue-600': active,
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
