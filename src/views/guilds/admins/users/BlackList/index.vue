<template>
  <div>
    BlackListUserGuildAdmin
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'

export default defineComponent({
  name: 'BlackListUserGuildAdmin',
  setup: () => {
    const message = ref('Hello world prototype')
    return {
      message
    }
  }
})
</script>
