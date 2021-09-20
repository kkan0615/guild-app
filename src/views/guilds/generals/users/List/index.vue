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
      <div
        class="tw-flex tw-items-center"
      >
        <div
          class="tw-text-lg tw-font-bold"
        >
          Users
        </div>
        <div
          class="tw-ml-auto"
        >
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <router-link
                  :to="{ name: RouterNameEnum.GUILD_HOME}"
                >
                  Home
                </router-link>
              </li>
              <li
                class="breadcrumb-item active"
                aria-current="page"
              >
                Users
              </li>
            </ol>
          </nav>
        </div>
      </div>
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
import { ref, defineComponent, onMounted, onBeforeUnmount, computed } from 'vue'
import useStore from '@/store'
import { GuildUserActionTypes } from '@/store/modules/guilds/users/actions'
import CFullLoading from '@/components/commons/loadings/Full/index.vue'
import { RouterNameEnum } from '@/types/systems/routers/keys'
import GuildUserListFilter from '@/views/guilds/generals/users/List/components/Filter.vue'
import GuildUserListUserCard from '@/views/guilds/generals/users/List/components/UserCard.vue'

export default defineComponent({
  name: 'GuildUserList',
  components: { GuildUserListUserCard, GuildUserListFilter, CFullLoading },
  setup: () => {
    const store = useStore()

    const fullLoading = ref(true)

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
      RouterNameEnum,
    }
  }
})
</script>
