<template>
  <div>
    {{ message }}
    <div>
      count: {{ count }}
    </div>
    <button
      type="button"
      class="btn btn-primary"
      @click="onClickTestBtn"
    >
      test
    </button>
    <div
      class="toast"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      data-bs-show="true"
    >
      <div class="toast-header">
        <strong class="me-auto">Bootstrap</strong>
        <small>11 mins ago</small>
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="toast"
          aria-label="Close"
        />
      </div>
      <div class="toast-body">
        Hello, world! This is a toast message.
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, computed } from 'vue'
import useStore from '@/store'
import { confirm } from '@/mixins/useConfirmModal'
import { ApplicationActionTypes } from '@/store/modules/applications/actions'
import { Toast } from '@/types/systems/toast'

export default defineComponent({
  name: 'Prototype',
  setup: () => {
    const store = useStore()

    const message = ref('Hello world prototype')

    const count = computed(() => store.state.user.uid)

    const onClickTestBtn = async () => {
      await store.dispatch(ApplicationActionTypes.ADD_TOAST, {
        title: 'Toast test',
        content: 'content test',
        type: 'info'
      } as Toast)
    }

    return {
      message,
      count,
      onClickTestBtn,
    }
  }
})
</script>
