<template>
  <div
    aria-live="polite"
    aria-atomic="true"
    class="tw-absolute tw-bottom-0 tw-right-0 tw-p-3 tw-z-10"
  >
    <div
      class="toast-container"
    >
      <b-toast
        v-for="(toast, i) in toasts"
        :key="i"
        :toast="toast"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import useStore from '@/store'
import BToast from '@/components/commons/toasts/Toast/index.vue'
import { Toast } from '@/types/systems/toast'
import { ApplicationActionTypes } from '@/store/modules/applications/actions'

export default defineComponent({
  name: 'ToastList',
  components: { BToast },
  setup: () => {
    const store = useStore()
    const toasts = ref<Array<Toast>>([])

    onMounted(() => {
      store.subscribeAction((action, state) => {
        if (action.type === ApplicationActionTypes.ADD_TOAST || action.type === ApplicationActionTypes.REMOVE_TOAST) {
          toasts.value = state.application.toasts
        }
      })
    })

    return {
      toasts
    }
  }
})
</script>
