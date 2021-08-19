<template>
  <div
    class="tw-flex tw-justify-center tw-mb-2"
  >
    <img
      class="tw-rounded-full tw-border tw-border-black tw-w-44 tw-h-44"
      :src="src"
      alt="logo"
    >
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'GuildListItemImage',
  props: {
    src: {
      type: String,
      required: true,
      default: '',
    }
  },
  setup: () => {

  }
})
</script>
