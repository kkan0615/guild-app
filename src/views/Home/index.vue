<template>
  <div
    v-for="i in 100"
    :key="i"
  >
    Home is here! -{{ i }}
    <button
      type="button"
      class="btn btn-primary"
    >
      Primary
    </button>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'
export default defineComponent({
  name: 'Home',
  setup: () => {
    const count = ref(0)
    return { count }
  }
})
</script>
