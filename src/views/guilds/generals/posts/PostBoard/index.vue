<template>
  <c-full-loading
    v-if="fullLoading"
  />
  <div
    v-else
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
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { GuildPostActionTypes } from '@/store/modules/guilds/generals/posts/actions'
import useStore from '@/store'
import { useRoute, useRouter } from 'vue-router'
import { RouterNameEnum } from '@/types/systems/routers/keys'
import PostBoardPostBoardInfo from '@/views/guilds/generals/posts/PostBoard/components/BoardInfo.vue'
import PostBoardPostPostTable from '@/views/guilds/generals/posts/PostBoard/components/PostTable.vue'
import useGuildInfoMixin from '@/mixins/useGuildInfoMixin'
import CFullLoading from '@/components/commons/loadings/Full/index.vue'

const store = useStore()
const route = useRoute()
const router = useRouter()

const { guildUserInfo } = useGuildInfoMixin()

const currentPostBoard = computed(() => store.state.guildPost.currentPostBoard)
const fullLoading = ref(true)

onMounted(async () => {
  const { postBoardId } = route.params

  fullLoading.value = true
  try {
    /* 1. Load current post board by post board id in route */
    await store.dispatch(GuildPostActionTypes.LOAD_CURRENT_BOARD, postBoardId as string)
    /*
      not allowed user for this post board
        1. if it's private post board
        2. user is in allowedUserIds variable (it's allowed)
        3. user is one of operator
    */
    if (currentPostBoard.value.setting.isPrivate
        && ((currentPostBoard.value.setting.allowUserIds
          && !currentPostBoard.value.setting.allowUserIds.includes(guildUserInfo.value.id))
          || currentPostBoard.value.setting.operatorIds.includes(guildUserInfo.value.id)
        )
    ) {
      throw new Error('Not allowed!')
    }
    /* 2. Load post notice list by board id */
    await store.dispatch(GuildPostActionTypes.LOAD_POST_NOTICE_LIST_BY_BOARD_ID, postBoardId as string)
    /* 3. Load post list by post board id */
    await store.dispatch(GuildPostActionTypes.LOAD_POST_LIST_BY_BOARD_ID, postBoardId as string)
  } catch (e) {
    console.error(e)
    /* Back to main page */
    await router.push({ name: RouterNameEnum.GUILD_POST_MAIN })
  } finally {
    fullLoading.value = false
  }
})

onBeforeUnmount(async () => {
  try {
    fullLoading.value = true
    await store.dispatch(GuildPostActionTypes.RESET_CURRENT_BOARD)
    await store.dispatch(GuildPostActionTypes.RESET_POST_NOTICE_LIST_BY_BOARD_ID)
    await store.dispatch(GuildPostActionTypes.RESET_POST_LIST_BY_BOARD_ID)
  } catch (e) {
    console.error(e)
    await router.push({ name: RouterNameEnum.GUILD_POST_MAIN })
  } finally {
    fullLoading.value = false
  }
})
</script>
