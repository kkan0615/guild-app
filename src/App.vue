<template>
  <!--  <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />-->
  <div
    id="app"
    class="tw-bg-gray-300 "
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
<style
  lang="scss"
>
#app {
}
</style>
