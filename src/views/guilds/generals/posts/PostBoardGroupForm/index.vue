<template>
  <c-content-layout
    class="tw-flex tw-flex-col"
  >
    <c-content-layout-header />
    <b-form>
      <c-horizontal-view>
        <c-horizontal-view-label>
          name
        </c-horizontal-view-label>
        <c-horizontal-view-content>
          <b-base-input
            id="post-board-group-name-input"
            v-model="name"
            placeholder="name"
          />
        </c-horizontal-view-content>
      </c-horizontal-view>
      <c-horizontal-view>
        <c-horizontal-view-label>
          description
        </c-horizontal-view-label>
        <c-horizontal-view-content>
          <b-textarea
            id="post-board-group-description-textarea"
            v-model="description"
            placeholder="description"
          />
        </c-horizontal-view-content>
      </c-horizontal-view>
    </b-form>
    <div
      class="tw-flex tw-items-center tw-mt-auto tw-space-x-2"
    >
      <c-b-button
        class="btn btn-outline tw-ml-auto"
      >
        <c-material-icon
          left
        >
          close
        </c-material-icon>
        {{ $t('standardBtnLabels.cancel') }}
      </c-b-button>
      <c-b-button
        class="btn btn-primary"
        @click="onClickSaveBtn"
      >
        <c-material-icon
          left
        >
          save
        </c-material-icon>
        {{ $t('standardBtnLabels.save') }}
      </c-b-button>
    </div>
  </c-content-layout>
</template>
<script
    lang="ts"
>
export default {
  name: 'PostBoardFromGuildPostGroup',
}
</script>
<script setup lang="ts">
import type {
  GuildPostBoard,
  GuildPostBoardGroupCreateForm,
  GuildPostBoardGroupUpdateForm
} from '@/types/model/guilds/post'
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import useStore from '@/store'
import { useRoute } from 'vue-router'
import { RouterNameEnum } from '@/types/systems/routers/keys'
import { GuildPostActionTypes } from '@/store/modules/guilds/generals/posts/actions'
import BForm from '@/components/commons/Form/index.vue'
import CContentLayout from '@/components/commons/layouts/Content/index.vue'
import CContentLayoutHeader from '@/components/commons/layouts/Content/components/Header.vue'
import CHorizontalView from '@/components/commons/HorizontalView/index.vue'
import CHorizontalViewLabel from '@/components/commons/HorizontalView/components/Label.vue'
import CHorizontalViewContent from '@/components/commons/HorizontalView/components/Content.vue'
import BBaseInput from '@/components/commons/inputs/Base/index.vue'
import BTextarea from '@/components/commons/inputs/Textarea/index.vue'
import CBButton from '@/components/bootstraps/Button/index.vue'
import CMaterialIcon from '@/components/commons/icons/Material/index.vue'

const store = useStore()
const route = useRoute()

const name = ref('')
const description = ref('')
const boards = ref<Array<GuildPostBoard>>([])

const currentPostBoardGroup = computed(() => store.state.guildPost.currentPostBoardGroup)

onMounted(async () => {
  if (route.name === RouterNameEnum.GUILD_POST_BOARD_GROUP_UPDATE_FORM) {
    const { postBoardGroupId } = route.params
    try {
      /* 1. load post board group info by id */
      await store.dispatch(GuildPostActionTypes.LOAD_CURRENT_POST_BOARDS_WITH_GROUPS, postBoardGroupId as string)
      /* 2. initialize data */
      initData()
    } catch (e) {
      console.error(e)
    }
  }
})

onBeforeUnmount(async () => {
  try {
    await store.dispatch(GuildPostActionTypes.RESET_CURRENT_POST_BOARDS_WITH_GROUPS)
  } catch (e) {
    console.error(e)
  }
})

const initData = () => {
  if (currentPostBoardGroup.value) {
    name.value = currentPostBoardGroup.value.name
    description.value = currentPostBoardGroup.value.description || ''
  }
}

const onClickSaveBtn = async () => {
  if (route.name === RouterNameEnum.GUILD_POST_BOARD_GROUP_UPDATE_FORM) {
    try {
      await store.dispatch(GuildPostActionTypes.UPDATE_POST_BOARD_GROUP, {
        id: currentPostBoardGroup.value.id,
        name: name.value,
        description: description.value,
      } as GuildPostBoardGroupUpdateForm)
      await store.dispatch(GuildPostActionTypes.LOAD_BOARDS_WITH_GROUPS)
    } catch (e) {
      console.error(e)
    }
  } else {
    try {
      await store.dispatch(GuildPostActionTypes.CREATE_POST_BOARD_GROUP, {
        name: name.value,
        description: description.value,
      } as GuildPostBoardGroupCreateForm)
      await store.dispatch(GuildPostActionTypes.LOAD_BOARDS_WITH_GROUPS)
    } catch (e) {
      console.error(e)
    }
  }
}

</script>
