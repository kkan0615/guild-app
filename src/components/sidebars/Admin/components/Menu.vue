<template>
  <div
    class="tw-w-full tw-border-t tw-border-b tw-border-gray-700 tw-p-1 tw-select-none"
  >
    <router-link
      class="hover:tw-text-white"
      :class="{
        'tw-text-white': isActive,
        'tw-text-gray-400': !isActive,
      }"
      :to="{ name }"
    >
      <div
        class="tw-text-sm tw-pl-4"
      >
        <slot>
          test
        </slot>
      </div>
    </router-link>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'

export default defineComponent({
  name: 'AdminSidebarMenu',
  props: {
    isActive: {
      type: Boolean,
      required: false,
      default: false,
    },
    name: {
      type: String,
      required: false,
      default: ''
    },
  },
  setup: () => {
    const message = ref('Hello world prototype')
    return {
      message
    }
  }
})
</script>
