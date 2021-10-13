<template>
  <c-content-layout
    class="tw-flex tw-flex-col"
  >
    <c-content-layout-header
      @click:backBtn="onClickBackBtn"
    />
    <b-form
      ref="formRef"
    >
      <c-horizontal-view>
        <c-horizontal-view-label>
          Board Group
        </c-horizontal-view-label>
        <c-horizontal-view-content>
          <c-multiple-select
            id="post-board-group-select-box"
            v-model="postBoardGroupId"
            placeholder="select board group"
            :options="boardsWithGroupsOptions"
            searchable
            :disabled="isDisablePostBoardGroup"
            :close-on-select="false"
          />
        </c-horizontal-view-content>
      </c-horizontal-view>
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
      <div
        class="tw-flex tw-items-center tw-space-x-4"
      >
        <b-checkbox
          id="calendar-is-all-targets-input"
          v-model="isAllowComment"
          label="Allow comments"
        />
        <b-checkbox
          id="calendar-is-all-targets-input"
          v-model="isPrivate"
          label="Private Board"
        />
      </div>
      <c-horizontal-view
        v-if="isPrivate"
      >
        <c-horizontal-view-label>
          Allow users
        </c-horizontal-view-label>
        <c-horizontal-view-content>
          <c-multiple-select
            id="post-board-group-select-box"
            v-model="allowUserIds"
            placeholder="select board group"
            :options="userList"
            searchable
            :close-on-select="false"
            mode="tags"
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
  name: 'PostBoardFromGuildPost',
}
</script>
<script setup lang="ts">
import type { GuildPostBoardCreateForm, GuildPostBoardUpdateForm } from '@/types/model/guilds/post'
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import CContentLayout from '@/components/commons/layouts/Content/index.vue'
import CContentLayoutHeader from '@/components/commons/layouts/Content/components/Header.vue'
import BForm from '@/components/commons/Form/index.vue'
import CHorizontalView from '@/components/commons/HorizontalView/index.vue'
import CHorizontalViewLabel from '@/components/commons/HorizontalView/components/Label.vue'
import CHorizontalViewContent from '@/components/commons/HorizontalView/components/Content.vue'
import BBaseInput from '@/components/commons/inputs/Base/index.vue'
import BTextarea from '@/components/commons/inputs/Textarea/index.vue'
import CBButton from '@/components/bootstraps/Button/index.vue'
import CMaterialIcon from '@/components/commons/icons/Material/index.vue'
import useStore from '@/store'
import { RouterNameEnum } from '@/types/systems/routers/keys'
import { GuildPostActionTypes } from '@/store/modules/guilds/generals/posts/actions'
import { useRoute, useRouter } from 'vue-router'
import useToast from '@/mixins/useToast'
import { useI18n } from 'vue-i18n'
import CMultipleSelect from '@/components/commons/inputs/Tags/index.vue'
import BCheckbox from '@/components/commons/inputs/Checkbox/index.vue'

const store = useStore()
const router = useRouter()
const route = useRoute()
const i18n = useI18n()
const { addToast } = useToast()

const formRef = ref<InstanceType<typeof BForm> | null>(null)

const name = ref('')
const description = ref('')
const isAllowComment = ref(true)
const isPrivate = ref(false)
const operatorIds = ref<Array<string>>([])
const allowUserIds = ref<Array<string>>([])
const postBoardGroupId = ref('')
const isDisablePostBoardGroup = ref(false)

const currentPostBoard = computed(() => store.state.guildPost.currentPostBoard)
const boardsWithGroupsOptions = computed(() => store.state.guildPost.boardsWithGroups.map(boardGroup => {
  return { value: boardGroup.id, label: boardGroup.name }
}))
const userList = computed(() => store.state.guildPost.userList)

onMounted(async () => {
  if (route.name === RouterNameEnum.GUILD_POST_BOARD_UPDATE_FORM) {
    const { postBoardId } = route.params
    try {
      /* 1. load post board group info by id */
      await store.dispatch(GuildPostActionTypes.LOAD_CURRENT_BOARD, postBoardId as string)
      /* 2. initialize data */
      initData()
      /* 3. disable to change */
      isDisablePostBoardGroup.value = true
    } catch (e) {
      console.error(e)
    }
  } else {
    postBoardGroupId.value = route.query.postBoardGroupId as string || ''
  }
  try {
    await store.dispatch(GuildPostActionTypes.LOAD_USER_LIST)
  } catch (e) {
    console.error(e)
  }
})

onBeforeUnmount(async () => {
  try {
    await store.dispatch(GuildPostActionTypes.RESET_CURRENT_BOARD)
    await store.dispatch(GuildPostActionTypes.RESET_USER_LIST)
  } catch (e) {
    console.error(e)
  }
})

const initData = () => {
  if (currentPostBoard.value) {
    name.value = currentPostBoard.value.name
    description.value = currentPostBoard.value.description || ''
    postBoardGroupId.value = currentPostBoard.value.postBoardGroupId
    isAllowComment.value = currentPostBoard.value.setting.isAllowComment
    isPrivate.value = currentPostBoard.value.setting.isPrivate
    operatorIds.value = currentPostBoard.value.setting.operatorIds
    allowUserIds.value = currentPostBoard.value.setting.allowUserIds || []
  }
}

const onClickSaveBtn = async () => {
  if (formRef.value && formRef.value.checkValidation()) {
    if (route.name === RouterNameEnum.GUILD_POST_BOARD_UPDATE_FORM) {
      try {
        await store.dispatch(GuildPostActionTypes.UPDATE_POST_BOARD, {
          id: currentPostBoard.value.id,
          postBoardGroupId: currentPostBoard.value.postBoardGroupId,
          name: name.value,
          description: description.value,
          isAllowComment: isAllowComment.value,
          isPrivate: isPrivate.value,
          operatorIds: operatorIds.value,
          allowUserIds: allowUserIds.value,
        } as GuildPostBoardUpdateForm)
        await store.dispatch(GuildPostActionTypes.LOAD_BOARDS_WITH_GROUPS)
        await router.push({ name: RouterNameEnum.GUILD_POST_BOARD_DETAIL, params: { postBoardId: currentPostBoard.value.id } })
        addToast({
          title: i18n.t('standards.toastTitle.saved'),
          content: i18n.t('standards.result.updated'),
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
    } else {
      try {
        const newPostBoardId = await store.dispatch(GuildPostActionTypes.CREATE_POST_BOARD, {
          name: name.value,
          description: description.value,
          isAllowComment: isAllowComment.value,
          isPrivate: isPrivate.value,
          operatorIds: operatorIds.value,
          allowUserIds: allowUserIds.value,
          postBoardGroupId: postBoardGroupId.value,
        } as GuildPostBoardCreateForm)
        await store.dispatch(GuildPostActionTypes.LOAD_BOARDS_WITH_GROUPS)
        await router.push({ name: RouterNameEnum.GUILD_POST_BOARD_DETAIL, params: { postBoardId: newPostBoardId } })
        addToast({
          title: i18n.t('standards.toastTitle.saved'),
          content: i18n.t('standards.result.created'),
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
}

const onClickBackBtn = async () => {
  try {
    await router.push({ name: RouterNameEnum.GUILD_POST_MAIN })
  } catch (e) {
    console.error(e)
  }
}
</script>
