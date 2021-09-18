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
      />
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

export default defineComponent({
  name: 'GuildUserListUserCard',
  components: { TAvatar },
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
