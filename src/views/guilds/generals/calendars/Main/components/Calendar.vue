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
import { computed, defineProps, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import { v4 } from 'uuid'
import useStore from '@/store'
import { GuildCalendarActionTypes } from '@/store/modules/guilds/generals/calendars/actions'
import TuiCalendar, { IEventScheduleObject, ISchedule } from 'tui-calendar'

const props = defineProps({
  id: {
    type: String,
    required: false,
    default: v4()
  },
  schedules: {
    type: Array,
    required: false,
    default: () => [] as Array<ISchedule>,
  }
})

// const emits = defineEmits(['beforeCreateSchedule'])

const store = useStore()

const tuiCalendar = computed(() => store.state.guildCalendar.tuiCalendar)
const prevClickedCell = computed(() => store.state.guildCalendar.prevClickedCellAtTuiCalendar)
const test1 = ref<TuiCalendar | null>(null)

onMounted(async () => {
  try {
    // await store.dispatch(GuildCalendarActionTypes.SET_TUI_CALENDAR, new TuiCalendar('#test-calendar', {
    //   defaultView: 'month',
    //   taskView: true,
    //   useCreationPopup: false,
    //   useDetailPopup: false,
    //   // month: {
    //   //   daynames: ['일', '월', '화', '수', '목', '금', '토'], // @TODO: 변경하기
    //   // },
    //   // week: {
    //   //   daynames: ['일', '월', '화', '수', '목', '금', '토'],
    //   // },
    //
    // }))
    test1.value = new TuiCalendar('#test-calendar', {
      defaultView: 'month',
      taskView: true,
      useCreationPopup: false,
      useDetailPopup: false,
      // month: {
      //   daynames: ['일', '월', '화', '수', '목', '금', '토'], // @TODO: 변경하기
      // },
      // week: {
      //   daynames: ['일', '월', '화', '수', '목', '금', '토'],
      // },

    })
    await nextTick(() => {
      if (test1.value) {
        // tuiCalendar.value?.on('beforeCreateSchedule', (event: any) => {
        //   console.log('test1', event)
        // })
        console.log(test1.value)
        test1.value?.on({
          'clickSchedule': function (e) {
            console.log('clickSchedule', e)
          },
          'beforeCreateSchedule': function (e) {
            console.log('beforeCreateSchedule', e)
            // open a creation popup
          },
          'beforeUpdateSchedule': function (e) {
            console.log('beforeUpdateSchedule', e)
            e.schedule.start = e.start
            e.schedule.end = e.end
          },
          'beforeDeleteSchedule': function (e) {
            console.log('beforeDeleteSchedule', e)
          }
        })
        // tuiCalendar.value.on('beforeCreateSchedule', () => {
        //   console.log('pass?')
        // })
        // tuiCalendar.value.on('beforeUpdateSchedule', beforeUpdateSchedule)
        // tuiCalendar.value.on('clickSchedule', onClickSchedule)
        // tuiCalendar.value.on('clickDayname', onClickDayname)
      }
    })
  } catch (e) {
    console.error(e)
  }
})

onBeforeUnmount(async () => {
  if (test1.value) {
    test1.value.destroy()
    await store.dispatch(GuildCalendarActionTypes.RESET_TUI_CALENDAR)
  }
})

const beforeCreateSchedule = async (e: any) => {
  try {
    if (prevClickedCell.value) {
      prevClickedCell.value.guide.clearGuideElement()
    }
    console.log('pass?')
    await store.dispatch(GuildCalendarActionTypes.SET_PREV_CLICKED_CELL_AT_TUI_CALENDAR, e)
    await store.dispatch(GuildCalendarActionTypes.BEFORE_CREATE_SCHEDULE_AT_TUI_CALENDAR, e)
  } catch (e) {
    console.error(e)
  }
}

const beforeUpdateSchedule  = async (e: IEventScheduleObject) => {
  try {
    await store.dispatch(GuildCalendarActionTypes.BEFORE_UPDATE_SCHEDULE_AT_TUI_CALENDAR, e)
  } catch (e) {
    console.error(e)
  }
}

const onClickSchedule  = async (e: IEventScheduleObject) => {
  try {
    await store.dispatch(GuildCalendarActionTypes.ON_CLICK_SCHEDULE_AT_TUI_CALENDAR, e)
  } catch (e) {
    console.error(e)
  }
}

const onClickDayname = async (e: IEventScheduleObject) => {
  try {
    await store.dispatch(GuildCalendarActionTypes.ON_CLICK_DAY_NAME_AT_TUI_CALENDAR, e)
  } catch (e) {
    console.error(e)
  }
}

</script>
