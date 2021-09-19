<template>
  <div>
    <div
      class="tw-text-lg tw-font-bold tw-mb-2"
    >
      Total: {{ userList.length }}
    </div>
    <div>
      <c-ag-grid
        v-if="userList"
        height="80vh"
        :columns="columns"
        :rows="userList"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
import useStore from '@/store'
import { UserColumnAtAdminUser } from '@/types/model/auth/user/column'
import CAgGrid from '@/components/commons/AgGrid/index.vue'
import RoleColumnBadge from '@/components/columns/badges/Role.vue'
import MainUserGuildAdminColumnActions from '@/views/guilds/admins/users/Main/components/ColumnActions.vue'
import UserAvatarColumn from '@/components/columns/UserAvatar.vue'

export default defineComponent({
  name: 'MainUserGuildAdminTable',
  components: {
    UserAvatarColumn,
    MainUserGuildAdminColumnActions,
    CAgGrid,
    RoleColumnBadge, // Use in Column component
  },
  setup: () => {
    const store = useStore()

    const columns = ref(UserColumnAtAdminUser)

    const userList = computed(() => store.state.guildAdminUser.userList)

    return {
      columns,
      userList
    }
  }
})
</script>
