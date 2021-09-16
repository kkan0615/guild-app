<template>
  <div
    class="h-full tw-flex tw-items-center tw-pt-1"
  >
    <div
      class="tw-relative"
    >
      <c-material-icon
        v-if="isGuildManager(params)"
        class="tw-absolute tw-z-10 tw-right-0 tw-text-sm tw-text-yellow-500"
        style="right: -5px; top: -5px"
      >
        auto_awesome
      </c-material-icon>
      <t-avatar
        size="7"
        :src="params.data.img"
        :name="params.data.nickname"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ICellRendererParams } from 'ag-grid-community'
import { tailwindDefaultColors } from '@/data/color'
import TAvatar from '@/components/tailwinds/Avatar/index.vue'
import CMaterialIcon from '@/components/commons/icons/Material/index.vue'
import useStore from '@/store'

export default defineComponent({
  name: 'UserAvatarColumn',
  components: { CMaterialIcon, TAvatar },
  setup: () => {
    const store = useStore()

    const getColor = (params: ICellRendererParams) => {
      return tailwindDefaultColors.includes(params.value.color) ? `tw-bg-${params.value.color}-500` : 'tw-bg-blue-500'
    }

    const isGuildManager = (params: ICellRendererParams) => {
      return store.state.guild.guildInfo.mainMangerId === params.data.uid
    }

    return {
      getColor,
      isGuildManager,
    }
  }
})
</script>
