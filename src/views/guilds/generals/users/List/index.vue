<template>
  <div>
    {{ message }}
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'

export default defineComponent({
  name: 'GuildUserList',
  setup: () => {
    const message = ref('Hello world GuildUserList')
    return {
      message
    }
  }
})
</script>
