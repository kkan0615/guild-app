<template>
  <div
    class="tw-text-sm tw-font-semibold"
  >
    <slot
      name="label"
    >
      <div
        class="tw-flex tw-items-center tw-cursor-pointer"
        @click="onClickLabel"
      >
        {{ label }}
        <c-material-icon
          v-if="isOpen"
          class="tw-ml-auto"
        >
          expand_less
        </c-material-icon>
        <c-material-icon
          v-else
          class="tw-ml-auto"
        >
          expand_more
        </c-material-icon>
      </div>
    </slot>
    <div
      v-if="isOpen"
      class="tw-pl-2 tw-mt-1 tw-text-xs"
    >
      <slot />
    </div>
  </div>
</template>
<script
    lang="ts"
>
export default {
  name: 'CListGroup',
}
</script>
<script setup lang="ts">
import { defineProps, ref } from 'vue'
import CMaterialIcon from '@/components/commons/icons/Material/index.vue'

const isOpen = ref(false)

const props = defineProps({
  label: {
    type: String,
    required: false,
    default: '',
  },
})

const onClickLabel = () => {
  isOpen.value = !isOpen.value
}

</script>
