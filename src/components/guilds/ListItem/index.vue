<template>
  <div
    class="tw-p-2 tw-ring tw-text-center tw-cursor-pointer hover:tw-shadow-2xl"
  >
    <div
      class="tw-flex tw-justify-center tw-mb-2"
    >
      <img
        class="tw-rounded-full tw-border tw-border-black tw-w-44 tw-h-44"
        :src="guild.img"
        alt="logo"
      >
    </div>
    <div
      class="tw-text-xl tw-font-black"
    >
      {{ guild.name }}
    </div>
    <div>
      {{ guild.description }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { GuildInfo } from '@/types/model/guilds'

export default defineComponent({
  name: 'GuildListItem',
  props: {
    guild: {
      type: Object as PropType<GuildInfo>,
      required: true,
      default: () => {
        return {} as GuildInfo
      },
    }
  },
  setup: () => {

  }
})
</script>
