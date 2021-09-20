<template>
  <ul
    class="tw-flex tw-flex-col tw-space-y-1"
  >
    <guild-admin-role-layout-role-list-item
      v-for="role in roleList"
      :key="role.id"
      :role="role"
      :active="role.id === selectedRole.id"
    />
  </ul>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import useStore from '@/store'
import GuildAdminRoleLayoutRoleListItem from '@/layouts/views/admins/Role/components/RoleListItem.vue'

export default defineComponent({
  name: 'GuildAdminRoleLayoutRoleList',
  components: { GuildAdminRoleLayoutRoleListItem },
  setup: () => {
    const store = useStore()

    const roleList = computed(() => store.getters.sortedRoleList)
    const selectedRole = computed(() => store.state.guildAdminRole.selectedRole)

    return {
      roleList,
      selectedRole,
    }
  }
})
</script>
