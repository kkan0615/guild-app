<template>
  <div
    class="tw-h-screen tw-overflow-y-scroll"
  >
    <div
      class="tw-h-full tw-relative"
    >
      <div
        class="tw-h-full tw-flex tw-flex-col"
      >
        <home-navbar
          class="tw-flex-grow-0 tw-flex-shrink tw-w-full tw-mx-auto standard-max-width"
        />
        <div
          class="tw-flex-grow tw-flex-shrink-0 tw-h-1"
        >
          <div
            class="tw-h-full"
          >
            <div
              class="tw-w-full tw-mx-auto standard-max-width"
            >
              <router-view />
            </div>
            <!--     Bottom       -->
            <div>
              Bottom will be here
            </div>
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
