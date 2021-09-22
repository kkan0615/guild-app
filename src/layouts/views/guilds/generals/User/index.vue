<template>
  <div
    class="tw-p-4 tw-h-full"
  >
    <router-view />
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'

export default defineComponent({
  name: 'GuildUserListLayout',
  setup: () => {
    const message = ref('Hello world prototype')
    return {
      message
    }
  }
})
</script>
