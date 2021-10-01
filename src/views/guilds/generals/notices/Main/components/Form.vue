<template>
  <!-- Button trigger modal -->
  <button
    type="button"
    class="btn btn-primary"
    data-bs-toggle="modal"
    :data-bs-target="dataBsTarget"
  >
    <slot />
  </button>

  <!-- Modal -->
  <div
    :id="id"
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
            Modal title
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
                title
              </c-horizontal-view-label>
              <c-horizontal-view-content>
                <b-base-input
                  id="notice-title-input"
                />
              </c-horizontal-view-content>
            </c-horizontal-view>
            <c-horizontal-view>
              <c-horizontal-view-label
                required
              >
                content
              </c-horizontal-view-label>
              <c-horizontal-view-content>
                <c-base-tiptap
                  id="notice-content-input"
                  v-model="content"
                  class="tw-h-56"
                />
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
                endDate
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
import { computed, defineProps, ref } from 'vue'
import BForm from '@/components/commons/Form/index.vue'
import CHorizontalView from '@/components/commons/HorizontalView/index.vue'
import CHorizontalViewLabel from '@/components/commons/HorizontalView/components/Label.vue'
import CHorizontalViewContent from '@/components/commons/HorizontalView/components/Content.vue'
import BBaseInput from '@/components/commons/inputs/Base/index.vue'
import { v4 } from 'uuid'
import dayjs from 'dayjs'
import { DATETIME_LOCAL_FORMAT } from '@/types/systems/date'
import BCheckbox from '@/components/commons/inputs/Checkbox/index.vue'
import CBaseTiptap from '@/components/commons/inputs/tiptaps/Base/index.vue'

const props = defineProps({
  id: {
    type: String,
    required: false,
    default: 'create-form-modal',
  },
})

const title = ref('')
const content = ref('')
const isFiniteEndDate = ref(false)
const endDate = ref(dayjs().format(DATETIME_LOCAL_FORMAT))

const dataBsTarget = computed(() => `#${props.id}`)
const today = computed(() => dayjs().format(DATETIME_LOCAL_FORMAT))

const onClickSaveBtn = () => {
  console.log('content', content.value)
  console.log(endDate.value)
  console.log('today', today.value)
}

</script>
