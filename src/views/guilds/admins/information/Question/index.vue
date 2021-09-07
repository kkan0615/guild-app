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
      <question-information-guild-admin-question
        v-for="i in 5"
        :key="i"
      />
    </b-form>
    <div
      class=" tw-flex tw-gap-x-2"
    >
      <span
        class="tw-ml-auto"
      />
      <button
        type="button"
        class="btn btn-primary"
        @click="onClickSaveBtn"
      >
        {{ $t('standardBtnLabels.edit') }}
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

export default defineComponent({
  name: 'QuestionInformationGuildAdmin',
  components: { BCheckbox, BForm, QuestionInformationGuildAdminQuestion },
  setup: () => {
    const { guildInfo } = useGuildInfoMixin()

    const isRequirePermission = ref(false)

    onMounted(() => {
      isRequirePermission.value = guildInfo.value.isRequirePermission
    })

    const onClickSaveBtn = () => {
      console.log('onClickSaveBtn')
    }

    return {
      isRequirePermission,
      onClickSaveBtn,
    }
  }
})
</script>
