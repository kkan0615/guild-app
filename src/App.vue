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
<style lang="scss">
#app {
  font-family: var(--bs-body-font-family);
  font-size: var(--bs-body-font-size);
  font-weight: var(--bs-body-font-weight);
  line-height: var(--bs-body-line-height);
  color: var(--bs-body-color);
  text-align: var(--bs-body-text-align);
  background-color: var(--bs-body-bg);
  -webkit-text-size-adjust: 100%;
  -webkit-tap-highlight-color: transparent;
}
</style>
