<template>
  <div>
    {{ message }}
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'

export default defineComponent({
  name: 'Prototype',
  setup: () => {
    const message = ref('Hello world prototype')
    return { message }
  }
})
</script>
