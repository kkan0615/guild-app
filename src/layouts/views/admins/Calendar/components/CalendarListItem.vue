<template>
  <li
    class="tw-p-2"
    :class="{
      'md:tw-border-l-4': active,
      'md:tw-border-blue-500': active && !calendar.color,
      'md:tw-bg-gray-300': active,
    }"
    :style="{
      'border-color': calendar.color,
    }"
    @click="onClickCalenderItem(calendar)"
  >
    <div
      class="tw-flex tw-items-center"
    >
      {{ calendar.name }}
      <!--      <div-->
      <!--        class="tw-ml-auto"-->
      <!--      >-->
      <!--        <c-material-icon-->
      <!--          v-if="role.index !== 0"-->
      <!--          @click.stop="onClickDownBtn"-->
      <!--        >-->
      <!--          keyboard_arrow_up-->
      <!--        </c-material-icon>-->
      <!--        <c-material-icon-->
      <!--          v-if="role.index !== roleList.length - 1"-->
      <!--          @click.stop="onClickUpBtn"-->
      <!--        >-->
      <!--          keyboard_arrow_down-->
      <!--        </c-material-icon>-->
      <!--      </div>-->
    </div>
  </li>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import useStore from '@/store'
import { RouterNameEnum } from '@/types/systems/routers/keys'
import { useRouter } from 'vue-router'
import CMaterialIcon from '@/components/commons/icons/Material/index.vue'
import useToast from '@/mixins/useToast'
import { useI18n } from 'vue-i18n'
import { GuildCalendar } from '@/types/model/guilds/calendar'

export default defineComponent({
  name: 'GuildAdminRoleLayoutCalendarListItem',
  components: {
    CMaterialIcon
  },
  props: {
    calendar: {
      type: Object as PropType<GuildCalendar>,
      required: false,
      default: () => {},
    },
    active: {
      type: Boolean,
      required: false,
      default: false,
    }
  },
  setup: (props) => {
    const store = useStore()
    const router = useRouter()
    const i18n = useI18n()
    const { addToast } = useToast()

    const roleList = computed(() => store.state.guildAdminRole.roleList)
    const selectedRole = computed(() => store.state.guildAdminRole.selectedRole)

    const onClickCalenderItem = async () => {
      await router.push({ name: RouterNameEnum.GUILD_ADMIN_CALENDAR_DETAIL, params: { calendarId: props.calendar.id } })
    }

    // const onClickUpBtn = async () => {
    //   try {
    //     await store.dispatch(GuildAdminRoleActionTypes.ROLE_INDEX_UP, props.role)
    //     await store.dispatch(GuildAdminRoleActionTypes.LOAD_ROLE_LIST)
    //     addToast({
    //       title: i18n.t('standardToastTitle.saved'),
    //       content: i18n.t('standardResult.updated'),
    //       type: 'success',
    //     })
    //   } catch (e) {
    //     console.error(e)
    //     addToast({
    //       title: i18n.t('standardToastTitle.failed'),
    //       content: i18n.t('standardResult.failed'),
    //       type: 'danger',
    //     })
    //   }
    // }
    //
    // const onClickDownBtn = async () => {
    //   try {
    //     await store.dispatch(GuildAdminRoleActionTypes.ROLE_INDEX_DOWN, props.role)
    //     await store.dispatch(GuildAdminRoleActionTypes.LOAD_ROLE_LIST)
    //     addToast({
    //       title: i18n.t('standardToastTitle.saved'),
    //       content: i18n.t('standardResult.updated'),
    //       type: 'success',
    //     })
    //   } catch (e) {
    //     console.error(e)
    //     addToast({
    //       title: i18n.t('standardToastTitle.failed'),
    //       content: i18n.t('standardResult.failed'),
    //       type: 'danger',
    //     })
    //   }
    // }

    return {
      roleList,
      selectedRole,
      onClickCalenderItem,
      // onClickUpBtn,
      // onClickDownBtn,
    }
  }
})
</script>
