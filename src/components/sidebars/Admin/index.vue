<template>
  <aside
    class="
    md:tw-w-72
    md:tw-flex
    md:tw-flex-col
    md:tw-border-r
    md:tw-border-gray-200
    md:tw-relative
    tw-z-10
    tw-absolute
    tw-h-screen
    tw-overflow-auto
    tw-w-1/2
    tw-bg-gray-700
    tw-text-white
"
    :class="{
      'tw-hidden': !isOpenSidebar,
    }"
  >
    <div>
      <div
        class="tw-mb-2"
      >
        <img
          alt="logo"
          src="@/assets/logo.png"
        >
      </div>
      <admin-sidebar-menu-group
        v-model:open="test"
      >
        <admin-sidebar-menu
          v-for="i in 3"
          :key="i"
        >
          menu - {{ i }}
        </admin-sidebar-menu>
      </admin-sidebar-menu-group>
    </div>
  </aside>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
import useStore from '@/store'
import { useRouter } from 'vue-router'
import useGuildInfoMixin from '@/mixins/useGuildInfoMixin'
import AdminSidebarMenuGroup from '@/components/sidebars/Admin/components/MenuGroup.vue'
import AdminSidebarMenu from '@/components/sidebars/Admin/components/Menu.vue'

export default defineComponent({
  name: 'AdminSidebar',
  components: { AdminSidebarMenu, AdminSidebarMenuGroup },
  setup: () => {
    const store = useStore()
    const router = useRouter()
    const { guildInfo } = useGuildInfoMixin()

    const test = ref(false)

    const logoSrc = computed(() => guildInfo.value.logoImg)
    const isOpenSidebar = computed(() => store.state.guildAdminApp.isOpenSideBar)

    return {
      isOpenSidebar,
      logoSrc,
      test
    }
  }
})
</script>
