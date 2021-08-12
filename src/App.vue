<template>
  <!--  <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />-->
  <div
    id="app"
  >
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App',
})
</script>
