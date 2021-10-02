<template>
  <!-- Button trigger modal -->
  <div
    data-bs-toggle="modal"
    :data-bs-target="dataBsTarget"
    @click="onClickOpenBtn"
  >
    <slot />
  </div>

  <!-- Modal -->
  <div
    :id="id"
    ref="modalRef"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="create-form-modal"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5
            id="exampleModalLabel"
            class="modal-title"
          >
            {{ type === 'CREATE' ? $t('standards.actions.create') : $t('standards.actions.edit') }}
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          />
        </div>
        <div class="modal-body">
          <b-form>
            <c-horizontal-view>
              <c-horizontal-view-label
                required
              >
                {{ $t('types.models.guilds.notice.fields.title') }}
              </c-horizontal-view-label>
              <c-horizontal-view-content>
                <b-base-input
                  id="notice-title-input"
                  v-model="title"
                />
              </c-horizontal-view-content>
            </c-horizontal-view>
            <c-horizontal-view>
              <c-horizontal-view-label>
                {{ $t('types.models.guilds.notice.fields.content') }}
              </c-horizontal-view-label>
              <c-horizontal-view-content>
                <!--                <c-base-tiptap-->
                <!--                  id="notice-content-input"-->
                <!--                  v-model="content"-->
                <!--                  class="tw-h-56"-->
                <!--                />-->
                <b-textarea
                  id="notice-content-textarea"
                  v-model="content"
                />
              </c-horizontal-view-content>
            </c-horizontal-view>
            <c-horizontal-view>
              <c-horizontal-view-label
                required
              >
                {{ $t('types.models.guilds.calendar.fields.color') }}
              </c-horizontal-view-label>
              <c-horizontal-view-content>
                <c-multiple-select
                  id="notice-name-input"
                  v-model="color"
                  :options="lightTextBgColors"
                >
                  <template
                    #singlelabel="{ value }"
                  >
                    <div
                      class="multiselect-single-label"
                    >
                      <span
                        class="tw-w-4 tw-h-4 tw-mr-2 tw-rounded-full"
                        :style="{
                          'background-color': value,
                        }"
                      />
                      {{ value }}
                    </div>
                  </template>
                  <template
                    #option="{ option }"
                  >
                    <span
                      class="tw-w-4 tw-h-4 tw-mr-2 tw-rounded-full"
                      :style="{
                        'background-color': option.value,
                      }"
                    />
                    {{ option.label }}
                  </template>
                </c-multiple-select>
              </c-horizontal-view-content>
            </c-horizontal-view>
            <c-horizontal-view>
              <c-horizontal-view-label />
              <c-horizontal-view-content>
                <b-checkbox
                  id="notice-endDate-checkbox"
                  v-model="isFiniteEndDate"
                  label="Infinite"
                />
              </c-horizontal-view-content>
            </c-horizontal-view>
            <c-horizontal-view
              v-if="!isFiniteEndDate"
            >
              <c-horizontal-view-label
                required
              >
                {{ $t('types.models.guilds.notice.fields.endDate') }}
              </c-horizontal-view-label>
              <c-horizontal-view-content>
                <b-base-input
                  id="notice-endDate-input"
                  v-model="endDate"
                  type="datetime-local"
                  :min="today"
                />
              </c-horizontal-view-content>
            </c-horizontal-view>
          </b-form>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn"
            data-bs-dismiss="modal"
          >
            {{ $t('standardBtnLabels.cancel') }}
          </button>
          <button
            type="button"
            class="btn btn-primary"
            @click="onClickSaveBtn"
          >
            {{ $t('standardBtnLabels.save') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script
    lang="ts"
>
export default {
  name: 'MainGuildNoticeForm',
}
</script>
<script setup lang="ts">
import type { GuildNotice, GuildNoticeCreatForm, GuildNoticeUpdateForm } from '@/types/model/guilds/notice'
import type { PropType } from 'vue'
import { computed, defineProps, onBeforeUnmount, onMounted, ref } from 'vue'
import BForm from '@/components/commons/Form/index.vue'
import CHorizontalView from '@/components/commons/HorizontalView/index.vue'
import CHorizontalViewLabel from '@/components/commons/HorizontalView/components/Label.vue'
import CHorizontalViewContent from '@/components/commons/HorizontalView/components/Content.vue'
import BBaseInput from '@/components/commons/inputs/Base/index.vue'
import dayjs from 'dayjs'
import { DATETIME_LOCAL_FORMAT } from '@/types/systems/date'
import BCheckbox from '@/components/commons/inputs/Checkbox/index.vue'
import CBaseTiptap from '@/components/commons/inputs/tiptaps/Base/index.vue'
import BTextarea from '@/components/commons/inputs/Textarea/index.vue'
import useStore from '@/store'
import useToast from '@/mixins/useToast'
import { GuildNoticeActionTypes } from '@/store/modules/guilds/generals/notices/actions'
import { Modal as BModalRef } from 'bootstrap'
import { useI18n } from 'vue-i18n'
import CMultipleSelect from '@/components/commons/inputs/Tags/index.vue'
import { lightTextBgColors } from '@/data/color'

const props = defineProps({
  id: {
    type: String,
    required: false,
    default: 'create-form-modal',
  },
  notice: {
    type: Object as PropType<GuildNotice>,
    required: false,
    default: () => {}
  },
  type: {
    type: String as PropType<'CREATE' | 'UPDATE'>,
    required: false,
    default: 'CREATE'
  },
})

const store = useStore()
const i18n = useI18n()
const { addToast } = useToast()

const bootstrapModalRef = ref<BModalRef>(undefined)
const modalRef = ref<HTMLDivElement>(undefined)
const title = ref('')
const content = ref('')
const color = ref('')
const isFiniteEndDate = ref(true)
const endDate = ref(dayjs().format(DATETIME_LOCAL_FORMAT))

const dataBsTarget = computed(() => `#${props.id}`)
const today = computed(() => dayjs().format(DATETIME_LOCAL_FORMAT))

onMounted(() => {
  if (!bootstrapModalRef.value && modalRef.value) {
    bootstrapModalRef.value = new BModalRef(modalRef.value as HTMLDivElement)
    modalRef.value.addEventListener('hide.bs.modal', onHideModal)
  }
})

onBeforeUnmount(() => {
  if (bootstrapModalRef.value && modalRef.value) {
    bootstrapModalRef.value.dispose()
    modalRef.value.removeEventListener('hide.bs.modal', onHideModal)
  }
})

const initData = () => {
  if (props.notice) {
    title.value = props.notice.title
    content.value = props.notice.content || ''
    color.value = props.notice.color
    endDate.value = dayjs(props.notice.endDate).format(DATETIME_LOCAL_FORMAT)
    if (!props.notice.endDate) {
      isFiniteEndDate.value = true
    } else {
      isFiniteEndDate.value = false
    }
  }
}

const resetData = () => {
  title.value = ''
  content.value = ''
  color.value = ''
  isFiniteEndDate.value = true
  endDate.value = dayjs().format(DATETIME_LOCAL_FORMAT)
}

const onClickSaveBtn = async () => {
  let isSuccess = false
  /* If this form is for create */
  if (props.type === 'CREATE') {
    const payload: GuildNoticeCreatForm = {
      title: title.value,
      content: content.value,
      color: color.value,
      endDate: isFiniteEndDate.value ? undefined  : endDate.value,
    }

    try {
      await store.dispatch(GuildNoticeActionTypes.CREATE_NOTICE, payload)
      addToast({
        title: i18n.t('standardToastTitle.saved'),
        content: i18n.t('standardResult.created'),
        type: 'success',
      })

      isSuccess = true
    } catch (e) {
      console.error(e)
      addToast({
        title: i18n.t('standardToastTitle.failed'),
        content: i18n.t('standardResult.failed'),
        type: 'danger',
      })
    }
  } else {
    /* Id should be existed */
    if (props.notice && props.notice.id) {
      const payload: GuildNoticeUpdateForm = {
        id: props.notice.id,
        title: title.value,
        content: content.value,
        color: color.value,
        endDate: isFiniteEndDate.value ? undefined  : endDate.value,
      }

      try {
        await store.dispatch(GuildNoticeActionTypes.UPDATE_NOTICE, payload)
        addToast({
          title: i18n.t('standardToastTitle.saved'),
          content: i18n.t('standardResult.updated'),
          type: 'success',
        })

        isSuccess = true
      } catch (e) {
        console.error(e)
        addToast({
          title: i18n.t('standardToastTitle.failed'),
          content: i18n.t('standardResult.failed'),
          type: 'danger',
        })
      }
    } else {
      console.error('error')
    }
  }

  /* After it's success */
  if (isSuccess) {
    try {
      if (bootstrapModalRef.value) {
        bootstrapModalRef.value.toggle()
      }
      await store.dispatch(GuildNoticeActionTypes.LOAD_NOTICE_LIST)
    } catch (e) {
      console.error(e)
    }
  }
}

const onClickOpenBtn = () => {
  initData()
}

const onHideModal = () => {
  resetData()
}

</script>
