<template>
  <div>
    <div
      class="tw-flex tw-items-center mt-4"
    >
      <div
        class="tw-flex tw-items-center tw-text-sm
"
      >
        <c-material-icon
          class=" tw-text-center"
        >
          comments
        </c-material-icon>
        <span>
          comments {{ commentListByPost.length }}
        </span>
      </div>
    </div>
    <post-detail-guild-post-comment-form />
    <ul
      class="tw-mt-2"
    >
      <post-detail-guild-post-comment
        v-for="comment in commentListByPost"
        :key="comment.id"
        :comment="comment"
      />
    </ul>
  </div>
</template>
<script
    lang="ts"
>
export default {
  name: 'PostDetailGuildPostComments',
}
</script>
<script setup lang="ts">
import { computed, ref } from 'vue'
import PostDetailGuildPostCommentForm from '@/views/guilds/generals/posts/PostDetail/components/CommentForm.vue'
import PostDetailGuildPostComment from '@/views/guilds/generals/posts/PostDetail/components/Comment.vue'
import CMaterialIcon from '@/components/commons/icons/Material/index.vue'
import useStore from '@/store'

const store = useStore()

const commentListByPost = computed(() => store.state.guildPost.commentListByPost)

</script>
