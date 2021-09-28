<template>
  <div
    class="tw-h-full md:tw-flex md:tw-space-x-4 md:tw-p-4"
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
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeUnmount, onMounted } from 'vue'
import useStore from '@/store'
import CMaterialIcon from '@/components/commons/icons/Material/index.vue'
import { GuildCalendarActionTypes } from '@/store/modules/guilds/generals/calendars/actions'
import GuildCalendarViewSidebar from '@/components/sidebars/views/GuildCalendar/index.vue'
import dayjs from 'dayjs'
import { useRoute } from 'vue-router'
import { RouterNameEnum } from '@/types/systems/routers/keys'

export default defineComponent({
  name: 'GuildCalendarLayout',
  components: { GuildCalendarViewSidebar, CMaterialIcon },
  setup: () => {
    const store = useStore()
    const route = useRoute()

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
      onClickMenuBtn,
    }
  }
})
</script>
