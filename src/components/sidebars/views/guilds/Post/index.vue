<template>
  <div
    v-if="isOpenSidebar"
    class="md:tw-static tw-absolute tw-z-10 tw-flex tw-h-full"
  >
    <div
      class="md:tw-static md:tw-visible md:tw-bg-none md:tw-w-72 md:tw-block md:tw-border tw-overflow-auto tw-p-2 tw-w-2/3 tw-rounded-md"
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
          <guild-post-view-sidebar-board-group
            :board-group-with-boards="boardsWithGroup"
          />
        </c-list-group>
        <!-- Post board group create button -->
        <c-b-button
          class="btn btn-sm btn-outline-primary"
          @click="onClickNewPostBoardGroupBtn"
        >
          <c-material-icon
            left
          >
            add
          </c-material-icon>
          New board and group
        </c-b-button>
      </div>
    </div>
    <div
      class="md:tw-hidden tw-opacity-50 tw-bg-gray-700 tw-h-full tw-w-1/3 md:tw-w-0 tw-right-0"
      @click="onClickOutside"
    />
  </div>
</template>
<script
    lang="ts"
>
export default {
  name: 'GuildPostViewSidebar',
}
</script>
<script setup lang="ts">
import { computed } from 'vue'
import useStore from '@/store'
import { GuildPostActionTypes } from '@/store/modules/guilds/generals/posts/actions'
import CListGroup from '@/components/commons/groups/List/index.vue'
import { useRouter } from 'vue-router'
import { RouterNameEnum } from '@/types/systems/routers/keys'
import CBButton from '@/components/bootstraps/Button/index.vue'
import CMaterialIcon from '@/components/commons/icons/Material/index.vue'
import GuildPostViewSidebarBoardGroup from '@/components/sidebars/views/guilds/Post/components/BoardGroup.vue'

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

const onClickNewPostBoardGroupBtn = async () => {
  try {
    await router.push({ name: RouterNameEnum.GUILD_POST_BOARD_GROUP_CREATE_FORM })
  } catch (e) {
    console.error(e)
  }
}

</script>
