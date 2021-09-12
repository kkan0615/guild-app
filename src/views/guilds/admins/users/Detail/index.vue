<template>
  <div>
    {{ message }}
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'

export default defineComponent({
  name: 'DetailUserGuildAdmin',
  setup: () => {
    const message = ref('Hello world DetailUserGuildAdmin')
    return {
      message
    }
  }
})
</script>
