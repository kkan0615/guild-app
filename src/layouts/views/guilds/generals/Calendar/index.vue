<template>
  <div
    class="tw-h-full tw-flex tw-flex-col"
  >
    <c-base-header
      class="tw-flex-grow-0 tw-flex-shrink tw-pt-4 tw-px-4"
      :page-name="$t(`router.${RouterNameEnum.GUILD_CALENDAR_LAYOUT}.title`)"
      :breadcrumbs="breadcrumbs"
    />
    <div
      class="tw-flex-grow tw-flex-shrink-0 tw-h-1 md:tw-flex md:tw-space-x-4 md:tw-p-4 md:tw-pt-0"
    >
      <guild-calendar-view-sidebar />
      <div
        class="tw-h-full tw-w-full md:tw-block md:tw-border md: tw-p-2 tw-rounded-md md:tw-flex md:tw-flex-col"
        :class="{
          'md:tw-w-full': !isOpenSidebar,
          'md:tw-w-10/12': isOpenSidebar,
        }"
      >
        <div
          v-if="isDisplayCalendarHeader"
          class="tw-flex-grow-0 tw-flex-shrink tw-flex tw-mb-2"
        >
          <c-material-icon
            @click="onClickMenuBtn"
          >
            menu
          </c-material-icon>
          <div
            class="tw-mx-auto"
          >
            left
            {{ tuiCalendarDate + 1 }}
            right
          </div>
        </div>
        <div
          class="tw-flex-grow tw-flex-shrink-0 tw-h-1"
        >
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeUnmount, onMounted, ref } from 'vue'
import useStore from '@/store'
import CMaterialIcon from '@/components/commons/icons/Material/index.vue'
import { GuildCalendarActionTypes } from '@/store/modules/guilds/generals/calendars/actions'
import GuildCalendarViewSidebar from '@/components/sidebars/views/GuildCalendar/index.vue'
import dayjs from 'dayjs'
import { useRoute } from 'vue-router'
import { RouterNameEnum } from '@/types/systems/routers/keys'
import CBaseHeader from '@/components/headers/Base/index.vue'
import { useI18n } from 'vue-i18n'
import { CBBreadcrumb } from '@/components/bootstraps/Breadcrumb/types'

export default defineComponent({
  name: 'GuildCalendarLayout',
  components: { CBaseHeader, GuildCalendarViewSidebar, CMaterialIcon },
  setup: () => {
    const store = useStore()
    const route = useRoute()

    const i18n = useI18n()

    /* Breadcrumbs data */
    const breadcrumbs = ref<Array<CBBreadcrumb>>([
      {
        name: i18n.t(`router.${RouterNameEnum.GUILD_HOME}.title`),
        routerName: RouterNameEnum.GUILD_HOME,
        active: true,
      },
      {
        name: i18n.t(`router.${RouterNameEnum.GUILD_CALENDAR_LAYOUT}.title`),
        routerName: RouterNameEnum.GUILD_NOTICE_MAIN,
        active: false,
      },
    ])

    const isOpenLayoutSidebar = computed(() => store.state.guild.isOpenSideBar)
    const isOpenSidebar = computed(() => store.state.guildCalendar.isOpenSidebar)
    const isDisplayCalendarHeader = computed(() => route.name === RouterNameEnum.GUILD_CALENDAR_MAIN)
    const tuiCalendar = computed(() => store.state.guildCalendar.tuiCalendar)
    const tuiCalendarDate = computed(() => store.state.guildCalendar.tuiCalendar ? dayjs(store.state.guildCalendar.tuiCalendar.getDate().toDate()).month() : '')

    onMounted(async () => {
      try {
        await store.dispatch(GuildCalendarActionTypes.LOAD_MY_CALENDAR_LIST)
        await store.dispatch(GuildCalendarActionTypes.LOAD_CALENDAR_CALENDAR_LIST)
        await store.dispatch(GuildCalendarActionTypes.LOAD_OTHER_CALENDAR_LIST)
      } catch (e) {
        console.error(e)
      }
    })

    onBeforeUnmount(async () => {
      try {
        await store.dispatch(GuildCalendarActionTypes.RESET_MY_CALENDAR_LIST)
        await store.dispatch(GuildCalendarActionTypes.RESET_CALENDAR_CALENDAR_LIST)
        await store.dispatch(GuildCalendarActionTypes.RESET_OTHER_CALENDAR_LIST)
      } catch (e) {
        console.error(e)
      }
    })

    const onClickMenuBtn = async () => {
      try {
        if (isOpenSidebar.value) {
          await store.dispatch(GuildCalendarActionTypes.CLOSE_SIDEBAR)
        } else {
          await store.dispatch(GuildCalendarActionTypes.OPEN_SIDEBAR)
        }
      } catch (e) {
        console.error(e)
      }
    }

    return {
      isOpenLayoutSidebar,
      isOpenSidebar,
      isDisplayCalendarHeader,
      tuiCalendarDate,
      breadcrumbs,
      RouterNameEnum,
      onClickMenuBtn,
    }
  }
})
</script>
