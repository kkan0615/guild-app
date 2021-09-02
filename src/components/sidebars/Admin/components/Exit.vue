<template>
  <div
    class="tw-py-2 tw-px-4 tw-flex tw-items-center tw-select-none tw-text-gray-400 tw-cursor-pointer hover:tw-text-white"
    @click="onClickExitAdmin"
  >
    <div
      class="material-icons tw-mr-2"
    >
      logout
    </div>
    Exit
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { RouterNameEnum } from '@/types/systems/routers/keys'

export default defineComponent({
  name: 'AdminSidebarExit',
  setup: () => {
    const router = useRouter()

    const onClickExitAdmin = async () => {
      await router.push({ name: RouterNameEnum.GUILD_HOME })
    }

    return {
      onClickExitAdmin
    }
  }
})
</script>
