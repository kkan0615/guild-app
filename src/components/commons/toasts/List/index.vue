<template>
  <div
    class="tw-fixed tw-bottom-0 tw-right-0 tw-p-3 tw-z-10"
  >
    <b-toast
      v-for="(toast, i) in toasts"
      :key="i"
      :toast="toast"
    />
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, computed } from 'vue'
import useStore from '@/store'
import BToast from '@/components/commons/toasts/Toast/index.vue'

export default defineComponent({
  name: 'BToastList',
  components: { BToast },
  setup: () => {
    const store = useStore()

    const toasts = computed(() => store.state.application.snackbars)
    return {
      toasts
    }
  }
})
</script>
