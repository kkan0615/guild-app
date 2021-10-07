<template>
  <div>
    MainGuildPost
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

const store = useStore()
const route = useRoute()
const router = useRouter()

const currentPostBoard = computed(() => store.state.guildPost.currentPostBoard)
const currentPost = computed(() => store.state.guildPost.currentPost)

onMounted(async () => {
  try {
    const { postId } = route.params

    await store.dispatch(GuildPostActionTypes.LOAD_CURRENT_POST, postId)
    if (!currentPostBoard.value || !currentPostBoard.value.id) {
      await store.dispatch(GuildPostActionTypes.LOAD_CURRENT_BOARD, currentPost.value.postBoardId)
    }
  } catch (e) {
    console.error(e)
  }
})

onBeforeUnmount(async () => {
  try {
    await store.dispatch(GuildPostActionTypes.RESET_CURRENT_POST)
    await store.dispatch(GuildPostActionTypes.RESET_CURRENT_BOARD)
  } catch (e) {
    console.error(e)
  }
})
</script>
