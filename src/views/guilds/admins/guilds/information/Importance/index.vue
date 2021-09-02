<template>
  <div>
    {{ message }}
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'

export default defineComponent({
  name: 'ImportanceInformationGuildAdmin',
  setup: () => {
    const message = ref('Welcome to Guild information importance page!')
    return {
      message
    }
  }
})
</script>
