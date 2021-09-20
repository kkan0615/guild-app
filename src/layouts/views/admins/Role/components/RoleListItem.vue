<template>
  <li
    class="tw-p-2"
    :class="{
      'md:tw-border-l-4': active,
      'md:tw-border-blue-500': active,
      'md:tw-bg-gray-300': active,
    }"
    @click="onClickRoleItem(role)"
  >
    <div
      class="tw-flex tw-items-center"
    >
      {{ role.name }}
      <div
        class="tw-ml-auto"
      >
        <c-material-icon
          v-if="role.index !== 0"
          @click.stop="onClickDownBtn"
        >
          keyboard_arrow_up
        </c-material-icon>
        <c-material-icon
          v-if="role.index !== roleList.length - 1"
          @click.stop="onClickUpBtn"
        >
          keyboard_arrow_down
        </c-material-icon>
      </div>
    </div>
  </li>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import useStore from '@/store'
import { GuildRole } from '@/types/model/guilds/role'
import { RouterNameEnum } from '@/types/systems/routers/keys'
import { useRouter } from 'vue-router'
import CMaterialIcon from '@/components/commons/icons/Material/index.vue'
import { GuildAdminRoleActionTypes } from '@/store/modules/guilds/admins/Role/actions'
import useToast from '@/mixins/useToast'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'GuildAdminRoleLayoutRoleListItem',
  components: { CMaterialIcon },
  props: {
    role: {
      type: Object as PropType<GuildRole>,
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

    const onClickRoleItem = async () => {
      await router.push({ name: RouterNameEnum.GUILD_ADMIN_ROLE_DETAIL, params: { id: props.role.uid } })
    }

    const onClickUpBtn = async () => {
      try {
        await store.dispatch(GuildAdminRoleActionTypes.ROLE_INDEX_UP, props.role)
        await store.dispatch(GuildAdminRoleActionTypes.LOAD_ROLE_LIST)
        addToast({
          title: i18n.t('standardToastTitle.saved'),
          content: i18n.t('standardResult.updated'),
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

    const onClickDownBtn = async () => {
      try {
        await store.dispatch(GuildAdminRoleActionTypes.ROLE_INDEX_DOWN, props.role)
        await store.dispatch(GuildAdminRoleActionTypes.LOAD_ROLE_LIST)
        addToast({
          title: i18n.t('standardToastTitle.saved'),
          content: i18n.t('standardResult.updated'),
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

    return {
      roleList,
      selectedRole,
      onClickRoleItem,
      onClickUpBtn,
      onClickDownBtn,
    }
  }
})
</script>
