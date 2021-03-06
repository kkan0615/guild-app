<template>
  <div
    class="tw-p-2 tw-h-full tw-flex tw-flex-col"
  >
    <c-base-header
      class="tw-flex-grow-0 tw-flex-shrink"
      :page-name="$t(`router.${RouterNameEnum.GUILD_POST_MAIN}.title`)"
      :breadcrumbs="breadcrumbs"
      @click:pageName="onClickPageName"
    >
      <template
        #prepend
      >
        <c-material-icon
          class="tw-mr-2 tw-text-xl"
          @click="onClickMenuBtn"
        >
          menu
        </c-material-icon>
      </template>
    </c-base-header>
    <div
      class="tw-flex-grow tw-flex-shrink-0 tw-h-1"
    >
      <div
        class="tw-h-full md:tw-flex md:tw-space-x-3"
      >
        <guild-post-view-sidebar />
        <div
          class="tw-h-full md:tw-w-full md:tw-border md:tw-overflow-auto"
        >
          <router-view
            :key="route.fullPath"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script
    lang="ts"
>
export default {
  name: 'GuildPostLayout',
}
</script>
<script setup lang="ts">
import type { CBBreadcrumb } from '@/components/bootstraps/Breadcrumb/types'
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import CBaseHeader from '@/components/headers/Base/index.vue'
import { useI18n } from 'vue-i18n'
import { RouterNameEnum } from '@/types/systems/routers/keys'
import useStore from '@/store'
import CMaterialIcon from '@/components/commons/icons/Material/index.vue'
import { GuildPostActionTypes } from '@/store/modules/guilds/generals/posts/actions'
import GuildPostViewSidebar from '@/components/sidebars/views/guilds/Post/index.vue'
import { useRoute, useRouter } from 'vue-router'

const store = useStore()
const route = useRoute()
const router = useRouter()
const i18n = useI18n()

/* Breadcrumbs data */
const breadcrumbs = ref<Array<CBBreadcrumb>>([
  {
    name: i18n.t(`router.${RouterNameEnum.GUILD_HOME}.title`),
    routerName: RouterNameEnum.GUILD_HOME,
    active: true,
  },
  {
    name: i18n.t(`router.${RouterNameEnum.GUILD_POST_LAYOUT}.title`),
    routerName: RouterNameEnum.GUILD_POST_MAIN,
    active: false,
  },
])

const isOpenSidebar = computed(() => store.state.guildPost.isOpenSidebar)

onMounted(async () => {
  try {
    await store.dispatch(GuildPostActionTypes.LOAD_BOARDS_WITH_GROUPS)
  } catch (e) {
    console.error(e)
  }
})

onBeforeUnmount(async () => {
  try {
    await store.dispatch(GuildPostActionTypes.RESET_BOARDS_WITH_GROUPS)
  } catch (e) {
    console.error(e)
  }
})

const onClickMenuBtn = async () => {
  try {
    if (isOpenSidebar.value) {
      await store.dispatch(GuildPostActionTypes.CLOSE_SIDE_BAR)
    } else {
      await store.dispatch(GuildPostActionTypes.OPEN_SIDE_BAR)
    }
  } catch (e) {
    console.error(e)
  }
}

const onClickPageName = async () => {
  try {
    await router.push({ name: RouterNameEnum.GUILD_POST_MAIN })
  } catch (e) {
    console.error(e)
  }
}

</script>
