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

const store = useStore()

const columns = postInfoColumn

const postListByBoard = computed(() => store.state.guildPost.postListByBoard.map((post, index) => {
  return {
    ...post,
    index: index + 1,
  }
}))

const onRowClicked = (event: RowClickedEvent) => {
  console.log('onRowClicked', event)
  const data = event.data as GuildPostInfo
  console.log('data', data)
}

</script>
