<template>
  <div
    class="tw-h-full"
  >
    <c-full-loading
      v-if="fullLoading"
    />
    <div
      v-else
    >
      <c-base-header
        :page-name="$t(`router.${RouterNameEnum.GUILD_USER_LIST}.title`)"
        :breadcrumbs="breadcrumbs"
      />
      <div
        class="tw-flex tw-items-center tw-mb-4"
      >
        <div
          class="tw-font-semibold tw-text-lg
"
        >
          Total: {{ userList.length }}
        </div>
        <guild-user-list-filter
          class="tw-ml-auto"
        />
      </div>
      <!-- User list -->
      <div
        class="md:tw-grid md:tw-grid-cols-4 md:tw-gap-x-3 md:tw-gap-y-16 md:tw-space-y-0 tw-space-y-16 tw-mb-72 tw-pb-4 md:tw-pt-16"
      >
        <guild-user-list-user-card
          v-for="user in userList"
          :key="user.id"
          :user="user"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import type { CBBreadcrumb } from '@/components/bootstraps/Breadcrumb/types'
import { ref, defineComponent, onMounted, onBeforeUnmount, computed } from 'vue'
import useStore from '@/store'
import { GuildUserActionTypes } from '@/store/modules/guilds/generals/users/actions'
import CFullLoading from '@/components/commons/loadings/Full/index.vue'
import { RouterNameEnum } from '@/types/systems/routers/keys'
import GuildUserListFilter from '@/views/guilds/generals/users/List/components/Filter.vue'
import GuildUserListUserCard from '@/views/guilds/generals/users/List/components/UserCard.vue'
import { useI18n } from 'vue-i18n'
import CBaseHeader from '@/components/headers/Base/index.vue'

export default defineComponent({
  name: 'GuildUserList',
  components: { CBaseHeader, GuildUserListUserCard, GuildUserListFilter, CFullLoading },
  setup: () => {
    const store = useStore()
    const i18n = useI18n()

    const fullLoading = ref(true)
    /* Breadcrumbs data */
    const breadcrumbs = ref<Array<CBBreadcrumb>>([
      {
        name: i18n.t(`router.${RouterNameEnum.GUILD_HOME}.title`),
        routerName: RouterNameEnum.GUILD_HOME,
        active: true,
      },
      {
        name: i18n.t(`router.${RouterNameEnum.GUILD_USER_LIST}.title`),
        routerName: RouterNameEnum.GUILD_NOTICE_MAIN,
        active: false,
      },
    ])

    const userList = computed(() => store.state.guildUser.userList)

    onMounted(async () => {
      fullLoading.value = true
      try {
        await store.dispatch(GuildUserActionTypes.LOAD_USER_LIST)
      } catch (e) {
        console.error(e)
      } finally {
        fullLoading.value = false
      }
    })

    onBeforeUnmount(async () => {
      fullLoading.value = true
      try {
        await store.dispatch(GuildUserActionTypes.RESET_USER_LIST)
      } catch (e) {
        console.error(e)
      } finally {
        fullLoading.value = false
      }
    })

    return {
      fullLoading,
      userList,
      breadcrumbs,
      RouterNameEnum,
    }
  }
})
</script>
