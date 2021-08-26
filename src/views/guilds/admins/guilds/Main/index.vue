<template>
  <div>
    {{ message }}
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'

export default defineComponent({
  name: 'MainGuildAdminGuild',
  setup: () => {
    const message = ref('Hello world MainGuildAdminGuild')
    return {
      message
    }
  }
})
</script>
