<template>
  <div
    class="tw-h-full md:tw-flex md:tw-space-x-4 md:tw-p-4"
  >
    <guild-calendar-view-sidebar />
    <div
      class="md:tw-w-10/12 tw-w-full md:tw-block md:tw-border md: tw-p-2 tw-rounded-md"
    >
      <div>
        <c-material-icon
          @click="onClickMenuBtn"
        >
          menu
        </c-material-icon>
      </div>
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeUnmount, onMounted } from 'vue'
import useStore from '@/store'
import CMaterialIcon from '@/components/commons/icons/Material/index.vue'
import { GuildCalendarActionTypes } from '@/store/modules/guilds/calendars/actions'
import GuildCalendarViewSidebar from '@/components/sidebars/views/GuildCalendar/index.vue'

export default defineComponent({
  name: 'GuildCalendarLayout',
  components: { GuildCalendarViewSidebar, CMaterialIcon },
  setup: () => {
    const store = useStore()

    const isOpenLayoutSidebar = computed(() => store.state.guild.isOpenSideBar)
    const isOpenSidebar = computed(() => store.state.guildCalendar.isOpenSidebar)

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
      onClickMenuBtn,
    }
  }
})
</script>
