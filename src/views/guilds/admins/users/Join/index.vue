<template>
  <div
    class="tw-py-2"
  >
    <div
      class="tw-font-bold tw-mb-2"
    >
      Total: {{ joinForms.length }}
    </div>
    <join-user-guild-admin-join
      v-for="joinForm in joinForms"
      :key="joinForm.uid"
      :guild-join="joinForm"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeUnmount, onMounted, ref } from 'vue'
import useStore from '@/store'
import { GuildAdminUserActionTypes } from '@/store/modules/guilds/admins/User/actions'
import JoinUserGuildAdminJoin from '@/views/guilds/admins/users/Join/components/Join.vue'

export default defineComponent({
  name: 'JoinUserGuildAdmin',
  components: { JoinUserGuildAdminJoin },
  setup: () => {
    const store = useStore()

    const fullLoading = ref(false)

    const joinForms = computed(() => store.state.guildAdminUser.joinForms)

    // @TODO: ADD loading
    onMounted(async () => {
      fullLoading.value = true
      try {
        await store.dispatch(GuildAdminUserActionTypes.LOAD_GUILD_JOIN_FORMS)
      } catch (e) {
        console.error(e)
      } finally {
        fullLoading.value = false
      }
    })

    onBeforeUnmount(async () => {
      await store.dispatch(GuildAdminUserActionTypes.RESET_GUILD_JOIN_FORMS)
    })

    return {
      joinForms
    }
  }
})
</script>
