<template>
  <div
    class="tw-text-sm tw-font-semibold"
  >
    <div
      class="tw-flex tw-items-center tw-cursor-pointer"
      @click="onClickLabel"
    >
      <slot
        name="label"
      >
        {{ label }}
      </slot>
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
    <div
      v-if="isOpen"
      class="tw-mt-1 tw-text-xs"
      :class="{
        'tw-pl-2': !flat
      }"
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
import { defineProps, onMounted, ref } from 'vue'
import CMaterialIcon from '@/components/commons/icons/Material/index.vue'

const isOpen = ref(false)

const props = defineProps({
  label: {
    type: String,
    required: false,
    default: '',
  },
  initOpenValue: {
    type: Boolean,
    required: false,
    default: false,
  },
  flat: {
    type: Boolean,
    required: false,
    default: false,
  }
})

onMounted(() => {
  isOpen.value = props.initOpenValue
})

const onClickLabel = () => {
  isOpen.value = !isOpen.value
}

</script>
