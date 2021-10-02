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
import { ApplicationMutationTypes } from '@/store/modules/applications/mutations'

export default defineComponent({
  name: 'ToastList',
  components: { BToast },
  setup: () => {
    const store = useStore()
    const toasts = ref<Array<Toast>>([])

    onMounted(() => {
      // store.subscribeAction((action, state) => {
      //   if (action.type === ApplicationActionTypes.ADD_TOAST || action.type === ApplicationActionTypes.REMOVE_TOAST) {
      //     toasts.value = state.application.toasts
      //   }
      // })
      store.subscribe((sub) => {
        if (sub.type === ApplicationMutationTypes.ADD_TOAST) {
          toasts.value.push(sub.payload)
        } else if (sub.type === ApplicationMutationTypes.REMOVE_TOAST) {
          const foundIndex = store.state.application.toasts.findIndex(toast => toast.id === sub.payload.id)
          if (foundIndex >= 0)
            toasts.value = toasts.value.splice(foundIndex, 1)
        }
      })
    })

    return {
      toasts
    }
  }
})
</script>
