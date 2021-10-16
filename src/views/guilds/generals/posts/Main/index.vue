<template>
  <div
    class="tw-w-full tw-flex tw-min-h-full"
  >
    <div
      class="md:tw-w-4/5 tw-w-full tw-min-h-full md:tw-border-r tw-px-2"
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
    <div
      class="tw-w-1/5 tw-flex-grow-0 tw-flex-shrink tw-hidden md:tw-block"
    >
      <div
        class="tw-px-2 tw-mb-2"
      >
        Notices ({{ recentNewsListAtMain.length }})
      </div>
      <main-guild-post-news
        v-for="post in recentNewsListAtMain"
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
import MainGuildPostNews from '@/views/guilds/generals/posts/Main/components/Notice.vue'

const store = useStore()

const postListAtMain = computed(() => store.state.guildPost.postListAtMain)
const recentNewsListAtMain = computed(() => store.state.guildPost.recentNewsListAtMain)

onMounted(async () => {
  try {
    await store.dispatch(GuildPostActionTypes.LOAD_POST_LIST_AT_MAIN)
    await store.dispatch(GuildPostActionTypes.LOAD_RECENT_NEWS_LIST_AT_MAIN)
  } catch (e) {
    console.error(e)
  }
})

onBeforeUnmount(async () => {
  try {
    await store.dispatch(GuildPostActionTypes.RESET_POST_LIST_AT_MAIN)
    await store.dispatch(GuildPostActionTypes.RESET_RECENT_NEWS_LIST_BY_BOARD)
  } catch (e) {
    console.error(e)
  }
})
</script>
