<template>
  <span
    class="badge"
    :class="{
      [getRoleColor(params)]: true,
    }"
  >{{ getRoleName(params) }}
  </span>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ICellRendererParams } from 'ag-grid-community'
import { tailwindDefaultColors } from '@/data/color'

export default defineComponent({
  name: 'RoleColumnBadge',
  setup: () => {
    const getRoleName = (params: ICellRendererParams) => {
      return params.value
    }

    const getRoleColor = (params: ICellRendererParams) => {
      const color = params.data.role.color
      return tailwindDefaultColors.includes(color) ? `tw-bg-${color}-500` : 'tw-bg-blue-500'
    }

    return {
      getRoleName,
      getRoleColor,
    }
  }
})
</script>
