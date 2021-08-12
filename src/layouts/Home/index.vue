<template>
  <div
    class="tw-h-screen tw-overflow-y-scroll"
  >
    <div
      class="tw-h-full tw-relative tw-mx-auto standard-max-width"
    >
      <div
        class="tw-h-full tw-flex tw-flex-col"
      >
        <home-navbar
          class="tw-flex-grow-0 tw-flex-shrink"
        />
        <div
          class="tw-flex-grow tw-flex-shrink-0 tw-h-1"
        >
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HomeNavbar from '@/components/commons/navbars/Home/index.vue'
export default defineComponent({
  name: 'HomeLayout',
  components: { HomeNavbar },
})
</script>
