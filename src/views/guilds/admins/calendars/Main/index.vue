<template>
  <div
    class="tw-h-full md:tw-p-2"
  >
    <div
      class="tw-h-full tw-flex tw-justify-center tw-items-center"
    >
      <div
        class="tw-text-4xl"
      >
        Select Calendar
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeUnmount, onMounted } from 'vue'
import useStore from '@/store'
import { GuildAdminRoleActionTypes } from '@/store/modules/guilds/admins/Role/actions'
import { useRoute, useRouter } from 'vue-router'
import { RouterNameEnum } from '@/types/systems/routers/keys'
import MainRoleGuildAdminEdit from '@/views/guilds/admins/roles/Main/components/Edit.vue'
import CDivider from '@/components/commons/Divider/index.vue'
import MainRoleGuildAdminInfo from '@/views/guilds/admins/roles/Main/components/info.vue'
import CMaterialIcon from '@/components/commons/icons/Material/index.vue'
import useToast from '@/mixins/useToast'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'MainCalendarGuildAdmin',
  components: {
  },
  setup: () => {
    const store = useStore()
    const route = useRoute()
    const router = useRouter()
    const i18n = useI18n()
    const { addToast } = useToast()

    const isMainRoute = computed(() => route.name === RouterNameEnum.GUILD_ADMIN_CALENDAR_MAIN)

    onMounted(async () => {
      // try {
      //   const { id } = route.params
      //   if (id)
      //     await store.dispatch(GuildAdminRoleActionTypes.LOAD_SELECTED_ROLE, id as string)
      // } catch (e) {
      //   console.error(e)
      //   await router.push({ name: RouterNameEnum.GUILD_ADMIN_ROLE_MAIN })
      // }
    })

    onBeforeUnmount(async () => {
      try {
        // await store.dispatch(GuildAdminRoleActionTypes.RESET_SELECTED_ROLE)
        // await store.dispatch(GuildAdminRoleActionTypes.SET_MODE, 'READ')
      } catch (e) {
        console.error(e)
      }
    })

    const onClickEditBtn = async () => {
      // try {
      //   await store.dispatch(GuildAdminRoleActionTypes.SET_MODE, 'UPDATE')
      // } catch (e) {
      //   console.error(e)
      //   addToast({
      //     title: i18n.t('standardToastTitle.failed'),
      //     content: i18n.t('standardResult.failed'),
      //     type: 'danger',
      //   })
      // }
    }

    const onClickDeleteBtn = async () => {
      // /* Default role cannot be deleted */
      // if (!selectedRole.value.default) {
      //   try {
      //     /* Delete Role */
      //     await store.dispatch(GuildAdminRoleActionTypes.DELETE_ROLE, selectedRole.value.id)
      //     /* Reload role list */
      //     await store.dispatch(GuildAdminRoleActionTypes.LOAD_ROLE_LIST)
      //     /* Redirect to main */
      //     await router.push({ name: RouterNameEnum.GUILD_ADMIN_ROLE_MAIN })
      //     addToast({
      //       title: i18n.t('standardToastTitle.saved'),
      //       content: i18n.t('standardResult.removed'),
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
    }

    const onClickBackBtn = async () => {
      // await router.push({ name: RouterNameEnum.GUILD_ADMIN_ROLE_MAIN })
    }

    return {
      isMainRoute,
      onClickEditBtn,
      onClickDeleteBtn,
      onClickBackBtn,
    }
  }
})
</script>
