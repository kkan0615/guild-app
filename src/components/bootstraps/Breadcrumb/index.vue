<template>
  <nav aria-label="breadcrumb">
    <ol
      class="breadcrumb tw-text-sm"
    >
      <li
        v-for="(item, index) in items"
        :key="index"
        class="breadcrumb-item"
        :class="{
          'active': item.active
        }"
      >
        <router-link
          v-if="item.routerName"
          :to="{ name: item.routerName}"
        >
          {{ item.name }}
        </router-link>
        <span
          v-else
        >
          {{ item.name }}
        </span>
      </li>
    </ol>
  </nav>
</template>
<script
    lang="ts"
>
export default {
  name: 'BBreadCrumb',
}
</script>
<script setup lang="ts">
import type { PropType } from 'vue'
import type { CBBreadcrumb } from '@/components/bootstraps/Breadcrumb/types'
import { defineProps, } from 'vue'

const props = defineProps({
  items: {
    type: Array as PropType<Array<CBBreadcrumb>>,
    required: false,
    default: () => [],
  }
})
</script>
