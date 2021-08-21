<template>
  <div
    v-if="guildInfo"
  >
    <!--  header  -->
    <div
      class="tw-flex"
    >
      <button
        class="btn btn-primary tw-ml-auto tw-w-24"
        type="button"
      >
        Join
      </button>
    </div>
    <div>
      {{ guildInfo }}
    </div>
    <div
      class="text-center"
    >
      <div
        class="tw-flex tw-justify-center"
      >
        <img
          class="tw-rounded-full tw-border tw-border-black tw-w-44 tw-h-44"
          :src="guildInfo.img"
          alt="logo"
        >
      </div>
      <div
        class="tw-text-xl tw-font-black"
      >
        {{ guildInfo.name }}
      </div>
      <div>
        {{ guildInfo.description }}
      </div>
      <div>
        Manager data
      </div>
    </div>
    <div>
      User List!
      <ag-grid-vue
        class="ag-theme-alpine tw-w-full tw-h-96"
        col-resize-default="shift"
        :default-col-def="defaultColumn"
        :column-defs="columns"
        :row-data="rows"
        l
      />
    </div>
    <button
      class="btn btn-primary tw-ml-auto tw-w-full"
      type="button"
    >
      Join to the {{ guildInfo.name }}
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import useStore from '@/store'
import { HomeActionTypes } from '@/store/modules/home/actions'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'
import { AgGridVue } from 'ag-grid-vue3'
import { Column } from 'ag-grid-community'

export default defineComponent({
  name: 'HomeGuildDetail',
  components: {
    AgGridVue,
  },
  setup: () => {
    const route = useRoute()
    const router = useRouter()
    const store = useStore()

    const defaultColumn = {
      resizable: true,
    }
    const columns: Array<Column> = [
      { field: 'make' },
      { field: 'model' },
      { field: 'price' },
    ]
    const rows =  [
      { make: 'Toyota', model: 'Celica', price: 35000 },
      { make: 'Ford', model: 'Mondeo', price: 32000 },
      { make: 'Porsche', model: 'Boxter', price: 72000 }
    ]

    const guildInfo = computed(() => store.state.home.guildInfo)

    onMounted(async () => {
      const guildId = route.params.id
      /* If guildId ex */
      if (guildId) {
        await store.dispatch(HomeActionTypes.LOAD_GUILD_INFO, guildId)
      } else {
        // @TODO: Redirect 404 page, but now is just send back
        router.back()
      }
    })

    return {
      defaultColumn,
      columns,
      rows,
      guildInfo
    }
  }
})
</script>
