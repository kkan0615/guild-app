<template>
  <div
    v-if="isOpenSidebar"
    class="
    md:tw-h-full
    md:tw-w-64
    md:tw-p-2
    md:tw-border-r
    md:tw-border-gray-200
    md:tw-fixed
    tw-left-0
    tw-flex
    tw-flex-col
    bg-light
    tw-z-50
    tw-absolute
    tw-h-screen
    tw-overflow-auto
    tw-w-2/3
"
    :class="{
      'tw-hidden': !isOpenSidebar,
    }"
  >
    <img
      :src="logoSrc"
      alt="logo"
      class="tw-cursor-pointer tw-h-16 tw-w-full"
      @click="onClickLogo"
    >
    <!--  content  -->
    <div
      class="tw-mt-4"
    >
      <side-bar-label
        class="tw-mb-1"
      >
        MENU
      </side-bar-label>
      <ul>
        <li
          v-for="menu in menus"
          :key="menu.id"
        >
          <single-menu
            :active="menu.name === currentRouteName"
            :name="menu.name"
          >
            <sing-menu-icon>
              {{ menu.icon }}
            </sing-menu-icon>
            {{ menu.title }}
          </single-menu>
        </li>
        <!--  Post  -->
        <single-menu>
          <sing-menu-icon>
            library_books
          </sing-menu-icon>
          Post
        </single-menu>
        <!--  Survey  -->
        <single-menu>
          <sing-menu-icon>
            list_alt
          </sing-menu-icon>
          survey
        </single-menu>
        <!--  meetings  -->
        <!-- @TODO: Create as Group with offline and online -->
        <single-menu>
          <sing-menu-icon>
            meeting_room
          </sing-menu-icon>
          meeting
        </single-menu>
      </ul>
    </div>
    <!--  footer   -->
    <div
      class="tw-mt-auto"
    >
      <side-bar-label>
        admin
      </side-bar-label>
      <single-menu
        @click="onClickToAdminMenu"
      >
        <span
          class="material-icons tw-mr-2"
        >
          admin_panel_settings
        </span>
        <span>
          To admin
        </span>
      </single-menu>
    </div>
  </div>
  <div
    v-if="isOpenSidebar"
    class="md:tw-hidden tw-w-1/3 tw-absolute tw-right-0 tw-z-50 tw-h-full tw-opacity-50 tw-bg-gray-700"
    @click="onClickOutside"
  />
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import SingleMenu from '@/components/menus/Single/inedx.vue'
import SideBarLabel from '@/components/labels/Sidebar/index.vue'
import { useRoute, useRouter } from 'vue-router'
import useGuildInfoMixin from '@/mixins/useGuildInfoMixin'
import { RouterNameEnum } from '@/types/systems/routers/keys'
import SingMenuIcon from '@/components/menus/Single/components/Icon.vue'
import useStore from '@/store'
import { GuildActionTypes } from '@/store/modules/guilds/generals/info/actions'
import { Menu } from '@/types/systems/routers/menu'
import { v4 } from 'uuid'

export default defineComponent({
  name: 'GeneralSideBar',
  components: { SingMenuIcon, SideBarLabel, SingleMenu },
  setup: () => {
    const store = useStore()
    const router = useRouter()
    const route = useRoute()
    const { guildInfo } = useGuildInfoMixin()

    const menus: Array<Menu> = [
      {
        id: v4(),
        name: RouterNameEnum.GUILD_USER_LIST,
        icon: 'people',
        index: 0,
        title: 'User list',
      },
      {
        id: v4(),
        name: RouterNameEnum.GUILD_CALENDAR_MAIN,
        icon: 'today',
        index: 1,
        title: 'Calendar'
      },
    ]

    const logoSrc = computed(() => guildInfo.value.logoImg)
    const isOpenSidebar = computed(() => store.state.guild.isOpenSideBar)
    const currentRouteName = computed(() => route.name)

    const onClickLogo = async () =>{
      await router.push({ name: RouterNameEnum.GUILD_HOME, params: { guildId: guildInfo.value.id } })
    }

    const onClickToAdminMenu = async () =>{
      await router.push({ name: RouterNameEnum.GUILD_ADMIN_LAYOUT })
    }

    const onClickOutside = async () => {
      await store.dispatch(GuildActionTypes.CLOSE_SIDEBAR)
    }

    return {
      menus,
      logoSrc,
      isOpenSidebar,
      currentRouteName,
      onClickLogo,
      onClickToAdminMenu,
      onClickOutside,
    }
  }
})
</script>
