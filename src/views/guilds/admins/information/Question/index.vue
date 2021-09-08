<template>
  <div
    class="md:tw-w-1/2 tw-w-full"
  >
    <div>
      Questions
    </div>
    <b-form>
      <div>
        <b-checkbox
          id="is-require-permission"
          v-model="isRequirePermission"
          type="checkbox"
          label="require permission"
        />
      </div>
      <draggable
        v-model="questions"
        item-key="key"
      >
        <template
          #item="{ element, index }"
        >
          <question-information-guild-admin-question
            v-model="element.question"
            class="tw-my-2"
            :num="index + 1"
            :question="element"
          />
        </template>
      </draggable>
      <button
        class="btn btn-primary btn-sm tw-w-full mt-2"
        type="button"
        @click="onClickAddQuestionBtn"
      >
        +
      </button>
    </b-form>
    <c-divider
      class="tw-my-4"
    />
    <div
      class="tw-flex tw-gap-x-2"
    >
      <span
        class="tw-ml-auto"
      />
      <button
        type="button"
        class="btn btn-primary"
        @click="onClickSaveBtn"
      >
        <c-spinner-icon
          v-if="editBtnLoading"
        />
        <span
          v-else
        >
          {{ $t('standardBtnLabels.edit') }}
        </span>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, onMounted } from 'vue'
import QuestionInformationGuildAdminQuestion from '@/views/guilds/admins/information/Question/components/Question.vue'
import BForm from '@/components/commons/Form/index.vue'
import BCheckbox from '@/components/commons/inputs/Checkbox/index.vue'
import useGuildInfoMixin from '@/mixins/useGuildInfoMixin'
import CDivider from '@/components/commons/Divider/index.vue'
import { GuildJoinQuestionForm } from '@/types/model/guilds/question'
import draggable from 'vuedraggable'
import useToast from '@/mixins/useToast'
import useStore from '@/store'
import { GuildActionTypes } from '@/store/modules/guilds/info/actions'
import CSpinnerIcon from '@/components/commons/icons/Spinner/index.vue'

export default defineComponent({
  name: 'QuestionInformationGuildAdmin',
  components: { CSpinnerIcon, CDivider, BCheckbox, BForm, QuestionInformationGuildAdminQuestion, draggable },
  setup: () => {
    const store = useStore()
    const { guildInfo } = useGuildInfoMixin()
    const { addToast } = useToast()

    const isRequirePermission = ref(false)
    const questions = ref<Array<GuildJoinQuestionForm>>([])
    const editBtnLoading = ref(false)

    onMounted(() => {
      isRequirePermission.value = guildInfo.value.isRequirePermission
      questions.value = guildInfo.value.joinQuestions
        ? guildInfo.value.joinQuestions.map((jq, index) => {
          return {
            key: index,
            status: 'UPDATE',
            question: jq.question,
          }
        })
        : []
    })

    /**
     * Save button click event
     */
    const onClickSaveBtn = async () => {
      editBtnLoading.value = true
      try {
        await store.dispatch(GuildActionTypes.UPDATE_GUILD_QUESTIONS, questions.value.map((question, i) => {
          return {
            ...question,
            index: i,
          }
        }))
        addToast({
          title: 'onClickSaveBtn',
          content: 'onClickSaveBtn',
          type: 'error',
        })
        editBtnLoading.value = false
      } catch (e) {
        console.error(e)
        addToast({
          title: 'Error',
          content: 'Error',
          type: 'error',
        })
        editBtnLoading.value = false
      }
    }

    const onClickAddQuestionBtn = () => {
      questions.value.push({
        key: questions.value.length,
        question: '',
        status: 'CREATE',
      } as GuildJoinQuestionForm)
    }

    return {
      isRequirePermission,
      questions,
      editBtnLoading,
      onClickSaveBtn,
      onClickAddQuestionBtn,
    }
  }
})
</script>
