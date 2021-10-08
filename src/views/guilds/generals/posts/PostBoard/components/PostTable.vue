<template>
  <c-ag-grid
    v-if="postListByBoard"
    height="800px"
    :columns="columns"
    :rows="postListByBoard"
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
import { computed, ref } from 'vue'
import CAgGrid from '@/components/commons/AgGrid/index.vue'
import useStore from '@/store'
import { postInfoColumn } from '@/types/model/guilds/post'

const store = useStore()

const columns = postInfoColumn

const postListByBoard = computed(() => store.state.guildPost.postListByBoard.map((post, index) => {
  return {
    ...post,
    index: index + 1,
  }
}))

</script>
