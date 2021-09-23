<template>
  <ul
    class="tw-flex tw-flex-col tw-space-y-1"
  >
    <guild-admin-role-layout-calendar-list-item
      v-for="calendar in calendars"
      :key="calendar.id"
      :calendar="calendar"
      :active="calendar.id === selectedCalendar.id"
    />
  </ul>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from 'vue'
import useStore from '@/store'
import { GuildCalendar } from '@/types/model/guilds/calendar'
import GuildAdminRoleLayoutCalendarListItem from '@/layouts/views/admins/Calendar/components/CalendarListItem.vue'

export default defineComponent({
  name: 'GuildAdminRoleLayoutCalendarList',
  components: { GuildAdminRoleLayoutCalendarListItem },
  props: {
    calendars: {
      type: Array as PropType<Array<GuildCalendar>>,
      required: false,
      default: () => [],
    },
  },
  setup: () => {
    const store = useStore()

    const selectedCalendar = computed(() => store.state.guildAdminCalendar.selectedCalendar)

    return {
      selectedCalendar,
    }
  }
})
</script>
