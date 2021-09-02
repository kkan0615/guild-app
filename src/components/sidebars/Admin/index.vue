<template>
  <aside
    v-if="isOpenSidebar"
    class="
    md:tw-w-72
    md:tw-border-r
    md:tw-border-gray-200
    md:tw-relative
    tw-flex
    tw-flex-col
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
        v-for="menu in menus"
        :key="menu.id"
        :title="menu.title"
        :is-active="menu.children && menu.children.some(child => child.name === route.name)"
      >
        <admin-sidebar-menu
          v-for="child in menu.children"
          :key="child.id"
          :name="child.name"
          :is-active="child.name === route.name"
        >
          {{ child.title }}
        </admin-sidebar-menu>
      </admin-sidebar-menu-group>
    </div>
    <div
      class="tw-mt-auto tw-mb-2"
    >
      <admin-sidebar-exit />
    </div>
  </aside>
  <div
    v-if="isOpenSidebar"
    class="md:tw-hidden tw-w-1/2 tw-absolute tw-left-1/2 tw-z-10 tw-h-full tw-opacity-50 tw-bg-gray-700"
    @click="onClickOutside"
  />
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import useStore from '@/store'
import { useRoute } from 'vue-router'
import useGuildInfoMixin from '@/mixins/useGuildInfoMixin'
import AdminSidebarMenuGroup from '@/components/sidebars/Admin/components/MenuGroup.vue'
import AdminSidebarMenu from '@/components/sidebars/Admin/components/Menu.vue'
import AdminSidebarExit from '@/components/sidebars/Admin/components/Exit.vue'
import { GuildAdminAppActionTypes } from '@/store/modules/guilds/admins/App/actions'
import { Menu } from '@/types/systems/routers/menu'
import { RouterNameEnum } from '@/types/systems/routers/keys'
import { v4 } from 'uuid'

export default defineComponent({
  name: 'AdminSidebar',
  components: { AdminSidebarExit, AdminSidebarMenu, AdminSidebarMenuGroup },
  setup: () => {
    const store = useStore()
    const route = useRoute()
    const { guildInfo } = useGuildInfoMixin()

    const logoSrc = computed(() => guildInfo.value.logoImg)
    const isOpenSidebar = computed(() => store.state.guildAdminApp.isOpenSideBar)

    const menus: Array<Menu> = [
      {
        id: v4(),
        title: 'Guild',
        icon: '',
        children: [
          {
            id: v4(),
            title: 'Main',
            name: RouterNameEnum.GUILD_ADMIN_INFORMATION_MAIN,
          },
          {
            id: v4(),
            title: 'Importance',
            name: RouterNameEnum.GUILD_ADMIN_INFORMATION_IMPORTANCE,
          },
          {
            id: v4(),
            title: 'TEST3',
            name: '',
          },
        ]
      },
      {
        id: v4(),
        title: 'User',
        icon: '',
        children: [
          {
            id: v4(),
            title: 'TEST1',
            name: RouterNameEnum.GUILD_ADMIN_MAIN_GUILD,
          },
          {
            id: v4(),
            title: 'TEST2',
            name: '',
          },
          {
            id: v4(),
            title: 'TEST3',
            name: '',
          },
        ]
      }
    ]

    const onClickOutside = async () => {
      await store.dispatch(GuildAdminAppActionTypes.CLOSE_SIDEBAR)
    }

    return {
      isOpenSidebar,
      logoSrc,
      menus,
      route,
      RouterNameEnum,
      onClickOutside,
    }
  }
})
</script>
