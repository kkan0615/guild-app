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
    row-selection="multiple"
    row-group-panel-show="always"
    pivot-panel-show="always"
    :enable-range-selection="true"
    :pagination-page-size="5"
    @rowClicked="onRowClicked"
  />
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from 'vue'
import { AgGridVue } from 'ag-grid-vue3'
import { ColDef } from 'ag-grid-community/dist/lib/entities/colDef'
import { RowClickedEvent } from 'ag-grid-community'

export default defineComponent({
  name: 'CAgGrid',
  components: {
    AgGridVue
  },
  props: {
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
  },
  emits: ['rowClicked'],
  setup: (props, { emit }) => {
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

    const onRowClicked = (event: RowClickedEvent) => {
      emit('rowClicked', event)
    }

    return {
      defaultColumn,
      onRowClicked,
    }
  }
})
</script>
