<template>
  <div>
    {{ message }}
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'

export default defineComponent({
  name: 'MainInformationGuildAdmin',
  setup: () => {
    const message = ref('Welcome to Guild information main page!')
    return {
      message
    }
  }
})
</script>
