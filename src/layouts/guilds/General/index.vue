<template>
  <div
    class="tw-h-screen"
  >
    <div
      class="tw-h-full tw-flex"
    >
      <general-side-bar />
      <div
        class="tw-h-full tw-w-full"
      >
        <div
          class="tw-h-full tw-flex tw-flex-col tw-overflow-y-auto"
        >
          <general-navbar
            class="tw-flex-grow-0 tw-flex-shrink"
          />
          <!--     content     -->
          <div
            class="tw-flex-grow tw-flex-shrink-0 tw-p-2"
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
import GeneralNavbar from '@/components/commons/navbars/General/index.vue'
import GeneralSideBar from '@/components/sidebars/General/index.vue'

export default defineComponent({
  name: 'GuildGeneralLayout',
  components: { GeneralSideBar, GeneralNavbar },
  setup: () => {
    const message = ref('Hello world prototype')
    return { message }
  }
})
</script>
