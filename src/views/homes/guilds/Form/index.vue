<template>
  <div>
    <b-form
      ref="formRef"
      class="tw-flex tw-flex-col tw-gap-y-2"
    >
      <!--   title   -->
      <div>
        <label
          class="form-label"
        >
          Title
        </label>
        <b-base-input
          id="title"
          v-model="title"
          :rules="rules.title"
          placeholder="title"
        />
      </div>
      <!--   tags   -->
      <div>
        <label
          class="form-label"
        >
          tags
        </label>
        <div
          class="form-control"
        >
          <div>
            tag
          </div>
          <div
            contenteditable="true"
          />
        </div>
      </div>
      <!--   description   -->
      <div>
        <label
          class="form-label"
        >
          Description
        </label>
        <b-textarea
          id="description"
          v-model="description"
          :rules="rules.description"
          placeholder="description"
        />
      </div>
    </b-form>
    <hr
      class="my-2"
    >
    <!--  actions  -->
    <div
      class="tw-flex tw-gap-x-2"
    >
      <span
        class="tw-ml-auto"
      />
      <button
        v-if="currentIndex === 0"
        type="button"
        class="btn btn-outline-primary"
        @click="onClickCancelBtn"
      >
        Cancel
      </button>
      <button
        v-else
        type="button"
        class="btn btn-outline-primary"
        @click="onClickBackBtn"
      >
        Prev
      </button>
      <!--   next or save   -->
      <button
        v-if="currentIndex === 3"
        type="button"
        class="btn btn-primary"
        @click="onClickSaveBtn"
      >
        Save
      </button>
      <button
        v-else
        type="button"
        class="btn btn-primary"
        @click="onClickNextBtn"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, computed } from 'vue'
import { useRouter } from 'vue-router'
import BBaseInput from '@/components/commons/inputs/Base/index.vue'
import { RuleType } from '@/types/bootstrap/validate'
import { useI18n } from 'vue-i18n'
import BForm from '@/components/commons/Form/index.vue'
import BTextarea from '@/components/commons/inputs/Textarea/index.vue'

export default defineComponent({
  name: 'HomeGuildForm',
  components: { BTextarea, BForm, BBaseInput },
  setup: () => {
    const router = useRouter()
    const i18n = useI18n()

    const formRef = ref<InstanceType<typeof BForm> | null>(null)

    const currentIndex = ref(0)
    const title = ref('')
    const description = ref('')

    const rules: RuleType = {
      title: [
        (v: string) => !!v || i18n.t('standardRules.required', { field: 'title' }),
        (v: string) => v.length <= 20 || i18n.t('standardRules.maxLength', { length: 20 })
      ],
      description: [
        (v: string) => v.length <= 200 || i18n.t('standardRules.maxLength', { length: 200 })
      ]
    }

    const onClickSaveBtn = () => {
      if (formRef.value && formRef.value.checkValidation()) {
        alert('pass!')
      } else {
        alert('could not pass')
      }
    }

    const onClickCancelBtn = async () => {
      await router.go(-1)
    }

    const onClickNextBtn = () => {
      currentIndex.value += 1
    }

    const onClickBackBtn = () => {
      currentIndex.value -= 1
    }

    return {
      formRef,
      currentIndex,
      title,
      description,
      rules,
      onClickSaveBtn,
      onClickCancelBtn,
      onClickNextBtn,
      onClickBackBtn,
    }
  }
})
</script>
