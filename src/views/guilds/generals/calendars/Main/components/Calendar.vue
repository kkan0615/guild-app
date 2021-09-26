<template>
  <div
    id="test-calendar"
    class="tw-h-full"
  />
</template>
<script
    lang="ts"
>
export default {
  name: 'GuildCalendarCalendar',
}
</script>
<script setup lang="ts">
import { computed, defineProps, onBeforeMount, onMounted, ref } from 'vue'
import { v4 } from 'uuid'
import useStore from '@/store'
import { GuildCalendarActionTypes } from '@/store/modules/guilds/generals/calendars/actions'
import TuiCalendar from 'tui-calendar'

const props = defineProps({
  id: {
    type: String,
    required: false,
    default: v4()
  }
})

const store = useStore()

const tuiCalendar = computed(() => store.state.guildCalendar.tuiCalendar)

onMounted(async () => {
  try {
    await store.dispatch(GuildCalendarActionTypes.SET_TUI_CALENDAR, new TuiCalendar('#test-calendar', {
      defaultView: 'month',
      taskView: true,
      // month: {
      //   daynames: ['일', '월', '화', '수', '목', '금', '토'], // @TODO: 변경하기
      // },
      // week: {
      //   daynames: ['일', '월', '화', '수', '목', '금', '토'],
      // },
    }))
  } catch (e) {
    console.error(e)
  }
})

onBeforeMount(async () => {
  if (tuiCalendar.value) {
    tuiCalendar.value.destroy()
    await store.dispatch(GuildCalendarActionTypes.RESET_TUI_CALENDAR)
  }
})

</script>
