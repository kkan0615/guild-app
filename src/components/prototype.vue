<template>
  <div>
    {{ message }}
  </div>
</template>

<script setup lang="ts">
import { ref, defineComponent } from 'vue'
export default defineComponent({
  setup: () => {
    const message = ref('Hello world prototype')
    return { message }
  }
})
</script>
