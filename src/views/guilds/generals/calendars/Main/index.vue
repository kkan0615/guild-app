<template>
  <div
    class="tw-h-full"
  >
    <guild-calendar-calendar />
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'
import GuildCalendarCalendar from '@/views/guilds/generals/calendars/Main/components/Calendar.vue'

export default defineComponent({
  name: 'GuildCalendar',
  components: { GuildCalendarCalendar },
  setup: () => {
    return {
    }
  }
})
</script>
