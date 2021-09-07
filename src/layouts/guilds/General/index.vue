<template>
  <div
    class="tw-h-full"
  >
    <general-side-bar />
    <div
      class="md:tw-pl-64 tw-h-full"
    >
      <div
        class="tw-h-full"
      >
        <general-navbar />
        <!--     content     -->
        <div
          class="tw-p-2"
        >
          <router-view />
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
