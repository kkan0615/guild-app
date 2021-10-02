<template>
  <div
    class="tw-border tw-border-gray-500 tw-rounded-md"
  >
    <div
      class="tw-p-2  tw-text-lg tw-flex tw-items-center"
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
        class="tw-ml-auto tw-flex"
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
        <c-material-icon>
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

</script>
