<template>
  <div
    class="tw-h-full tw-w-52 bg-light tw-flex tw-flex-col tw-p-1"
  >
    <div
      class="tw-cursor-pointer tw-h-20"
      @click="onClickLogo"
    >
      Logo will be here
    </div>
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
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SingleMenu from '@/components/menus/Single/inedx.vue'
import SideBarLabel from '@/components/labels/Sidebar/index.vue'
import { useRouter } from 'vue-router'
import useGuildInfoMixin from '@/mixins/useGuildInfoMixin'
import { RouterNameEnum } from '@/types/systems/routers/keys'
import SingMenuIcon from '@/components/menus/Single/components/Icon.vue'

export default defineComponent({
  name: 'GeneralSideBar',
  components: { SingMenuIcon, SideBarLabel, SingleMenu },
  setup: () => {
    const router = useRouter()
    const { guildInfo } = useGuildInfoMixin()

    const onClickLogo = async () =>{
      await router.push({ name: RouterNameEnum.GUILD_HOME, params: { guildId: guildInfo.value.uid } })
    }

    const onClickToAdminMenu = async () =>{
      await router.push({ name: RouterNameEnum.GUILD_ADMIN_LAYOUT })
    }

    return {
      onClickLogo,
      onClickToAdminMenu,
    }
  }
})
</script>
