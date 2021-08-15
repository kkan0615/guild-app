<template>
  <div
    class="tw-h-screen tw-bg-blue-100"
  >
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'AuthLayout',
})
</script>
