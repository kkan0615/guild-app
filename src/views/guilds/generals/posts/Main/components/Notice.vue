<template>
  <div
    class="tw-rounded tw-text-sm tw-border-b tw-border-t tw-py-1 tw-px-2"
  >
    <div
      v-if="post.PostBoard && post.PostBoard.PostBoardGroup"
      class="tw-text-cxs"
    >
      {{ post.PostBoard.PostBoardGroup.name }} > {{ post.PostBoard.name }}
    </div>
    <div
      class="tw-font-bold"
    >
      {{ post.title }}
    </div>
    <div
      class="tw-text-xs tw-text-right"
    >
      {{ formattedCreatedAt }}
    </div>
  </div>
</template>
<script
    lang="ts"
>
export default {
  name: 'MainGuildPostNews',
}
</script>
<script setup lang="ts">
import type { PropType } from 'vue'
import type { GuildPostInfoAtMain } from '@/types/model/guilds/post'
import { computed, defineProps } from 'vue'
import dayjs from 'dayjs'
import TAvatar from '@/components/tailwinds/Avatar/index.vue'

const props = defineProps({
  post: {
    type: Object as PropType<GuildPostInfoAtMain>,
    required: true,
    default: () => {},
  },
})

const formattedCreatedAt = computed(() => dayjs(props.post?.createdAt).format('llll'))

</script>
