<template>
  <ag-grid-vue
    class="ag-theme-alpine"
    :style="{
      width,
      height,
    }"
    col-resize-default="shift"
    :default-col-def="defaultColumn"
    :column-defs="columns"
    :row-data="rows"
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
      require: false,
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
    flex: {
      type: Number,
      require: false,
      default: 1,
    },
  },
  setup: (props) => {
    const defaultColumn = computed<ColDef>(() => {
      return {
        editable: props.editable,
        sortable: props.sortable,
        flex: props.flex,
        filter: props.filter,
        resizable: props.resizable,
      }
    })
    return {
      defaultColumn,
    }
  }
})
</script>
