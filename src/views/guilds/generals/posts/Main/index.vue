<template>
  <div
    class="tw-p-2"
  >
    <div
      class="tw-flex tw-flex-col tw-space-y-4"
    >
      <main-guild-post-post
        v-for="post in postListAtMain"
        :key="post.id"
        :post="post"
      />
    </div>
  </div>
</template>
<script
    lang="ts"
>
export default {
  name: 'MainGuildPost',
}
</script>
<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import useStore from '@/store'
import { GuildPostActionTypes } from '@/store/modules/guilds/generals/posts/actions'
import MainGuildPostPost from '@/views/guilds/generals/posts/Main/components/Post.vue'

const store = useStore()

const postListAtMain = computed(() => store.state.guildPost.postListAtMain)

onMounted(async () => {
  try {
    await store.dispatch(GuildPostActionTypes.LOAD_POST_LIST_AT_MAIN)
  } catch (e) {
    console.error(e)
  }
})

onBeforeUnmount(async () => {
  try {
    await store.dispatch(GuildPostActionTypes.RESET_POST_LIST_AT_MAIN)
  } catch (e) {
    console.error(e)
  }
})
</script>
