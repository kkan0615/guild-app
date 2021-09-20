<template>
  <div
    class="tw-w-full tw-bg-gray-500 tw-text-white tw-p-3 tw-flex tw-items-center"
  >
    <div
      v-if="black.User"
      class="tw-flex tw-items-center"
    >
      <t-avatar
        size="8"
        class="tw-ring tw-rounded-full tw-mr-2"
        :src="black.User.img"
        :name="black.User.nickname"
      />
      <div>
        {{ black.User.nickname }}
      </div>
    </div>
    <div
      class="tw-ml-auto"
    >
      <c-material-icon
        class="tw-cursor-pointer mt-2"
        type="outlined"
        @click="onClickCancelBtn"
      >
        cancel
      </c-material-icon>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import CMaterialIcon from '@/components/commons/icons/Material/index.vue'
import { GuildBlackInfo } from '@/types/model/guilds/blackList'
import useToast from '@/mixins/useToast'
import useStore from '@/store'
import { GuildAdminUserActionTypes } from '@/store/modules/guilds/admins/User/actions'
import { useI18n } from 'vue-i18n'
import TAvatar from '@/components/tailwinds/Avatar/index.vue'

export default defineComponent({
  name: 'BlackListUserGuildAdminListItem',
  components: { TAvatar, CMaterialIcon },
  props: {
    black: {
      type: Object as PropType<GuildBlackInfo>,
      required: false,
      default: () => {},
    },
  },
  setup: (props) => {
    const store = useStore()
    const i18n = useI18n()
    const { addToast } = useToast()

    const onClickCancelBtn = async () => {
      try {
        await store.dispatch(GuildAdminUserActionTypes.REMOVE_FROM_BLACK_LIST, props.black.id)
        addToast({
          title: 'Success',
          type: 'success',
          content: i18n.t('standardResult.saved'),
        })
      } catch (e) {
        console.error(e)
        addToast({
          type: 'danger',
          title: 'error',
          content: 'error on click cancel button',
        })
      }
    }

    return {
      onClickCancelBtn,
    }
  }
})
</script>
