<template>
  <c-full-loading
    v-if="fullLoading"
  />
  <c-content-layout
    v-else
  >
    <c-content-layout-header>
      <template
        #end
      >
        <c-material-icon
          v-if="hasPermission"
          class="tw-text-xl"
          clickable
          @click="onClickEditBtn"
        >
          edit
        </c-material-icon>
        <c-material-icon
          v-if="hasPermission"
          class="tw-text-xl"
          clickable
          @click="onClickDeleteBtn"
        >
          delete
        </c-material-icon>
      </template>
    </c-content-layout-header>
    <post-board-post-board-info />
    <div
      class="tw-flex tw-flex-col tw-space-y-2"
    >
      <div
        class="tw-mt-2"
      >
        <c-b-button
          class="tw-ml-auto btn btn-primary"
          @click="onClickNewPostBtn"
        >
          <c-material-icon
            clickable
            left
          >
            add
          </c-material-icon>
          new post
        </c-b-button>
      </div>
      <c-list-group
        v-if="postNoticeListByBoard.length"
        flat
        :init-open-value="true"
      >
        <template
          #label
        >
          <c-title-typo>
            Notices
          </c-title-typo>
        </template>
        <post-board-post-post-notice-table />
      </c-list-group>
      <c-list-group
        v-if="postNoticeListByBoard.length"
        flat
        :init-open-value="true"
      >
        <template
          #label
        >
          <c-title-typo>
            Posts
          </c-title-typo>
        </template>
        <post-board-post-post-table />
      </c-list-group>
    </div>
  </c-content-layout>
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
import PostBoardPostPostNoticeTable from '@/views/guilds/generals/posts/PostBoard/components/PostNoticeTable.vue'
import CTitleTypo from '@/components/commons/typographies/Title/index.vue'
import CContentLayout from '@/components/commons/layouts/Content/index.vue'
import CContentLayoutHeader from '@/components/commons/layouts/Content/components/Header.vue'
import CMaterialIcon from '@/components/commons/icons/Material/index.vue'
import CListGroup from '@/components/commons/groups/List/index.vue'
import CBButton from '@/components/bootstraps/Button/index.vue'

const store = useStore()
const route = useRoute()
const router = useRouter()

const { guildUserInfo } = useGuildInfoMixin()

const fullLoading = ref(true)

const currentPostBoard = computed(() => store.state.guildPost.currentPostBoard)
const hasPermission = computed(() => {
  let result = false
  const setting = currentPostBoard.value.setting
  if (setting) {
    if (!setting.isPrivate || setting.operatorIds.includes(guildUserInfo.value.id)) {
      result = true
    }
  }

  return result
})
const postNoticeListByBoard = computed(() => store.state.guildPost.postNoticeListByBoard)

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

const onClickEditBtn = async () => {
  try {
    await router.push({ name: RouterNameEnum.GUILD_POST_BOARD_UPDATE_FORM, params: { postBoardId: currentPostBoard.value.id } })
  } catch (e) {
    console.error(e)
  }
}

const onClickDeleteBtn = async () => {
  console.log('onClickDeleteBtn')
}

const onClickNewPostBtn = async () => {
  try {
    await router.push({ name: RouterNameEnum.GUILD_POST_CREATE_FORM })
  } catch (e) {
    console.error(e)
  }
}

</script>
