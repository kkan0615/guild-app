<template>
  <div
    class="tw-flex tw-flex-col tw-space-y-3"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BlackListUserGuildAdminList',
  setup: () => {
    return {
    }
  }
})
</script>
