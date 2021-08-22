<template>
  <!--  <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />-->
  <div
    id="app"
    class="tw-height-full"
  >
    <div
      id="app-body"
      class="tw-height-full"
    >
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App',
})
</script>
