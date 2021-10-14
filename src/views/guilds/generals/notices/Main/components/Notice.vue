<template>
  <div
    class="tw-border tw-border-gray-500 tw-rounded-md"
  >
    <div
      class="tw-p-2 tw-text-lg"
      :style="{
        'background-color': notice.color,
      }"
    >
      <div
        class="tw-text-white"
      >
        {{ notice.title }}
      </div>
      <div
        class="tw-flex tw-justify-end tw-flex tw-flex-wrap"
      >
        <main-guild-notice-form
          :id="id"
          type="UPDATE"
          :notice="notice"
        >
          <c-material-icon>
            edit
          </c-material-icon>
        </main-guild-notice-form>
        <c-material-icon
          class="tw-cursor-pointer"
          @click="onClickDeleteBtn"
        >
          delete
        </c-material-icon>
      </div>
    </div>
    <div
      class="tw-p-2 tw-text-right"
    >
      {{ formattedEndDate }}
    </div>
    <div
      class="tw-p-2"
    >
      {{ notice.content }}
    </div>
  </div>
</template>
<script
  lang="ts"
>
export default {
  name: 'MainGuildNoticeNotice',
}
</script>
<script setup lang="ts">
import type { PropType } from 'vue'
import type { GuildNotice } from '@/types/model/guilds/notice'
import { computed, defineProps, onBeforeUnmount, onMounted } from 'vue'
import useStore from '@/store'
import dayjs from 'dayjs'
import CMaterialIcon from '@/components/commons/icons/Material/index.vue'
import MainGuildNoticeForm from '@/views/guilds/generals/notices/Main/components/Form.vue'
import { useI18n } from 'vue-i18n'
import useToast from '@/mixins/useToast'
import { GuildNoticeActionTypes } from '@/store/modules/guilds/generals/notices/actions'

const props = defineProps({
  id: {
    type: String,
    required: true,
    default: '',
  },
  notice: {
    type: Object as PropType<GuildNotice>,
    required: true,
    default: () => {}
  }
})

const store = useStore()
const i18n = useI18n()
const { addToast } = useToast()

const formattedEndDate = computed(() => {
  if (props.notice) {
    if (props.notice.endDate) {
      return dayjs(props.notice.endDate).format('ll')
    } else {
      return ''
    }
  } else {
    return ''
  }
})

const onClickDeleteBtn = async () => {
  if (props.notice) {
    try {
      await store.dispatch(GuildNoticeActionTypes.DELETE_NOTICE, props.notice.id)
      /* Reload */
      await store.dispatch(GuildNoticeActionTypes.LOAD_NOTICE_LIST)
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
}

</script>
