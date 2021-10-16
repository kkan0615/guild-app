<template>
  <div>
    <b-form
      ref="formRef"
    >
      <div
        class="tw-flex tw-items-center tw-h-20"
      >
        <b-textarea
          id="comment-content-input"
          v-model="content"
          height="full"
        />
        <c-b-button
          class="btn btn-primary tw-h-full tw-ml-2 tw-flex-nowrap"
          @click="onClickSaveBtn"
        >
          <c-material-icon
            class="tw-text-sm
"
            left
          >
            send
          </c-material-icon>
          send
        </c-b-button>
      </div>
    </b-form>
  </div>
</template>
<script
    lang="ts"
>
export default {
  name: 'PostDetailGuildPostCommentForm',
}
</script>
<script setup lang="ts">
import type { PropType } from 'vue'
import type {
  GuildCommentCreateForm,
  GuildCommentUpdateForm,
  GuildPostComment,
} from '@/types/model/guilds/post'
import { computed, defineEmits, defineProps, ref } from 'vue'
import BForm from '@/components/commons/Form/index.vue'
import BTextarea from '@/components/commons/inputs/Textarea/index.vue'
import CBButton from '@/components/bootstraps/Button/index.vue'
import CMaterialIcon from '@/components/commons/icons/Material/index.vue'
import useStore from '@/store'
import { GuildPostActionTypes } from '@/store/modules/guilds/generals/posts/actions'
import { useI18n } from 'vue-i18n'
import useToast from '@/mixins/useToast'

const props = defineProps({
  comment: {
    type: Object as PropType<GuildPostComment>,
    required: false,
    default: () => {}
  }
})
const emit = defineEmits(['updated:comment'])

const store = useStore()
const i18n = useI18n()
const { addToast } = useToast()

const formRef = ref<InstanceType<typeof BForm>>()
const content = ref(props.comment ? props.comment.content : '')

const currentPost = computed(() => store.state.guildPost.currentPost)

const onClickSaveBtn = async () => {
  if (formRef.value && formRef.value?.checkValidation()) {
    try {
      if (props.comment && props.comment.id) {
        await store.dispatch(GuildPostActionTypes.UPDATE_COMMENT, {
          id: props.comment.id,
          postId: props.comment.postId,
          content: content.value,
        } as GuildCommentUpdateForm)
        await store.dispatch(GuildPostActionTypes.LOAD_COMMENT_LIST_BY_POST, props.comment.postId)
        emit('updated:comment')
        addToast({
          title: i18n.t('standards.toastTitle.saved'),
          content: i18n.t('standards.result.updated'),
          type: 'success',
        })
      } else {
        await store.dispatch(GuildPostActionTypes.CREATE_COMMENT, {
          postId: currentPost.value.id,
          content: content.value,
        } as GuildCommentCreateForm)
        addToast({
          title: i18n.t('standards.toastTitle.saved'),
          content: i18n.t('standards.result.created'),
          type: 'success',
        })
        await store.dispatch(GuildPostActionTypes.LOAD_COMMENT_LIST_BY_POST, currentPost.value.id)
      }

      /* Reset content after save */
      content.value = ''
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
</script>
