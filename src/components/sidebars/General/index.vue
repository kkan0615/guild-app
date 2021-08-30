<template>
  <div
    v-if="isOpenSidebar"
    class="
    md:tw-h-full
    md:tw-w-52 bg-light
    md:tw-flex
    md:tw-flex-col
    md:tw-p-2
    md:tw-border-r
    md:tw-border-gray-200
    md:tw-relative
    tw-z-10
    tw-absolute
    tw-h-screen
    tw-overflow-auto
    tw-w-1/2
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
      <side-bar-label>
        Menu
      </side-bar-label>
      <single-menu>
        non active
      </single-menu>
      <single-menu
        active
      >
        active
      </single-menu>
      <!--  users  -->
      <single-menu>
        <sing-menu-icon>
          people
        </sing-menu-icon>
        User list
      </single-menu>
      <!--  calendar  -->
      <single-menu>
        <sing-menu-icon>
          today
        </sing-menu-icon>
        Calendar
      </single-menu>
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
    class="md:tw-hidden tw-w-1/2 tw-absolute tw-left-1/2 tw-z-10 tw-h-full tw-opacity-50 tw-bg-gray-700"
    @click="onClickOutside"
  />
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import SingleMenu from '@/components/menus/Single/inedx.vue'
import SideBarLabel from '@/components/labels/Sidebar/index.vue'
import { useRouter } from 'vue-router'
import useGuildInfoMixin from '@/mixins/useGuildInfoMixin'
import { RouterNameEnum } from '@/types/systems/routers/keys'
import SingMenuIcon from '@/components/menus/Single/components/Icon.vue'
import useStore from '@/store'
import { GuildActionTypes } from '@/store/modules/guilds/info/actions'

export default defineComponent({
  name: 'GeneralSideBar',
  components: { SingMenuIcon, SideBarLabel, SingleMenu },
  setup: () => {
    const store = useStore()
    const router = useRouter()
    const { guildInfo } = useGuildInfoMixin()

    const logoSrc = computed(() => guildInfo.value.logoImg)
    const isOpenSidebar = computed(() => store.state.guild.isOpenSideBar)

    const onClickLogo = async () =>{
      await router.push({ name: RouterNameEnum.GUILD_HOME, params: { guildId: guildInfo.value.uid } })
    }

    const onClickToAdminMenu = async () =>{
      await router.push({ name: RouterNameEnum.GUILD_ADMIN_LAYOUT })
    }

    const onClickOutside = async () => {
      await store.dispatch(GuildActionTypes.CLOSE_SIDEBAR)
    }

    return {
      logoSrc,
      isOpenSidebar,
      onClickLogo,
      onClickToAdminMenu,
      onClickOutside,
    }
  }
})
</script>
