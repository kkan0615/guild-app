<template>
  <c-ag-grid
    v-if="postListByBoard"
    height="800px"
    theme="ag-theme-balham"
    :columns="columns"
    :rows="postListByBoard"
    @rowClicked="onRowClicked"
  />
</template>
<script
    lang="ts"
>
export default {
  name: 'PostBoardPostPostTable',
}
</script>
<script setup lang="ts">
import type { GuildPostInfo } from '@/types/model/guilds/post'
import { computed, ref } from 'vue'
import CAgGrid from '@/components/commons/AgGrid/index.vue'
import useStore from '@/store'
import { postInfoColumn } from '@/types/model/guilds/post'
import { RowClickedEvent } from 'ag-grid-community'
import { useRouter } from 'vue-router'
import { RouterNameEnum } from '@/types/systems/routers/keys'

const store = useStore()
const router = useRouter()

const columns = postInfoColumn

const postListByBoard = computed(() => store.state.guildPost.postListByBoard.map((post, index) => {
  return {
    ...post,
    index: index + 1,
  }
}))

const onRowClicked = async (event: RowClickedEvent) => {
  const data = event.data as GuildPostInfo

  /* Go to post detail page */
  try {
    await router.push({ name: RouterNameEnum.GUILD_POST_DETAIL, params: { postId: data.id } })
  } catch (e) {
    console.error(e)
  }
}

</script>
