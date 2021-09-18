<template>
  <div
    class="tw-h-full md:tw-p-2"
  >
    <div
      v-if="selectedRole.uid"
      class="tw-h-full tw-flex tw-flex-col"
    >
      <div
        class="tw-flex-grow-0 tw-flex-shrink tw-flex"
      >
        <c-material-icon
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
            :disabled="selectedRole.default"
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
      <div
        class="tw-flex-grow tw-flex-shrink-0 tw-h-1"
      >
        <main-role-guild-admin-info
          v-if="mode === 'READ'"
        />
        <main-role-guild-admin-edit
          v-else
        />
      </div>
    </div>
    <div
      v-else
      class="tw-h-full tw-flex tw-justify-center tw-items-center"
    >
      <div
        class="tw-text-4xl"
      >
        Select Role
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
  name: 'MainRoleGuildAdmin',
  components: {
    CMaterialIcon,
    MainRoleGuildAdminInfo,
    CDivider,
    MainRoleGuildAdminEdit
  },
  setup: () => {
    const store = useStore()
    const route = useRoute()
    const router = useRouter()
    const i18n = useI18n()
    const { addToast } = useToast()

    const selectedRole = computed(() => store.state.guildAdminRole.selectedRole)
    const mode = computed(() => store.state.guildAdminRole.mode)
    const isMainRoute = computed(() => route.name === RouterNameEnum.GUILD_ADMIN_ROLE_MAIN)

    onMounted(async () => {
      if (!isMainRoute.value) {
        try {
          const { id } = route.params
          if (id)
            await store.dispatch(GuildAdminRoleActionTypes.LOAD_SELECTED_ROLE, id as string)
        } catch (e) {
          console.error(e)
          await router.push({ name: RouterNameEnum.GUILD_ADMIN_ROLE_MAIN })
        }
      }
    })

    onBeforeUnmount(async () => {
      try {
        await store.dispatch(GuildAdminRoleActionTypes.RESET_SELECTED_ROLE)
        await store.dispatch(GuildAdminRoleActionTypes.SET_MODE, 'READ')
      } catch (e) {
        console.error(e)
      }
    })

    const onClickEditBtn = async () => {
      try {
        await store.dispatch(GuildAdminRoleActionTypes.SET_MODE, 'UPDATE')
      } catch (e) {
        console.error(e)
        addToast({
          title: i18n.t('standardToastTitle.failed'),
          content: i18n.t('standardResult.failed'),
          type: 'danger',
        })
      }
    }

    const onClickDeleteBtn = async () => {
      /* Default role cannot be deleted */
      if (!selectedRole.value.default) {
        try {
          /* Delete Role */
          await store.dispatch(GuildAdminRoleActionTypes.DELETE_ROLE, selectedRole.value.uid)
          /* Reload role list */
          await store.dispatch(GuildAdminRoleActionTypes.LOAD_ROLE_LIST)
          /* Redirect to main */
          await router.push({ name: RouterNameEnum.GUILD_ADMIN_ROLE_MAIN })
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
    }

    const onClickBackBtn = async () => {
      await router.push({ name: RouterNameEnum.GUILD_ADMIN_ROLE_MAIN })
    }

    return {
      selectedRole,
      isMainRoute,
      mode,
      onClickEditBtn,
      onClickDeleteBtn,
      onClickBackBtn,
    }
  }
})
</script>
