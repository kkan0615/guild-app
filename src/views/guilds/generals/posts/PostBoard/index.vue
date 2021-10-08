<template>
  <div
    class="md:tw-p-2"
  >
    <post-board-post-board-info />
    <div>
      Notices
    </div>
    <div>
      notice list
    </div>
    <div>
      Posts
    </div>
    <div>
      <post-board-post-post-table />
    </div>
  </div>
</template>
<script
    lang="ts"
>
export default {
  name: 'PostBoardPost',
}
</script>
<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { GuildPostActionTypes } from '@/store/modules/guilds/generals/posts/actions'
import useStore from '@/store'
import { useRoute, useRouter } from 'vue-router'
import { RouterNameEnum } from '@/types/systems/routers/keys'
import PostBoardPostBoardInfo from '@/views/guilds/generals/posts/PostBoard/components/BoardInfo.vue'
import PostBoardPostPostTable from '@/views/guilds/generals/posts/PostBoard/components/PostTable.vue'

const store = useStore()
const route = useRoute()
const router = useRouter()

onMounted(async () => {
  const { postBoardId } = route.params

  try {
    /* 1. Load current post board by post board id in route */
    await store.dispatch(GuildPostActionTypes.LOAD_CURRENT_BOARD, postBoardId)
    /* 2. Load post list by post board id */
    await store.dispatch(GuildPostActionTypes.LOAD_POST_LIST_BY_BOARD_ID, postBoardId)
  } catch (e) {
    console.error(e)
    await router.push({ name: RouterNameEnum.GUILD_POST_MAIN })
  }
})

onBeforeUnmount(async () => {
  try {
    await store.dispatch(GuildPostActionTypes.RESET_CURRENT_BOARD)
    await store.dispatch(GuildPostActionTypes.RESET_POST_LIST_BY_BOARD_ID)
  } catch (e) {
    console.error(e)
    await router.push({ name: RouterNameEnum.GUILD_POST_MAIN })
  }
})
</script>
