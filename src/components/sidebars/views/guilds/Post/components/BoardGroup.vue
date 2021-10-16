<template>
  <c-list>
    <c-list-item
      disable-hover
      class="tw-flex"
    >
      <div
        class="tw-ml-auto tw-flex tw-space-x-2"
      >
        <b-tooltip
          data-bs-toggle="dropdown"
          title="edit"
          placement="bottom"
        >
          <c-material-icon
            class="tw-text-sm text-primary"
            clickable
            @click="onClickEditBtn"
          >
            edit
          </c-material-icon>
        </b-tooltip>
        <b-tooltip
          data-bs-toggle="dropdown"
          title="delete"
          placement="bottom"
        >
          <c-material-icon
            class="tw-text-sm text-danger"
            clickable
            @click="onClickDeleteBtn"
          >
            delete
          </c-material-icon>
        </b-tooltip>
      </div>
    </c-list-item>
    <guild-post-view-sidebar-board
      v-for="PostBoard in boardGroupWithBoards.PostBoards"
      :key="PostBoard.id"
      :post-board="PostBoard"
    />
    <c-list-item>
      <c-b-button
        class="btn-sm btn-outline-primary"
        @click="onClickNewPostBoardAtGroupBtn"
      >
        <c-material-icon
          left
        >
          add
        </c-material-icon>
        New board
      </c-b-button>
    </c-list-item>
  </c-list>
</template>
<script
    lang="ts"
>
export default {
  name: 'GuildPostViewSidebarBoardGroup',
}
</script>
<script setup lang="ts">
import type { PropType } from 'vue'
import type { GuildPostBoardGroupWithBoards } from '@/types/model/guilds/post'
import { computed, defineProps, ref } from 'vue'
import CList from '@/components/commons/List/index.vue'
import CListItem from '@/components/commons/List/components/Item.vue'
import CBButton from '@/components/bootstraps/Button/index.vue'
import CMaterialIcon from '@/components/commons/icons/Material/index.vue'
import BTooltip from '@/components/bootstraps/Tooltip/index.vue'
import useStore from '@/store'
import { RouterNameEnum } from '@/types/systems/routers/keys'
import { GuildPostActionTypes } from '@/store/modules/guilds/generals/posts/actions'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import useToast from '@/mixins/useToast'
import GuildPostViewSidebarBoard from '@/components/sidebars/views/guilds/Post/components/Board.vue'

const props = defineProps({
  boardGroupWithBoards: {
    type: Object as PropType<GuildPostBoardGroupWithBoards>,
    required: true,
    default: () => {},
  }
})

const store = useStore()
const router = useRouter()
const i18n  = useI18n()
const { addToast } = useToast()

const currentPostBoard = computed(() => store.state.guildPost.currentPostBoard)

const onClickEditBtn = async () => {
  if (props.boardGroupWithBoards) {
    try {
      await router.push({ name: RouterNameEnum.GUILD_POST_BOARD_GROUP_UPDATE_FORM, params: { postBoardGroupId: props.boardGroupWithBoards.id } })
    } catch (e) {
      console.error()
    }
  }
}

const onClickDeleteBtn = async () => {
  if (props.boardGroupWithBoards) {
    try {
      await store.dispatch(GuildPostActionTypes.DELETE_POST_BOARD_GROUP, props.boardGroupWithBoards.id)
      await store.dispatch(GuildPostActionTypes.LOAD_BOARDS_WITH_GROUPS)
      addToast({
        title: i18n.t('standards.toastTitle.saved'),
        content: i18n.t('standards.result.removed'),
        type: 'success',
      })
    } catch (e) {
      console.error(e)
      addToast({
        title: i18n.t('standards.toastTitle.failed'),
        content: i18n.t('standards.result.failed'),
        type: 'danger',
      })
    }
  }
}

const onClickNewPostBoardAtGroupBtn = async () => {
  if (props.boardGroupWithBoards) {
    try {
      await router.push({ name: RouterNameEnum.GUILD_POST_BOARD_CREATE_FORM, query: { postBoardGroupId: props.boardGroupWithBoards.id } })
    } catch (e) {
      console.error(e)
    }
  }
}
</script>
