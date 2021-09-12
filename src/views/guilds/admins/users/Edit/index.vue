<template>
  <div>
    {{ message }}
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'

export default defineComponent({
  name: 'EditUserGuildAdmin',
  setup: () => {
    const message = ref('Hello world DetailUserGuildAdmin')
    return {
      message
    }
  }
})
</script>
