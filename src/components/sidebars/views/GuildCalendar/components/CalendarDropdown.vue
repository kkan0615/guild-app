<template>
  <div class="dropdown">
    <b-tooltip
      data-bs-toggle="dropdown"
      title="option"
    >
      <c-material-icon

        aria-expanded="false"
      >
        more_vert
      </c-material-icon>
    </b-tooltip>
    <ul
      class="dropdown-menu"
      aria-labelledby="calendar-dropdown"
    >
      <li>
        <div
          class="tw-px-2"
          @click="onClickEditBtn"
        >
          Update
        </div>
      </li>
      <li>
        <div
          class="tw-px-2"
          @click="onClickRemoveBtn"
        >
          Remove
        </div>
      </li>
    </ul>
  </div>
</template>
<script
    lang="ts"
>
export default {
  name: 'GuildCalendarViewSidebarCalendarDropdown',
}
</script>
<script setup lang="ts">
import type { PropType } from 'vue'
import CMaterialIcon from '@/components/commons/icons/Material/index.vue'
import { useRoute, useRouter } from 'vue-router'
import useStore from '@/store'
import { GuildCalendarActionTypes } from '@/store/modules/guilds/generals/calendars/actions'
import useToast from '@/mixins/useToast'
import { useI18n } from 'vue-i18n'
import { RouterNameEnum } from '@/types/systems/routers/keys'
import type { GuildCalendar } from '@/types/model/guilds/calendar'
import BTooltip from '@/components/bootstraps/Tooltip/index.vue'

const props = defineProps({
  calendar: {
    type: Object as PropType<GuildCalendar>,
    required: true,
    default: () => {},
  },
})

const store = useStore()
const router = useRouter()
const route = useRoute()
const i18n = useI18n()
const { addToast } = useToast()

const onClickEditBtn = async () => {
  try {
    if (props.calendar) {
      await router.push({ name: RouterNameEnum.GUILD_CALENDAR_UPDATE_FORM, params: { calendarId: props.calendar.id } })
    } else {
      addToast({
        title: i18n.t('standardToastTitle.failedRedirect'),
        content: i18n.t('standardResult.failRedirect'),
        type: 'danger',
      })
    }
  } catch (e) {
    console.error(e)
    addToast({
      title: i18n.t('standardToastTitle.failedRedirect'),
      content: i18n.t('standardResult.failRedirect'),
      type: 'danger',
    })
  }
}

const onClickRemoveBtn = async () => {
  try {
    if (props.calendar) {
      await store.dispatch(GuildCalendarActionTypes.DELETE_CALENDAR_BY_ID, props.calendar.id)
      await store.dispatch(GuildCalendarActionTypes.LOAD_MY_CALENDAR_LIST)
      /* If user is in update form, redirect to main page of calendar */
      if (route.name === RouterNameEnum.GUILD_CALENDAR_UPDATE_FORM) {
        await router.push({ name: RouterNameEnum.GUILD_CALENDAR_MAIN })
      }
      addToast({
        title: i18n.t('standardToastTitle.saved'),
        content: i18n.t('standardResult.removed'),
        type: 'success',
      })
    } else {
      addToast({
        title: i18n.t('standardToastTitle.failed'),
        content: i18n.t('standardResult.failed'),
        type: 'danger',
      })
    }
  } catch (e) {
    console.error(e)
    addToast({
      title: i18n.t('standardToastTitle.failed'),
      content: i18n.t('standardResult.failed'),
      type: 'danger',
    })
  }
}

</script>
