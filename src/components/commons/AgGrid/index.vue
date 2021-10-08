<template>
  <ag-grid-vue
    class="ag-theme-balham"
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
  />
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from 'vue'
import { AgGridVue } from 'ag-grid-vue3'
import { ColDef } from 'ag-grid-community/dist/lib/entities/colDef'

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
      require: false,
      default: '400px',
    },
    width: {
      type: String,
      require: true,
      default: '100%',
    },
    editable: {
      type: Boolean,
      require: false,
      default: false,
    },
    sortable: {
      type: Boolean,
      require: false,
      default: true,
    },
    resizable: {
      type: Boolean,
      require: false,
      default: true,
    },
    filter: {
      type: Boolean,
      require: false,
      default: true,
    },
    suppressAutoSize: {
      type: Boolean,
      require: false,
      default: true,
    },
    isPagination: {
      type: Boolean,
      require: false,
      default: true,
    },

    flex: {
      type: [Number, undefined],
      require: false,
      default: undefined,
    },
  },
  setup: (props) => {
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
    return {
      defaultColumn,
    }
  }
})
</script>
