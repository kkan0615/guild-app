<template>
  <div
    class="tw-h-full md:tw-p-2"
  >
    <div
      class="tw-h-full tw-flex md:tw-space-x-4"
    >
      <!--   LEFT   -->
      <div
        class="tw-h-full md:tw-w-3/12 tw-w-full md:tw-block md:tw-border md:tw-overflow-auto tw-rounded-md"
        :class="{
          'tw-hidden': !isMainRoute,
        }"
      >
        <div
          class="tw-bg-gray-400 tw-p-2 tw-rounded-t"
        >
          Guild Calendars
        </div>
        <div
          class="p-2"
        >
          <button
            class="btn btn-outline-primary btn-sm tw-flex"
            @click="onClickAddCalendarBtn"
          >
            Add Calendar
          </button>
          <c-divider
            class="tw-my-2"
          />
          <guild-admin-role-layout-calendar-list
            :calendars="guildCalendars"
          />
        </div>
      </div>
      <!--   RIGHT   -->
      <div
        class="md:tw-w-9/12 tw-w-full md:tw-block md:tw-border tw-rounded-md"
        :class="{
          'tw-hidden': isMainRoute,
        }"
      >
        <router-view
          :key="routerKey"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeUnmount, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { RouterNameEnum } from '@/types/systems/routers/keys'
import useStore from '@/store'
import CDivider from '@/components/commons/Divider/index.vue'
import { GuildAdminCalendarActionTypes } from '@/store/modules/guilds/admins/Calendar/actions'
import GuildAdminRoleLayoutCalendarList from '@/layouts/views/admins/Calendar/components/CalendarList.vue'

export default defineComponent({
  name: 'GuildAdminCalendarLayout',
  components: {
    GuildAdminRoleLayoutCalendarList,
    CDivider
  },
  setup: () => {
    const store = useStore()
    const route = useRoute()
    const router = useRouter()

    const routerKey = computed(() => route.path)
    const guildCalendars = computed(() => store.state.guildAdminCalendar.guildCalendars)
    const isMainRoute = computed(() => route.name === RouterNameEnum.GUILD_ADMIN_CALENDAR_MAIN)

    onMounted(async () => {
      try {
        await store.dispatch(GuildAdminCalendarActionTypes.LOAD_GUILD_CALENDARS)
      } catch (e) {
        console.error(e)
      }
    })

    onBeforeUnmount(async () => {
      try {
        await store.dispatch(GuildAdminCalendarActionTypes.RESET_GUILD_CALENDARS)
      } catch (e) {
        console.error(e)
      }
    })

    const onClickAddCalendarBtn = async () => {
      try {
        await router.push({ name: RouterNameEnum.GUILD_ADMIN_CALENDAR_CREATE_FORM })
      } catch (e) {
        console.error(e)
      }
    }

    return {
      RouterNameEnum,
      routerKey,
      isMainRoute,
      guildCalendars,
      onClickAddCalendarBtn,
    }
  }
})
</script>
