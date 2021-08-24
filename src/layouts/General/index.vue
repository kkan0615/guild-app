<template>
  <div
    class="tw-h-screen"
  >
    <div
      class="tw-h-full tw-flex"
    >
      <general-side-bar />
      <div
        class="tw-h-full tw-flex-grow"
      >
        <div
          class="tw-h-full tw-flex tw-flex-col tw-overflow-y-scroll"
        >
          <general-navbar
            class="tw-flex-grow-0 tw-flex-shrink-0"
          />
          <!--     content     -->
          <div
            class="tw-h-1 tw-flex-grow tw-flex-shrink"
          >
            <router-view />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'
import Auth from '@/components/commons/menus/Auth/Auth.vue'
import GeneralNavbar from '@/components/commons/navbars/General/index.vue'
import SingleMenu from '@/components/menus/Single/inedx.vue'
import GeneralSideBar from '@/components/sidebars/General/index.vue'

export default defineComponent({
  name: 'GeneralLayout',
  components: { GeneralSideBar, SingleMenu, GeneralNavbar, Auth },
  setup: () => {
    const message = ref('Hello world prototype')
    return { message }
  }
})
</script>
