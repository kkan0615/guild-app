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
    {{ role.name }}
  </li>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from 'vue'
import useStore from '@/store'
import { GuildRole } from '@/types/model/guilds/role'
import { RouterNameEnum } from '@/types/systems/routers/keys'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'GuildAdminRoleLayoutRoleListItem',
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

    const roleList = computed(() => store.state.guildAdminRole.roleList)
    const selectedRole = computed(() => store.state.guildAdminRole.selectedRole)

    const onClickRoleItem = async () => {
      await router.push({ name: RouterNameEnum.GUILD_ADMIN_ROLE_DETAIL, params: { id: props.role.uid } })
    }

    return {
      roleList,
      selectedRole,
      onClickRoleItem,
    }
  }
})
</script>
