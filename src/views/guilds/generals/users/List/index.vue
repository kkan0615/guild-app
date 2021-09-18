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
        class="tw-flex"
      >
        <guild-user-list-filter
          class="tw-ml-auto"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, onMounted, onBeforeUnmount } from 'vue'
import useStore from '@/store'
import { GuildUserActionTypes } from '@/store/modules/guilds/users/actions'
import CFullLoading from '@/components/commons/loadings/Full/index.vue'
import { RouterNameEnum } from '@/types/systems/routers/keys'
import GuildUserListFilter from '@/views/guilds/generals/users/List/components/Filter.vue'

export default defineComponent({
  name: 'GuildUserList',
  components: { GuildUserListFilter, CFullLoading },
  setup: () => {
    const store = useStore()

    const fullLoading = ref(true)

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
      RouterNameEnum,
    }
  }
})
</script>
