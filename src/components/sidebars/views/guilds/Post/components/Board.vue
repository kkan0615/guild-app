<template>
  <c-list-item
    class="tw-font-normal tw-text-sm"
    clickable
    :active="currentPostBoard && currentPostBoard.id === postBoard.id"
    @click="onClickPostBoard"
  >
    {{ postBoard.name }}
  </c-list-item>
</template>
<script
    lang="ts"
>
export default {
  name: 'GuildPostViewSidebarBoard',
}
</script>
<script setup lang="ts">
import type { PropType } from 'vue'
import type { GuildPostBoard, GuildPostBoardGroupWithBoards } from '@/types/model/guilds/post'
import { computed, defineProps, ref } from 'vue'
import CListItem from '@/components/commons/List/components/Item.vue'
import { RouterNameEnum } from '@/types/systems/routers/keys'
import useStore from '@/store'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import useToast from '@/mixins/useToast'

const store = useStore()
const router = useRouter()
const i18n  = useI18n()
const { addToast } = useToast()

const currentPostBoard = computed(() => store.state.guildPost.currentPostBoard)

const props = defineProps({
  postBoard: {
    type: Object as PropType<GuildPostBoard>,
    required: true,
    default: () => {},
  }
})

const onClickPostBoard = async () => {
  if (props.postBoard) {
    try {
      await router.push({ name: RouterNameEnum.GUILD_POST_BOARD_DETAIL, params: { postBoardId: props.postBoard.id } })
    } catch (e) {
      console.error(e)
    }
  }
}
</script>
