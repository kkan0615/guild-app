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
        v-if="loggedInUser.img"
        :src="loggedInUser.img"
        :alt="loggedInUser.nickname"
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
        {{ loggedInUser.nickname }}
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
import useUserMixin from '@/mixins/useUserMixin'
import { useRouter } from 'vue-router'
import { RouterNameEnum } from '@/types/systems/routers/keys'
import TAvatar from '@/components/tailwinds/Avatar/index.vue'

export default defineComponent({
  name: 'UserDropdown',
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
    const { loggedInUser } = useUserMixin()

    const onClickLogoutItem = async () => {
      await router.push({ name: RouterNameEnum.LOGOUT })
    }

    return {
      loggedInUser,
      onClickLogoutItem,
    }
  }
})
</script>
