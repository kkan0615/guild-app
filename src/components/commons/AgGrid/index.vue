<template>
  <ag-grid-vue
    :class="{
      [`${theme}`]: true,
    }"
    :style="{
      width,
      height,
    }"
    col-resize-default="shift"
    :default-col-def="defaultColumn"
    :column-defs="columns"
    :row-data="rows"
    :pagination="isPagination"
    :row-selection="rowSelection"
    :row-group-panel-show="rowGroupPanelShow"
    :enable-range-selection="enableRangeSelection"
    :pagination-page-size="paginationPageSize"
    :pagination-auto-page-size="paginationAutoPageSize"
    pivot-panel-show="always"
    @rowClicked="onRowClicked"
  />
</template>
<script
    lang="ts"
>
export default {
  name: 'CAgGrid',
}
</script>
<script setup lang="ts">
import type { PropType } from 'vue'
import type { ColDef } from 'ag-grid-community/dist/lib/entities/colDef'
import type { RowClickedEvent } from 'ag-grid-community'
import { computed, defineProps, defineEmits } from 'vue'
import { AgGridVue } from 'ag-grid-vue3'

const props = defineProps({
  columns: {
    type: Array as PropType<Array<ColDef>>,
    required: false,
    default: () => []
  },
  rows: {
    type: Array,
    required: false,
    default: () => []
  },
  height: {
    type: String,
    required: false,
    default: '400px',
  },
  width: {
    type: String,
    required: false,
    default: '100%',
  },
  editable: {
    type: Boolean,
    required: false,
    default: false,
  },
  sortable: {
    type: Boolean,
    required: false,
    default: true,
  },
  resizable: {
    type: Boolean,
    required: false,
    default: true,
  },
  filter: {
    type: Boolean,
    required: false,
    default: true,
  },
  suppressAutoSize: {
    type: Boolean,
    required: false,
    default: true,
  },
  isPagination: {
    type: Boolean,
    required: false,
    default: true,
  },
  theme: {
    type: String,
    required: false,
    default: 'ag-theme-alpine',
  },
  paginationPageSize: {
    type: Number,
    required: false,
    default: null
  },
  flex: {
    type: Number,
    required: false,
    default: null,
  },
  rowSelection: {
    type: String,
    required: false,
    default: null
  },
  enableRangeSelection: {
    type: Boolean,
    required: false,
    default: false,
  },
  rowGroupPanelShow: {
    type: String,
    required: false,
    default: null
  },
  paginationAutoPageSize: {
    type: Boolean,
    required: false,
    default: false,
  }
})
const emits = defineEmits(['rowClicked'])

const defaultColumn = computed<ColDef>(() => {
  return {
    editable: props.editable,
    sortable: props.sortable,
    filter: props.filter,
    flex: props.flex,
    resizable: props.resizable,
    suppressAutoSize: props.suppressAutoSize,
    enableRowGroup: true,
    enablePivot: true,
  }
})

/**
 * Row click event
 * @param event
 */
const onRowClicked = (event: RowClickedEvent) => {
  emits('rowClicked', event)
}

</script>
