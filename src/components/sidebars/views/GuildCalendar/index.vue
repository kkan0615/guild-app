<template>
  <div
    v-if="isOpenSidebar"
    class="md:tw-static md:tw-visible md:tw-z-0 md:tw-bg-none md:tw-w-2/12 md:tw-block md:tw-border md:tw-overflow-auto tw-absolute tw-rounded-md tw-h-full tw-w-2/3 tw-z-10 p-2 tw-overflow-y-scroll"
    :class="{
      'tw-invisible':isOpenLayoutSidebar,
      'tw-bg-white': !isOpenLayoutSidebar,
    }"
  >
    <div
      class="tw-text-lg tw-font-bold"
    >
      Calendar
    </div>
    <c-divider
      class="tw-my-2"
    />
    <div
      class="tw-flex tw-flex-col tw-space-y-4"
    >
      <!--  My Calendars  -->
      <div>
        <div
          class="tw-uppercase tw-text-sm"
        >
          My calendars ({{ myCalendarList.length }})
        </div>
        <div
          class="tw-pl-3"
        >
          <div
            v-for="myCalendar in myCalendarList"
            :key="myCalendar.id"
            class="tw-flex tw-items-center"
          >
            <b-checkbox
              :id="`my-calendar-${myCalendar.id}-display`"
              v-model="myCalendar.isDisplay"
              :label="myCalendar.name"
              :color="myCalendar.color"
              class="tw-mr-1"
            />
          </div>
        </div>
      </div>
      <!--  Guild Calendars  -->
      <div>
        <div
          class="tw-uppercase tw-text-sm tw-mb-1"
        >
          Guild Calendars ({{ guildCalendarList.length }})
        </div>
        <div
          class="tw-pl-3"
        >
          <div
            v-for="guildCalendar in guildCalendarList"
            :key="guildCalendar.id"
            class="tw-flex tw-items-center"
          >
            <b-checkbox
              :id="`my-calendar-${guildCalendar.id}-display`"
              v-model="guildCalendar.isDisplay"
              :label="guildCalendar.name"
              :color="guildCalendar.color"
              class="tw-mr-1"
            />
          </div>
        </div>
      </div>
      <!--  other calendars  -->
      <div>
        <div
          class="tw-uppercase tw-text-sm"
        >
          Other Calendars ({{ otherCalendarList.length }})
        </div>
        <div
          class="tw-pl-3"
        >
          <div
            v-for="otherCalendar in otherCalendarList"
            :key="otherCalendar.id"
            class="tw-flex tw-items-center"
          >
            <b-checkbox
              :id="`my-calendar-${otherCalendar.id}-display`"
              v-model="otherCalendar.isDisplay"
              :label="otherCalendar.name"
              :color="otherCalendar.color"
              class="tw-mr-1"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
  <div
    v-if="isOpenSidebar"
    class="md:tw-hidden tw-opacity-50 tw-bg-gray-700 tw-h-full tw-w-1/3 md:tw-w-0 tw-z-10 tw-absolute tw-right-0"
    @click="onClickOutside"
  />
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { GuildCalendarActionTypes } from '@/store/modules/guilds/generals/calendars/actions'
import useStore from '@/store'
import CDivider from '@/components/commons/Divider/index.vue'
import BCheckbox from '@/components/commons/inputs/Checkbox/index.vue'

export default defineComponent({
  name: 'GuildCalendarViewSidebar',
  components: { BCheckbox, CDivider },
  setup: () => {
    const store = useStore()

    const isOpenLayoutSidebar = computed(() => store.state.guild.isOpenSideBar)
    const isOpenSidebar = computed(() => store.state.guildCalendar.isOpenSidebar)
    const myCalendarList = computed(() => store.state.guildCalendar.myCalendarList)
    const guildCalendarList = computed(() => store.state.guildCalendar.guildCalendarList)
    const otherCalendarList = computed(() => store.state.guildCalendar.otherCalendarList)

    const onClickOutside = async () => {
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
      myCalendarList,
      guildCalendarList,
      otherCalendarList,
      onClickOutside,
    }
  }
})
</script>
