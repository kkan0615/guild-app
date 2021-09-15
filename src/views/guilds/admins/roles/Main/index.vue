<template>
  <div
    class="tw-h-full md:tw-p-2"
  >
    <div
      class="tw-h-full tw-flex tw-gap-x-4"
    >
      <!--   LEFT   -->
      <div
        class="tw-h-full md:tw-w-3/12 tw-w-full md:tw-block md:tw-border tw-rounded-md"
        :class="{
          'tw-hidden': !isMainRoute,
        }"
      >
        <div
          class="tw-bg-gray-400 tw-p-2 tw-rounded-t"
        >
          Role Groups
        </div>
        <div
          class="p-2"
        >
          <button
            class="btn btn-outline-primary btn-sm tw-flex"
          >
            <c-material-icon
              class="tw-mr-1"
            >
              add
            </c-material-icon>
            Add Role
          </button>
          <ul>
            <li
              v-for="role in roleList"
              :key="role.uid"
              @click="onClickRoleItem"
            >
              {{ role.name }}
            </li>
          </ul>
        </div>
      </div>
      <!--   RIGHT   -->
      <div
        class="md:tw-w-9/12 tw-w-full md:tw-block"
        :class="{
          'tw-hidden': isMainRoute,
        }"
      >
        right
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeUnmount, onMounted } from 'vue'
import useStore from '@/store'
import { GuildAdminRoleActionTypes } from '@/store/modules/guilds/admins/Role/actions'
import CMaterialIcon from '@/components/commons/icons/Material/index.vue'
import { useRoute, useRouter } from 'vue-router'
import { RouterNameEnum } from '@/types/systems/routers/keys'
import { GuildRole } from '@/types/model/guilds/role'

export default defineComponent({
  name: 'MainRoleGuildAdmin',
  components: { CMaterialIcon },
  setup: () => {
    const store = useStore()
    const route = useRoute()
    const router = useRouter()

    const roleList = computed(() => store.state.guildAdminRole.roleList)
    const isMainRoute = computed(() => route.name === RouterNameEnum.GUILD_ADMIN_ROLE_MAIN)

    onMounted(async () => {
      try {
        await store.dispatch(GuildAdminRoleActionTypes.LOAD_ROLE_LIST)
      } catch (e) {
        console.error(e)
      }
    })

    onBeforeUnmount(async () => {
      try {
        await store.dispatch(GuildAdminRoleActionTypes.RESET_ROLE_LIST)
      } catch (e) {
        console.error(e)
      }
    })

    const onClickRoleItem = async (role: GuildRole) => {
      await router.push({ name: RouterNameEnum.GUILD_ADMIN_ROLE_DETAIL, params: { id: role.uid } })
    }

    return {
      roleList,
      isMainRoute,
      onClickRoleItem,
    }
  }
})
</script>
