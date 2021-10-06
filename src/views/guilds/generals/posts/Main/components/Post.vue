<template>
  <div
    class="tw-rounded tw-text-sm"
  >
    <div
      v-if="post.PostBoard && post.PostBoard.PostBoardGroup"
      class="tw-text-xs"
    >
      {{ post.PostBoard.PostBoardGroup.name }} > {{ post.PostBoard.name }}
    </div>
    <div
      class="tw-font-bold tw-text-base"
    >
      {{ post.title }}
    </div>
    <div>
      <span
        v-if="post.content.length > 500"
      >
        {{ post.content.slice(0, 500) }} ...
      </span>
      <span
        v-else
      >
        {{ post.content }}
      </span>
    </div>
    <div
      class="tw-flex tw-items-center tw-mt-2"
    >
      <t-avatar
        size="5"
        class="tw-mx-2"
        :src="post.Creator.img"
        :name="post.Creator.nickname"
      />
      <div>
        {{ formattedCreatedAt }}
      </div>
      <div
        class="tw-ml-auto"
      >
        <span>
          comments
          {{ post.Comments.length }}
        </span>
      </div>
    </div>
  </div>
</template>
<script
  lang="ts"
>
export default {
  name: 'MainGuildPostPost',
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
  }
})

const formattedCreatedAt = computed(() => dayjs(props.post?.createdAt).format('llll'))

</script>
