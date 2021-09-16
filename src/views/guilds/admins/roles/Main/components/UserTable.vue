<template>
  <c-ag-grid
    v-if="userList"
    height="100%"
    :columns="columns"
    :rows="userList"
  />
</template>

<script lang="ts">
import { ref, defineComponent, computed } from 'vue'
import useStore from '@/store'
import CAgGrid from '@/components/commons/AgGrid/index.vue'
import UserAvatarColumn from '@/components/columns/UserAvatar.vue'
import MainUserGuildAdminColumnActions from '@/views/guilds/admins/users/Main/components/ColumnActions.vue'
import RoleColumnBadge from '@/components/columns/badges/Role.vue'
import { UserColumnAtAdminUser } from '@/types/model/auth/user/column'

export default defineComponent({
  name: 'MainRoleGuildAdminUserTable',
  components: {
    UserAvatarColumn,
    MainUserGuildAdminColumnActions,
    CAgGrid,
    RoleColumnBadge, // Use in Column component
  },
  setup: () => {
    const store = useStore()

    const userList = computed(() => store.state.guildAdminRole.selectedRole.Users)
    const columns = ref(UserColumnAtAdminUser)

    return {
      userList,
      columns,
    }
  }
})
</script>
