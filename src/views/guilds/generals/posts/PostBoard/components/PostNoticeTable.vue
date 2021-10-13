<template>
  <c-ag-grid
    v-if="postNoticeListByBoard"
    height="250px"
    theme="ag-theme-balham"
    :columns="columns"
    :rows="postNoticeListByBoard"
    :pagination-auto-page-size="true"
    @rowClicked="onRowClicked"
  />
</template>
<script
    lang="ts"
>
export default {
  name: 'PostBoardPostPostNoticeTable',
}
</script>
<script setup lang="ts">
import type { GuildPostInfo } from '@/types/model/guilds/post'
import { computed } from 'vue'
import CAgGrid from '@/components/commons/AgGrid/index.vue'
import useStore from '@/store'
import { postInfoColumn } from '@/types/model/guilds/post'
import { RowClickedEvent } from 'ag-grid-community'
import { useRouter } from 'vue-router'
import { RouterNameEnum } from '@/types/systems/routers/keys'

const store = useStore()
const router = useRouter()

const columns = postInfoColumn

const postNoticeListByBoard = computed(() => store.state.guildPost.postNoticeListByBoard.map((post, index) => {
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
