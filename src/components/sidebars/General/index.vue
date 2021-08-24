<template>
  <div
    class="tw-h-full tw-w-52 bg-light tw-flex tw-flex-col"
  >
    <div
      class="tw-cursor-pointer"
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
    <!--  footer   -->
    <div
      class="tw-mt-auto"
    >
      <side-bar-label>
        admin
      </side-bar-label>
      <single-menu>
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

export default defineComponent({
  name: 'GeneralSideBar',
  components: { SideBarLabel, SingleMenu },
  setup: () => {
    const router = useRouter()
    const { guildInfo } = useGuildInfoMixin()

    const onClickLogo = async () =>{
      await router.push({ name: RouterNameEnum.GUILD_HOME, params: { id: guildInfo.value.uid } })
    }
    return {
      onClickLogo
    }
  }
})
</script>
