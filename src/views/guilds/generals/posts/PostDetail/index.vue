<template>
  <c-content-layout>
    <!--  headers  -->
    <c-content-layout-header
      @click:backBtn="onClickBackBtn"
    >
      <template
        #end
      >
        <c-material-icon
          v-if="hasEditPermission"
          class="tw-text-xl"
          clickable
          @click="onClickEditBtn"
        >
          edit
        </c-material-icon>
        <c-material-icon
          v-if="hasDeletePermission"
          class="tw-text-xl tw-text-red-500"
          clickable
          @click="onClickDeleteBtn"
        >
          delete
        </c-material-icon>
      </template>
    </c-content-layout-header>
    <div
      class="custom-container"
    >
      <div
        class="tw-text-2xl tw-font-bold"
      >
        {{ currentPost.title }}
      </div>
      <div
        class="tw-flex tw-text-sm tw-mt-1"
      >
        <!--    Creator    -->
        <div
          v-if="currentPost.Creator"
        >
          <div
            class="tw-flex tw-items-center"
          >
            <t-avatar
              class="tw-mr-2"
              :size="7"
              :name="currentPost.Creator.nickname"
              :src="currentPost.Creator.img"
            />
            {{ currentPost.Creator.nickname }}
          </div>
        </div>
        <!--    Last updatedAt    -->
        <div
          class="tw-ml-auto"
        >
          {{ formattedLastUpdatedAt }}
        </div>
      </div>
      <c-divider
        class="tw-my-2"
      />
      <!--   content   -->
      <div
        v-html="currentPost.content"
      />
    </div>
    <div>
      <post-detail-guild-post-comments />
    </div>
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
import { RouterNameEnum } from '@/types/systems/routers/keys'
import CMaterialIcon from '@/components/commons/icons/Material/index.vue'
import useGuildInfoMixin from '@/mixins/useGuildInfoMixin'
import CDivider from '@/components/commons/Divider/index.vue'
import dayjs from 'dayjs'
import TAvatar from '@/components/tailwinds/Avatar/index.vue'
import PostDetailGuildPostComments from '@/views/guilds/generals/posts/PostDetail/components/Comments.vue'

const store = useStore()
const route = useRoute()
const router = useRouter()
const { guildUserInfo } = useGuildInfoMixin()

const currentPostBoard = computed(() => store.state.guildPost.currentPostBoard)
const currentPost = computed(() => store.state.guildPost.currentPost)
const hasEditPermission = computed(() => currentPost.value.creatorId === guildUserInfo.value.id)
const hasDeletePermission = computed(() => currentPost.value.creatorId === guildUserInfo.value.id)
const formattedLastUpdatedAt = computed(() => {
  let result = ''
  const dayjsUpdatedAt = dayjs(currentPost.value.updatedAt)
  const now = dayjs()

  if (dayjsUpdatedAt.diff(now, 'day') <= 7) {
    result = dayjsUpdatedAt.fromNow()
  } else {
    result = dayjsUpdatedAt.format('ll')
  }

  return result
})

onMounted(async () => {
  const { postId } = route.params
  try {
    /* Load current post */
    await store.dispatch(GuildPostActionTypes.LOAD_CURRENT_POST, postId as string)
    /* Load current post board from post board id */
    await store.dispatch(GuildPostActionTypes.LOAD_CURRENT_BOARD, currentPost.value.postBoardId)
    /* Load comments by post id */
    await store.dispatch(GuildPostActionTypes.LOAD_COMMENT_LIST_BY_POST, currentPost.value.id)
  } catch (e) {
    console.error(e)
    await router.back()
  }
})

onBeforeUnmount(async () => {
  try {
    await store.dispatch(GuildPostActionTypes.RESET_CURRENT_POST)
    await store.dispatch(GuildPostActionTypes.RESET_COMMENT_LIST_BY_POST)
  } catch (e) {
    console.error(e)
  }
})

const onClickBackBtn = async () => {
  try {
    await router.push({ name: RouterNameEnum.GUILD_POST_BOARD_DETAIL, params: { postBoardId: currentPost.value.postBoardId } })
  } catch (e) {
    console.error(e)
  }
}

const onClickEditBtn = async () => {
  try {
    await router.push({ name: RouterNameEnum.GUILD_POST_UPDATE_FORM, params: { postId: currentPost.value.id } })
  } catch (e) {
    console.error(e)
  }
}

const onClickDeleteBtn = async () => {
  try {
    await store.dispatch(GuildPostActionTypes.DELETE_POST, currentPost.value.id)
    await router.push({ name: RouterNameEnum.GUILD_POST_BOARD_DETAIL, params: { postId: currentPost.value.id } })
  } catch (e) {
    console.error(e)
  }
}
</script>
