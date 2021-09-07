<template>
  <div class="dropdown ">
    <t-avatar
      type="button"
      data-bs-toggle="dropdown"
      size="8"
      aria-expanded="false"
      class="tw-ring tw-rounded-full"
    >
      <img
        v-if="guildUserInfo.img"
        :src="guildUserInfo.img"
        :alt="guildUserInfo.nickname"
        class="tw-object-cover tw-object-center tw-w-full tw-h-full"
      >
      <span
        v-else
        class="tw-font-bold tw-w-full tw-h-full tw-flex tw-justify-center tw-items-center"
      >
        KR
      </span>
    </t-avatar>
    <div
      class="dropdown-menu"
      :class="{
        'dropdown-menu-end': end,
      }"
    >
      <div
        class="dropdown-item"
      >
        {{ guildUserInfo.nickname }}
      </div>
      <!--   Logout item   -->
      <div
        class="dropdown-item"
        @click="onClickLogoutItem"
      >
        Logout
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { RouterNameEnum } from '@/types/systems/routers/keys'
import TAvatar from '@/components/tailwinds/Avatar/index.vue'
import useGuildInfoMixin from '@/mixins/useGuildInfoMixin'

export default defineComponent({
  name: 'GuildUserDropdown',
  components: { TAvatar },
  props: {
    end: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  setup: () => {
    const router = useRouter()
    const { guildUserInfo } = useGuildInfoMixin()

    const onClickLogoutItem = async () => {
      await router.push({ name: RouterNameEnum.LOGOUT })
    }

    return {
      guildUserInfo,
      onClickLogoutItem,
    }
  }
})
</script>
