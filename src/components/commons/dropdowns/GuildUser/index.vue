<template>
  <div class="dropdown ">
    <t-avatar
      type="button"
      data-bs-toggle="dropdown"
      size="8"
      aria-expanded="false"
      class="tw-ring tw-rounded-full"
      :src="guildUserInfo.img"
      :name="guildUserInfo.nickname"
      :color="guildUserInfo.color || 'primary'"
    >
      <template
        #badge
      >
        <span
          class="tw-absolute tw--bottom-1 tw--right-2 tw-translate-middle tw-p-2 tw-border tw-rounded-full tw-shadow-inner"
          :class="{
            'tw-bg-green-500': guildUserInfo.state === 'ONLINE',
            'tw-bg-yellow-500': guildUserInfo.state === 'IDLE',
            'tw-bg-red-500': guildUserInfo.state === 'DO_NOT_DISTURB',
            'tw-bg-gray-100': guildUserInfo.state === 'INVISIBLE',
            'tw-bg-gray-200': guildUserInfo.state === 'OFFLINE',
          }"
        />
      </template>
    </t-avatar>
    <div
      class="dropdown-menu"
      :class="{
        'dropdown-menu-end': end,
      }"
    >
      <div
        class="tw-px-4"
      >
        {{ guildUserInfo.nickname }}
      </div>
      <c-divider />
      <div>
        <div
          class="tw-font-bold tw-text-lg tw-px-4"
        >
          State
        </div>
        <div
          v-for="guildUserState in guildUserStatesData"
          :key="guildUserState"
          class="tw-pl-7 tw-py-1 tw-cursor-pointer hover:tw-bg-gray-200"
          @click="onClickStateListItem(guildUserState)"
        >
          <span
            class="badge tw-p-1 tw-border tw-rounded-full tw-shadow-inner tw-mr-2"
            :class="{
              'tw-bg-green-500': guildUserState === 'ONLINE',
              'tw-bg-yellow-500': guildUserState === 'IDLE',
              'tw-bg-red-500': guildUserState === 'DO_NOT_DISTURB',
              'tw-bg-gray-100': guildUserState === 'INVISIBLE',
              'tw-bg-gray-200': guildUserState === 'OFFLINE',
            }"
          >
            <span class="visually-hidden">{{ guildUserState }}</span>
          </span>
          <span>
            {{ $t(`types.models.guilds.user.fields.states.${guildUserState}`) }}
          </span>
        </div>
      </div>
      {{ guildUserInfo.state }}
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
import { guildUserStatesData } from '@/data/guilds/user'
import CDivider from '@/components/commons/Divider/index.vue'
import useStore from '@/store'
import { GuildActionTypes } from '@/store/modules/guilds/info/actions'
import { GuildUserState } from '@/types/model/auth/user/user'
import useToast from '@/mixins/useToast'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'GuildUserDropdown',
  components: { CDivider, TAvatar },
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
    const { addToast } = useToast()
    const i18n = useI18n()
    const { guildUserInfo } = useGuildInfoMixin()

    const onClickLogoutItem = async () => {
      await router.push({ name: RouterNameEnum.LOGOUT })
    }

    const onClickStateListItem = async (targetState: GuildUserState) => {
      try {
        await store.dispatch(GuildActionTypes.UPDATE_GUILD_USER_STATE, targetState)
        addToast({
          title: i18n.t('standardToastTitle.saved'),
          content: i18n.t('standardResult.updated'),
          type: 'success',
        })
      } catch (e) {
        console.error(e)
        addToast({
          title: i18n.t('standardToastTitle.failed'),
          content: i18n.t('standardResult.failed'),
          type: 'danger',
        })
      }
    }

    return {
      guildUserInfo,
      guildUserStatesData,
      onClickLogoutItem,
      onClickStateListItem,
    }
  }
})
</script>
