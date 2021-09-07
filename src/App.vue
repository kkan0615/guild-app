<template>
  <!--  <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />-->
  <div
    id="app"
    class="tw-h-screen"
  >
    <div
      id="app-body"
      class="tw-h-full tw-overflow-auto"
    >
      <router-view />
      <toast-list />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ToastList from '@/components/ToastList/index.vue'

export default defineComponent({
  name: 'App',
  components: { ToastList },
})
</script>
