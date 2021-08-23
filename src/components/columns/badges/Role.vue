<template>
  <span
    class="badge"
    :class="{
      [`tw-bg-${params.value.color}-500`]: true,
    }"
  >{{ getRoleName(params) }}
  </span>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ICellRendererParams } from 'ag-grid-community'

export default defineComponent({
  name: 'RoleColumnBadge',
  setup: () => {
    const getRoleName = (params: ICellRendererParams) => {
      return params.value.name
    }

    return {
      getRoleName
    }
  }
})
</script>
