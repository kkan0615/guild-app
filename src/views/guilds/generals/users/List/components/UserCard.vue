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
              [`tw-bg-${guildUserStateColorsData[user.state]}`]: true,
            }"
            :title="$t(`types.models.guilds.user.fields.states.${user.state}`)"
          />
        </template>
      </t-avatar>
    </div>
    <!--  content  -->
    <div
      class="tw-mt-12 tw-text-center"
    >
      <!--   nickname   -->
      <div
        class="tw-text-lg tw-font-semibold"
      >
        {{ user.nickname }}
      </div>
      <!--   role   -->
      <div
        class="badge"
        :class="{
          [`tw-bg-${user.role.color}-500`]: true,
        }"
      >
        {{ user.role.name }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { GuildUserAtUserList } from '@/types/model/auth/user/user'
import TAvatar from '@/components/tailwinds/Avatar/index.vue'
import BTooltip from '@/components/bootstraps/Tooltip/index.vue'
import { guildUserStateColorsData } from '@/data/guilds/user'

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
      guildUserStateColorsData,
    }
  }
})
</script>
