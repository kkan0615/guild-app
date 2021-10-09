<template>
  <div>
    <!--  headers  -->
    <div
      class="tw-flex tw-items-center"
    >
      <c-material-icon
        @click="onClickBackBtn"
      >
        chevron_left
      </c-material-icon>
    </div>
    <div>
      {{ currentPostBoard }}
    </div>
    <div>
      post
    </div>
    {{ currentPost }}
  </div>
</template>
<script
    lang="ts"
>
export default {
  name: 'PostDetailGuildPost',
}
</script>
<script setup lang="ts">
import useStore from '@/store'
import { computed, onBeforeUnmount, onMounted } from 'vue'
import { GuildPostActionTypes } from '@/store/modules/guilds/generals/posts/actions'
import { useRoute, useRouter } from 'vue-router'
import CMaterialIcon from '@/components/commons/icons/Material/index.vue'

const store = useStore()
const route = useRoute()
const router = useRouter()

const currentPostBoard = computed(() => store.state.guildPost.currentPostBoard)
const currentPost = computed(() => store.state.guildPost.currentPost)

onMounted(async () => {
  const { postId } = route.params
  try {
    await store.dispatch(GuildPostActionTypes.LOAD_CURRENT_POST, postId as string)
    await store.dispatch(GuildPostActionTypes.LOAD_CURRENT_BOARD, currentPost.value.postBoardId)
  } catch (e) {
    console.error(e)
  }
})

onBeforeUnmount(async () => {
  try {
    await store.dispatch(GuildPostActionTypes.RESET_CURRENT_POST)
  } catch (e) {
    console.error(e)
  }
})

const onClickBackBtn = () => {
  router.back()
}
</script>
