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
          title
        </c-horizontal-view-label>
        <c-horizontal-view-content>
          <b-base-input
            id="post-title-input"
            v-model="title"
            placeholder="title"
          />
        </c-horizontal-view-content>
      </c-horizontal-view>
      <div
        class="container"
      >
        <c-base-tiptap
          id="post-content-tiptap"
          v-model="content"
        />
      </div>
      <b-checkbox
        id="post-is-notice-input"
        v-model="isNotice"
        label="Notice post"
      />
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
  name: 'PostFromGuildPost',
}
</script>
<script setup lang="ts">
import type {
  GuildPostCreateForm,
  GuildPostUpdateForm
} from '@/types/model/guilds/post'
import { RouterNameEnum } from '@/types/systems/routers/keys'
import { GuildPostActionTypes } from '@/store/modules/guilds/generals/posts/actions'
import BForm from '@/components/commons/Form/index.vue'
import CContentLayout from '@/components/commons/layouts/Content/index.vue'
import CContentLayoutHeader from '@/components/commons/layouts/Content/components/Header.vue'
import CHorizontalView from '@/components/commons/HorizontalView/index.vue'
import CHorizontalViewLabel from '@/components/commons/HorizontalView/components/Label.vue'
import CHorizontalViewContent from '@/components/commons/HorizontalView/components/Content.vue'
import BBaseInput from '@/components/commons/inputs/Base/index.vue'
import CBButton from '@/components/bootstraps/Button/index.vue'
import CMaterialIcon from '@/components/commons/icons/Material/index.vue'
import useStore from '@/store'
import { useRoute, useRouter } from 'vue-router'
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import BCheckbox from '@/components/commons/inputs/Checkbox/index.vue'
import CBaseTiptap from '@/components/commons/inputs/tiptaps/Base/index.vue'

const store = useStore()
const route = useRoute()
const router = useRouter()

const formRef = ref<InstanceType<typeof BForm>>()
const title = ref('')
const content = ref('')
const isNotice = ref(false)
const postBoardId = ref('')

const currentPost = computed(() => store.state.guildPost.currentPost)

onMounted(async () => {
  if (route.name === RouterNameEnum.GUILD_POST_UPDATE_FORM) {
    const { postBoardGroupId } = route.params
    try {
      /* 1. load post board group info by id */
      await store.dispatch(GuildPostActionTypes.LOAD_CURRENT_POST_BOARDS_WITH_GROUPS, postBoardGroupId as string)
      /* 2. initialize data */
      initData()
    } catch (e) {
      console.error(e)
    }
  } else {
    postBoardId.value = route.query.postBoardId as string || ''
  }

  /* Load current post board */
  if (postBoardId.value) {
    await store.dispatch(GuildPostActionTypes.LOAD_CURRENT_BOARD, postBoardId.value)
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
  if (currentPost.value) {
    title.value = currentPost.value.title
    content.value = currentPost.value.content || ''
  }
}

const onClickSaveBtn = async () => {
  if (formRef.value && formRef.value?.checkValidation()) {
    if (route.name === RouterNameEnum.GUILD_POST_BOARD_GROUP_UPDATE_FORM) {
      try {
        await store.dispatch(GuildPostActionTypes.UPDATE_POST, {
          id: currentPost.value.id,
          title: title.value,
          postBoardId: postBoardId.value,
          content: content.value,
          isNotice: isNotice.value,
        } as GuildPostUpdateForm)
        await store.dispatch(GuildPostActionTypes.LOAD_BOARDS_WITH_GROUPS)
        await router.push({ name: RouterNameEnum.GUILD_POST_DETAIL, params: { postId: currentPost.value.id } })
      } catch (e) {
        console.error(e)
      }
    } else {
      try {
        const newPostId = await store.dispatch(GuildPostActionTypes.CREATE_POST, {
          title: title.value,
          postBoardId: postBoardId.value,
          content: content.value,
          isNotice: isNotice.value,
        } as GuildPostCreateForm)
        await store.dispatch(GuildPostActionTypes.LOAD_BOARDS_WITH_GROUPS)
        await router.push({ name: RouterNameEnum.GUILD_POST_DETAIL, params: { postId: newPostId } })
      } catch (e) {
        console.error(e)
      }
    }
  }
}

const onClickBackBtn = async () => {
  try {
    await router.push({ name: RouterNameEnum.GUILD_POST_BOARD_DETAIL, params: { postBoardId: postBoardId.value } })
  } catch (e) {
    console.error(e)
  }
}
</script>
