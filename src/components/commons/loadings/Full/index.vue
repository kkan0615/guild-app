<template>
  <div
    class="tw-h-full tw-flex tw-items-center tw-justify-center"
  >
    <div
      class="tw-w-8 tw-h-8"
    >
      <c-spinner-icon />
    </div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'
import CSpinnerIcon from '@/components/commons/icons/Spinner/index.vue'

export default defineComponent({
  name: 'CFullLoading',
  components: { CSpinnerIcon },
  setup: () => {
    return {
    }
  }
})
</script>
