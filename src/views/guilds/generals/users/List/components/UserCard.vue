<template>
  <div
    class="tw-border tw-rounded tw-relative tw-p-2 "
  >
    <div
      class="tw-absolute tw-w-full tw--top-1/2 tw-flex tw-justify-center tw-pr-4"
    >
      <t-avatar
        :src="user.img"
        :name="user.nickname"
        size="20"
      >
        <template
          #badge
        >
          <b-tooltip
            class="tw-absolute tw--bottom-1 tw--right-1.5 tw-translate-middle tw-p-3 tw-border tw-rounded-full tw-shadow-inner"
            :class="{
              'tw-bg-green-500': user.state === 'ONLINE',
              'tw-bg-yellow-500': user.state === 'IDLE',
              'tw-bg-red-500': user.state === 'DO_NOT_DISTURB',
              'tw-bg-gray-100': user.state === 'INVISIBLE',
              'tw-bg-gray-200': user.state === 'OFFLINE',
            }"
            :title="$t(`types.models.guilds.user.fields.states.${user.state}`)"
          />
        </template>
      </t-avatar>
    </div>
    <div
      class="tw-mt-12 tw-text-center"
    >
      <div
        class="tw-text-lg tw-font-semibold"
      >
        {{ user.nickname }}
      </div>
      <div>
        <span
          class="badge"
          :class="{
            [`tw-bg-${user.role.color}-500`]: true,
          }"
        >
          {{ user.role.name }}
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { GuildUserAtUserList } from '@/types/model/auth/user/user'
import TAvatar from '@/components/tailwinds/Avatar/index.vue'
import BTooltip from '@/components/bootstraps/Tooltip/index.vue'

export default defineComponent({
  name: 'GuildUserListUserCard',
  components: { BTooltip, TAvatar },
  props: {
    user: {
      type: Object as PropType<GuildUserAtUserList>,
      required: false,
      default: () => {
        return {} as GuildUserAtUserList
      },
    }
  },
  setup: () => {
    return {
    }
  }
})
</script>
