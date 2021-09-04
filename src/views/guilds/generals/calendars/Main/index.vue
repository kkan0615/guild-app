<template>
  <div>
    {{ message }}
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'

export default defineComponent({
  name: 'GuildCalendar',
  setup: () => {
    const message = ref('Hello world GuildCalendar')
    return {
      message
    }
  }
})
</script>
