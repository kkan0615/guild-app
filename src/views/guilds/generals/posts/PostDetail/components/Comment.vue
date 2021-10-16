<template>
  <li
    v-if="comment"
    class="tw-border tw-rounded"
  >
    <div
      v-if="comment.Creator"
      class="tw-flex tw-items-center tw-bg-gray-400 tw-p-1"
    >
      <t-avatar
        class="tw-mr-2"
        :size="5"
        :name="comment.Creator.nickname"
        :src="comment.Creator.img"
      />
      <div
        class="tw-font-bold"
      >
        {{ comment.Creator.nickname }}
      </div>
      <div
        class="tw-ml-auto tw-flex tw-items-center"
      >
        <c-material-icon
          v-if="hasEditPermission && !isUpdateMode"
          clickable
          size="lg"
          @click="onClickEditBtn"
        >
          edit
        </c-material-icon>
        <c-material-icon
          v-if="hasEditPermission && isUpdateMode"
          clickable
          size="lg"
          @click="onClickCloseBtn"
        >
          close
        </c-material-icon>
        <c-material-icon
          v-if="hasDeletePermission"
          class="tw-ml-1 tw-text-red-500"
          size="lg"
          clickable
          @click="onClickDeleteBtn"
        >
          delete
        </c-material-icon>
      </div>
    </div>
    <div
      v-if="!isUpdateMode"
      class="tw-p-1 tw-whitespace-pre-wrap"
    >
      {{ comment.content }}
    </div>
    <div
      v-else
    >
      <post-detail-guild-post-comment-form
        class="tw-p-1"
        :comment="comment"
        @updated:comment="onUpdatedComment"
      />
    </div>
  </li>
</template>
<script
    lang="ts"
>
export default {
  name: 'PostDetailGuildPostComment',
}
</script>
<script setup lang="ts">
import { computed, defineProps, ref, } from 'vue'
import type { PropType } from 'vue'
import type {
  GuildPostCommentInfo,
} from '@/types/model/guilds/post'
import TAvatar from '@/components/tailwinds/Avatar/index.vue'
import useGuildInfoMixin from '@/mixins/useGuildInfoMixin'
import CMaterialIcon from '@/components/commons/icons/Material/index.vue'
import PostDetailGuildPostCommentForm from '@/views/guilds/generals/posts/PostDetail/components/CommentForm.vue'

const props = defineProps({
  comment: {
    type: Object as PropType<GuildPostCommentInfo>,
    required: false,
    default: () => {}
  }
})

const { guildUserInfo } = useGuildInfoMixin()

const isUpdateMode = ref(false)

const hasEditPermission = computed(() => props.comment && props.comment.creatorId === guildUserInfo.value.id)
const hasDeletePermission = computed(() => props.comment && props.comment.creatorId === guildUserInfo.value.id)

const onClickEditBtn = () =>  {
  isUpdateMode.value = true
}

const onClickCloseBtn = () =>  {
  isUpdateMode.value = false
}

const onClickDeleteBtn = () =>  {
  isUpdateMode.value = false
}

const onUpdatedComment = () =>  {
  isUpdateMode.value = false
}

</script>
