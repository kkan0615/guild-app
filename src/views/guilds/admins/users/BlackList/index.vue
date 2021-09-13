<template>
  <div>
    <div
      class="tw-font-bold"
    >
      Black list
    </div>
    <black-list-user-guild-admin-list>
      <black-list-user-guild-admin-list-item
        v-for="black in blackList"
        :key="black.uid"
        :black="black"
      />
    </black-list-user-guild-admin-list>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, computed, onMounted, onBeforeUnmount } from 'vue'
import useStore from '@/store'
import { GuildAdminUserActionTypes } from '@/store/modules/guilds/admins/User/actions'
import BlackListUserGuildAdminList from '@/views/guilds/admins/users/BlackList/components/List.vue'
import BlackListUserGuildAdminListItem from '@/views/guilds/admins/users/BlackList/components/ListItem.vue'

export default defineComponent({
  name: 'BlackListUserGuildAdmin',
  components: { BlackListUserGuildAdminListItem, BlackListUserGuildAdminList },
  setup: () => {
    const store = useStore()

    const fullLoading = ref(false)

    const blackList = computed(() => store.state.guildAdminUser.blackList)

    onMounted(async () => {
      fullLoading.value = true
      try {
        await store.dispatch(GuildAdminUserActionTypes.LOAD_BLACK_LIST)
      } catch (e) {
        console.error(e)
      } finally {
        fullLoading.value = false
      }
    })

    onBeforeUnmount(async () => {
      fullLoading.value = true
      try {
        await store.dispatch(GuildAdminUserActionTypes.RESET_BLACK_LIST)
      } catch (e) {
        console.error(e)
      } finally {
        fullLoading.value = false
      }
    })

    return {
      blackList
    }
  }
})
</script>
