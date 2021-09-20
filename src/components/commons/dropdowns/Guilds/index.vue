<template>
  <div class="dropdown">
    <div
      class="material-icons tw-cursor-pointer tw-flex tw-justify-center tw-items-center"
      data-bs-toggle="dropdown"
    >
      apps
    </div>
    <div
      class="dropdown-menu tw-h-64 tw-w-72 tw-overflow-y-auto"
      :class="{
        'dropdown-menu-end': end,
      }"
    >
      <div
        class="tw-p-4 tw-grid tw-grid-cols-3 tw-gap-4"
      >
        <div
          v-for="guild in guilds"
          :key="guild.id"
          class="tw-text-center tw-cursor-pointer"
          @click="onClickGuildApp(guild.id)"
        >
          <img
            :src="guild.img"
            alt="logo"
          >
          <div>
            {{ guild.name }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { RouterNameEnum } from '@/types/systems/routers/keys'
import useStore from '@/store'

export default defineComponent({
  name: 'GuildsDropdown',
  props: {
    end: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  setup: () => {
    const router = useRouter()
    const store = useStore()

    const guilds = computed(() => store.state.user.guildList)

    const onClickGuildApp = async (appId: string) => {
      await router.push({ name: RouterNameEnum.GUILD_HOME, params: { guildId: appId } })
    }

    return {
      guilds,
      onClickGuildApp,
    }
  }
})
</script>
