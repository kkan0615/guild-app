<template>
  <div
    class="tw-flex tw-mb-2"
  >
    <slot
      name="prepend"
    />
    <div
      class="tw-text-lg tw-font-bold"
    >
      {{ pageName }}
    </div>
    <div
      class="tw-ml-auto"
    >
      <b-bread-crumb
        :items="breadcrumbs"
      />
      <slot
        name="append"
      />
    </div>
  </div>
</template>
<script
  lang="ts"
>
export default {
  name: 'CBaseHeader',
}
</script>
<script setup lang="ts">
import type { PropType } from 'vue'
import type { CBBreadcrumb } from '@/components/bootstraps/Breadcrumb/types'
import { defineProps } from 'vue'
import BBreadCrumb from '@/components/bootstraps/Breadcrumb/index.vue'

const props = defineProps({
  pageName: {
    type: String,
    required: false,
    default: ''
  },
  breadcrumbs: {
    type: Array as PropType<Array<CBBreadcrumb>>,
    required: false,
    default: () => [],
  }
})
</script>
