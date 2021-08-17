<template>
  <div>
    {{ message }}
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'

export default defineComponent({
  name: 'HomeGuildList',
  setup: () => {
    const message = ref('Hello world HomeGuildList')
    return { message }
  }
})
</script>
