<template>
  <div
    v-if="manager"
    class="tw-border tw-border-black tw-rounded-md tw-p-4"
  >
    <div
      class="tw-text-center"
    >
      <div
        class="tw-flex tw-justify-center"
      >
        <t-avatar
          class="tw-ring tw-rounded-full tw-mr-2"
          :src="manager.img"
          :name="manager.nickname"
        />
      </div>
      <div>
        {{ manager.nickname }}
      </div>
      <span
        class="badge rounded-pill bg-primary"
      >
        Manager
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, computed } from 'vue'
import useStore from '@/store'
import TAvatar from '@/components/tailwinds/Avatar/index.vue'

export default defineComponent({
  name: 'MainUserGuildAdminManager',
  components: { TAvatar },
  setup: () => {
    const store = useStore()

    const userList = computed(() => store.state.guildAdminUser.userList)
    const manager = computed(() => store.state.guild.guildInfo.mainManger)

    return {
      manager
    }
  }
})
</script>
