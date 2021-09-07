<template>
  <div
    class="tw-h-screen md:tw-p-0 tw-p-4"
  >
    <div
      class="tw-h-full tw-relative"
    >
      <home-navbar
        class="tw-w-full tw-mx-auto standard-max-width"
      />
      <div
        class="tw-h-full tw-flex tw-flex-col"
      >
        <div
          class="tw-w-full tw-mx-auto standard-max-width tw-mb-4"
        >
          <router-view />
        </div>
        <!--     Bottom     tw-h-60  -->
        <div
          class="tw-bg-gray-500 tw-p-2 tw-text-white tw-mt-auto"
        >
          <div
            class="tw-text-right"
          >
            Copyright 2021. Crocom inc. all rights reserved.
          </div>
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
