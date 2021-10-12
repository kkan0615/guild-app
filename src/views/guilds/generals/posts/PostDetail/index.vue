<template>
  <c-content-layout>
    <!--  headers  -->
    <c-content-layout-header />
    <div
      class="container tw-prose tw-mx-auto"
      v-html="currentPost.content"
    />
  </c-content-layout>
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
import CContentLayout from '@/components/commons/layouts/Content/index.vue'
import CContentLayoutHeader from '@/components/commons/layouts/Content/components/Header.vue'

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
    await router.back()
  }
})

onBeforeUnmount(async () => {
  try {
    await store.dispatch(GuildPostActionTypes.RESET_CURRENT_POST)
  } catch (e) {
    console.error(e)
  }
})

</script>
