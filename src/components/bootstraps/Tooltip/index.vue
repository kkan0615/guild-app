<template>
  <span
    ref="tooltipRef"
    data-bs-toggle="tooltip"
    :data-bs-placement="placement"
    :title="title"
  >
    <slot />
  </span>
</template>

<script lang="ts">
import { ref, defineComponent, onMounted, onBeforeUnmount } from 'vue'
import { Tooltip as BTooltip } from 'bootstrap'

export default defineComponent({
  name: 'BTooltip',
  props: {
    title: {
      type: String,
      required: false,
      default: '',
    },
    placement: {
      type: String,
      required: false,
      default: 'top',
    },
  },
  setup: () => {
    const tooltipRef = ref<HTMLDivElement | null>(null)
    const bTooltip = ref<BTooltip | null>(null)

    onMounted(() => {
      initTooltip()
    })

    onBeforeUnmount(() => {
      destroyTooltip()
    })

    const initTooltip = () => {
      if (tooltipRef.value) {
        bTooltip.value = new BTooltip(tooltipRef.value)
      }
    }

    const destroyTooltip = () => {
      if (tooltipRef.value) {
        bTooltip.value.dispose()
        bTooltip.value = null
      }
    }

    return {
      tooltipRef,
    }
  }
})
</script>
