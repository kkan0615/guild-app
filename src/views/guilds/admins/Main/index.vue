<template>
  <div>
    {{ message }}
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'

export default defineComponent({
  name: 'MainGuildInfoGuildAdmin',
  setup: () => {
    const message = ref('Hello world Admin main!')
    return {
      message
    }
  }
})
</script>
