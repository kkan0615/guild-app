<template>
  <div>
    {{ message }}
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'

export default defineComponent({
  name: 'SignUp',
  setup: () => {
    const message = ref('Hello world SIGN_UP')
    return { message }
  }
})
</script>
