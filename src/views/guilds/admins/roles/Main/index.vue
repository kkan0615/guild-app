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
        <div>
          {{ selectedRole.name }}
        </div>
        <button
          type="button"
          class="btn-sm btn-primary tw-ml-auto"
          @click="onClickEditBtn"
        >
          {{ $t('standardBtnLabels.edit') }}
        </button>
      </div>
      <c-divider
        class="tw-my-2"
      />
      <div
        class="tw-flex-grow tw-flex-shrink-0 tw-h-1"
      >
        <div
          v-if="mode === 'READ'"
        >
          {{ selectedRole }}
        </div>
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
import CHorizontalView from '@/components/commons/HorizontalView/index.vue'
import CHorizontalViewLabel from '@/components/commons/HorizontalView/components/Label.vue'
import CHorizontalViewContent from '@/components/commons/HorizontalView/components/Content.vue'
import BBaseInput from '@/components/commons/inputs/Base/index.vue'
import MainRoleGuildAdminEdit from '@/views/guilds/admins/roles/Main/components/Edit.vue'
import CDivider from '@/components/commons/Divider/index.vue'

export default defineComponent({
  name: 'MainRoleGuildAdmin',
  components: { CDivider, MainRoleGuildAdminEdit, BBaseInput, CHorizontalViewContent, CHorizontalViewLabel, CHorizontalView },
  setup: () => {
    const store = useStore()
    const route = useRoute()
    const router = useRouter()

    const selectedRole = computed(() => store.state.guildAdminRole.selectedRole)
    const mode = computed(() => store.state.guildAdminRole.mode)
    const isMainRoute = computed(() => route.name === RouterNameEnum.GUILD_ADMIN_ROLE_MAIN)

    onMounted(async () => {
      if (!isMainRoute.value) {
        try {
          const { id } = route.params
          if (id)
            await store.dispatch(GuildAdminRoleActionTypes.LOAD_SELECTED_ROLE, id)
        } catch (e) {
          console.error(e)
          await router.push({ name: RouterNameEnum.GUILD_ADMIN_ROLE_MAIN })
        }
      }
    })

    onBeforeUnmount(async () => {
      try {
        await store.dispatch(GuildAdminRoleActionTypes.RESET_SELECTED_ROLE)
      } catch (e) {
        console.error(e)
      }
    })

    const onClickEditBtn = async () => {
      try {
        await store.dispatch(GuildAdminRoleActionTypes.SET_MODE, 'UPDATE')
      } catch (e) {
        console.error(e)
      }
    }

    return {
      selectedRole,
      isMainRoute,
      mode,
      onClickEditBtn,
    }
  }
})
</script>
