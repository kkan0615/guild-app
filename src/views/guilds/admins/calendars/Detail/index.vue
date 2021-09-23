<template>
  <div
    class="tw-h-full md:tw-p-2"
  >
    <div
      class="tw-flex-grow-0 tw-flex-shrink tw-flex"
    >
      <c-material-icon
        class="tw-cursor-pointer"
        @click="onClickBackBtn"
      >
        chevron_left
      </c-material-icon>
      <div
        v-if="mode === 'UPDATE'"
      >
        {{ $t('standardBtnLabels.edit') }}
      </div>
      <div
        class="tw-ml-auto tw-flex tw-space-x-2"
      >
        <button
          type="button"
          class="btn-sm btn-primary"
          @click="onClickEditBtn"
        >
          {{ $t('standardBtnLabels.edit') }}
        </button>
        <button
          type="button"
          class="btn-sm btn-outline-danger"
          @click="onClickDeleteBtn"
        >
          {{ $t('standardBtnLabels.delete') }}
        </button>
      </div>
    </div>
    <c-divider
      class="tw-my-2"
    />
    <div>
      {{ selectedCalendar }}
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeUnmount, onMounted } from 'vue'
import useStore from '@/store'
import { GuildAdminCalendarActionTypes } from '@/store/modules/guilds/admins/Calendar/actions'
import { useRoute, useRouter } from 'vue-router'
import { RouterNameEnum } from '@/types/systems/routers/keys'
import useToast from '@/mixins/useToast'
import { useI18n } from 'vue-i18n'
import CMaterialIcon from '@/components/commons/icons/Material/index.vue'
import CDivider from '@/components/commons/Divider/index.vue'

export default defineComponent({
  name: 'DetailCalendarGuildAdmin',
  components: {
    CDivider,
    CMaterialIcon
  },
  setup: () => {
    const store = useStore()
    const route = useRoute()
    const router = useRouter()
    const i18n = useI18n()
    const { addToast } = useToast()

    const isMainRoute = computed(() => route.name === RouterNameEnum.GUILD_ADMIN_CALENDAR_MAIN)
    const selectedCalendar = computed(() => store.state.guildAdminCalendar.selectedCalendar)

    onMounted(async () => {
      try {
        const { calendarId } = route.params
        if (calendarId)
          await store.dispatch(GuildAdminCalendarActionTypes.LOAD_SELECTED_CALENDAR_BY_ID, calendarId as string)
      } catch (e) {
        console.error(e)
        await router.push({ name: RouterNameEnum.GUILD_ADMIN_CALENDAR_MAIN })
      }
    })

    onBeforeUnmount(async () => {
      try {
        await store.dispatch(GuildAdminCalendarActionTypes.RESET_SELECTED_CALENDAR)
      } catch (e) {
        console.error(e)
      }
    })

    /**
     * Edit button Click event, Redirect to update form
     */
    const onClickEditBtn = async () => {
      try {
        await router.push({ name: RouterNameEnum.GUILD_ADMIN_CALENDAR_UPDATE_FORM, params: { calendarId: selectedCalendar.value.id } })
      } catch (e) {
        console.error(e)
        addToast({
          title: i18n.t('standardToastTitle.failedRedirect'),
          content: i18n.t('standardResult.failRedirect'),
          type: 'danger',
        })
      }
    }

    const onClickDeleteBtn = async () => {
      /* Default role cannot be deleted */
      try {
        /* Delete calendar by id */
        await store.dispatch(GuildAdminCalendarActionTypes.DELETE_GUILD_CALENDAR, selectedCalendar.value.id)
        /* Reload guild calendar list */
        await store.dispatch(GuildAdminCalendarActionTypes.LOAD_GUILD_CALENDARS)
        /* Redirect to main */
        await router.push({ name: RouterNameEnum.GUILD_ADMIN_CALENDAR_MAIN })
        addToast({
          title: i18n.t('standardToastTitle.saved'),
          content: i18n.t('standardResult.removed'),
          type: 'success',
        })
      } catch (e) {
        console.error(e)
        addToast({
          title: i18n.t('standardToastTitle.failed'),
          content: i18n.t('standardResult.failed'),
          type: 'danger',
        })
      }
    }

    /**
     * Back button Click event, redirect to main
     */
    const onClickBackBtn = async () => {
      await router.push({ name: RouterNameEnum.GUILD_ADMIN_CALENDAR_MAIN })
    }

    return {
      isMainRoute,
      selectedCalendar,
      onClickEditBtn,
      onClickDeleteBtn,
      onClickBackBtn,
    }
  }
})
</script>
