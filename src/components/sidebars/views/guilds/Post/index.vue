<template>
  <div
    v-if="isOpenSidebar"
    class="md:tw-static md:tw-visible md:tw-bg-none md:tw-w-72 md:tw-block md:tw-border md:tw-overflow-auto tw-absolute tw-rounded-md tw-h-full tw-w-2/3 tw-z-10 p-2 tw-overflow-y-scroll"
    :class="{
      'tw-invisible':isOpenLayoutSidebar,
      'tw-bg-white': !isOpenLayoutSidebar,
    }"
  >
    <div
      class="tw-flex tw-flex-col tw-space-y-4"
    >
      <c-list-group
        v-for="boardsWithGroup in boardsWithGroups"
        :key="boardsWithGroup.id"
        :label="boardsWithGroup.name"
      >
        <ul
          class="tw-space-y-2 "
        >
          <li
            v-for="PostBoard in boardsWithGroup.PostBoards"
            :key="PostBoard.id"
            class="tw-font-normal tw-text-sm"
            @click="onClickPostBoard(PostBoard)"
          >
            {{ PostBoard.name }}
          </li>
        </ul>
      </c-list-group>
    </div>
  </div>
  <div
    v-if="isOpenSidebar"
    class="md:tw-hidden tw-opacity-50 tw-bg-gray-700 tw-h-full tw-w-1/3 md:tw-w-0 tw-z-10 tw-absolute tw-right-0"
    @click="onClickOutside"
  />
</template>
<script
    lang="ts"
>
export default {
  name: 'GuildPostViewSidebar',
}
</script>
<script setup lang="ts">
import type { GuildPostBoard } from '@/types/model/guilds/post'
import { computed } from 'vue'
import useStore from '@/store'
import { GuildPostActionTypes } from '@/store/modules/guilds/generals/posts/actions'
import CListGroup from '@/components/commons/groups/List/index.vue'
import { useRouter } from 'vue-router'
import { RouterNameEnum } from '@/types/systems/routers/keys'

const store = useStore()
const router = useRouter()

const isOpenSidebar = computed(() => store.state.guildPost.isOpenSidebar)
const isOpenLayoutSidebar = computed(() => store.state.guild.isOpenSideBar)
const boardsWithGroups = computed(() => store.state.guildPost.boardsWithGroups)

const onClickOutside = async () => {
  try {
    if (isOpenSidebar.value) {
      await store.dispatch(GuildPostActionTypes.CLOSE_SIDE_BAR)
    } else {
      await store.dispatch(GuildPostActionTypes.OPEN_SIDE_BAR)
    }
  } catch (e) {
    console.error(e)
  }
}

const onClickPostBoard = async (postBoard: GuildPostBoard) => {
  try {
    await router.push({ name: RouterNameEnum.GUILD_POST_BOARD_DETAIL, params: { postBoardId: postBoard.id } })
  } catch (e) {
    console.error(e)
  }
}

</script>
