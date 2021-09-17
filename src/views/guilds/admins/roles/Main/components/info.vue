<template>
  <div
    class="tw-h-full tw-flex tw-flex-col"
  >
    <div
      class="tw-flex-shrink tw-flex-grow-0 mb-2"
    >
      <c-horizontal-view>
        <c-horizontal-view-label>
          {{ $t('types.models.guilds.role.fields.name') }}
        </c-horizontal-view-label>
        <c-horizontal-view-content>
          {{ selectedRole.name }}
        </c-horizontal-view-content>
      </c-horizontal-view>
      <c-horizontal-view>
        <c-horizontal-view-label>
          {{ $t('types.models.guilds.role.fields.color') }}
        </c-horizontal-view-label>
        <c-horizontal-view-content>
          <div
            class="tw-h-4 tw-w-4 tw-rounded-full"
            :class="{
              [`tw-bg-${selectedRole.color}-500`]: true,
            }"
          />
        </c-horizontal-view-content>
      </c-horizontal-view>
      <c-horizontal-view>
        <c-horizontal-view-label>
          {{ $t('types.models.guilds.role.fields.default') }}
        </c-horizontal-view-label>
        <c-horizontal-view-content>
          {{ selectedRole.default ? 'yes' : 'no' }}
        </c-horizontal-view-content>
      </c-horizontal-view>
    </div>
    <div
      class="tw-flex-shrink-0 tw-flex-grow tw-h-1"
    >
      <div
        class="tw-min-h-full"
        style="height: 500px;"
      >
        <main-role-guild-admin-user-table />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import useStore from '@/store'
import CHorizontalView from '@/components/commons/HorizontalView/index.vue'
import CHorizontalViewLabel from '@/components/commons/HorizontalView/components/Label.vue'
import CHorizontalViewContent from '@/components/commons/HorizontalView/components/Content.vue'
import MainRoleGuildAdminUserTable from '@/views/guilds/admins/roles/Main/components/UserTable.vue'

export default defineComponent({
  name: 'MainRoleGuildAdminInfo',
  components: {
    MainRoleGuildAdminUserTable,
    CHorizontalViewContent,
    CHorizontalViewLabel,
    CHorizontalView

  },
  setup: () => {
    const store = useStore()

    const selectedRole = computed(() => store.state.guildAdminRole.selectedRole)

    return {
      selectedRole,
    }
  }
})
</script>
