<template>
  <div
    class="tw-rounded tw-text-sm tw-cursor-pointer tw-p-2 hover:tw-border-2 tw-border-black hover:tw-bg-gray-200"
    @click="onClickPost"
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
import { useRouter } from 'vue-router'
import { RouterNameEnum } from '@/types/systems/routers/keys'

const props = defineProps({
  post: {
    type: Object as PropType<GuildPostInfoAtMain>,
    required: true,
    default: () => {},
  },
})

const router = useRouter()

const formattedCreatedAt = computed(() => dayjs(props.post?.createdAt).format('llll'))

const onClickPost = async () => {
  try {
    if (props.post) {
      await router.push({ name: RouterNameEnum.GUILD_POST_DETAIL, params: { postId: props.post.id } })
    }
  } catch (e) {
    console.error(e)
  }
}

</script>
