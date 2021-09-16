<template>
  <!--  <ul class="nav nav-tabs">-->
  <!--    &lt;!&ndash;  Main  &ndash;&gt;-->
  <!--    <li class="nav-item">-->
  <!--      <router-link-->
  <!--        class="nav-link"-->
  <!--        aria-current="page"-->
  <!--        :class="{-->
  <!--          active: routerKey === RouterNameEnum.GUILD_ADMIN_ROLE_MAIN,-->
  <!--        }"-->
  <!--        :to="{ name: RouterNameEnum.GUILD_ADMIN_ROLE_MAIN }"-->
  <!--      >-->
  <!--        {{ $t(`router.${RouterNameEnum.GUILD_ADMIN_ROLE_MAIN}.title`) }}-->
  <!--      </router-link>-->
  <!--    </li>-->
  <!--  </ul>-->
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
            Add Role
          </button>
          <c-divider
            class="tw-my-2"
          />
          <guild-admin-role-layout-role-list />
        </div>
      </div>
      <!--   RIGHT   -->
      <div
        class="md:tw-w-9/12 tw-w-full md:tw-block md:tw-border tw-rounded-md"
        :class="{
          'tw-hidden': isMainRoute,
        }"
      >
        <router-view
          :key="routerKey"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeUnmount, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { RouterNameEnum } from '@/types/systems/routers/keys'
import useStore from '@/store'
import { GuildAdminRoleActionTypes } from '@/store/modules/guilds/admins/Role/actions'
import CMaterialIcon from '@/components/commons/icons/Material/index.vue'
import CDivider from '@/components/commons/Divider/index.vue'
import GuildAdminRoleLayoutRoleList from '@/layouts/views/admins/Role/components/RoleList.vue'

export default defineComponent({
  name: 'GuildAdminRoleLayout',
  components: { GuildAdminRoleLayoutRoleList, CDivider, CMaterialIcon },
  setup: () => {
    const store = useStore()
    const route = useRoute()

    const routerKey = computed(() => route.path)
    const roleList = computed(() => store.state.guildAdminRole.roleList)
    const selectedRole = computed(() => store.state.guildAdminRole.selectedRole)
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


    return {
      routerKey,
      RouterNameEnum,
      roleList,
      isMainRoute,
      selectedRole,
    }
  }
})
</script>
