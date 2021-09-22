<template>
  <div
    class="tw-h-full"
  >
    <general-side-bar />
    <div
      class="tw-h-full tw-flex tw-flex-col"
      :class="{
        'md:tw-pl-64': isOpenSideBar,
      }"
    >
      <general-navbar
        class="tw-flex-grow-0 tw-flex-shrink"
      />
      <!--     content     -->
      <div
        class="tw-flex-grow tw-flex-shrink-0 tw-h-1"
      >
        <router-view />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import GeneralNavbar from '@/components/commons/navbars/General/index.vue'
import GeneralSideBar from '@/components/sidebars/General/index.vue'
import useStore from '@/store'

export default defineComponent({
  name: 'GuildGeneralLayout',
  components: { GeneralSideBar, GeneralNavbar },
  setup: () => {
    const store = useStore()

    const isOpenSideBar = computed(() => store.state.guild.isOpenSideBar)

    return {
      isOpenSideBar,
    }
  }
})
</script>
