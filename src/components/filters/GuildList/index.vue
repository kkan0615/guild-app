<template>
  <div>
    <!--  Filter   -->
    <button
      class="btn btn-primary dropdown-toggle"
      type="button"
      data-bs-toggle="dropdown"
      aria-expanded="false"
      @click="onClickFilterBtn"
    >
      Filter
    </button>
    <!-- @TODO: after create all remove show class  -->
    <div
      class="dropdown-menu tw-p-2 tw-w-72 show"
      aria-labelledby="dropdownMenuButton1"
    >
      <div>
        Filter
      </div>
      <c-divider
        class="my-2"
      />
      <b-form>
        <div>
          <label
            class="form-label"
          >
            Name
          </label>
          <b-base-input
            id="title"
            v-model="name"
            placeholder="Name"
          />
        </div>
      </b-form>
      <button
        class="btn btn-primary btn-sm mt-2 tw-w-full"
        type="button"
      >
        search
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, PropType } from 'vue'
import { GuildListFilterQuery } from '@/types/model/guilds'
import BForm from '@/components/commons/Form/index.vue'
import BBaseInput from '@/components/commons/inputs/Base/index.vue'
import CDivider from '@/components/commons/Divider/index.vue'

export default defineComponent({
  name: 'GuildListFilter',
  components: { CDivider, BBaseInput, BForm },
  props: {
    filter: {
      type: Object as PropType<GuildListFilterQuery>,
      required: true,
      default: () => {
        return {} as GuildListFilterQuery
      },
    }
  },
  setup: (props) => {
    const name = ref('')
    const tags = ref<Array<string>>([])

    const onClickFilterBtn = () => {
      const filterProp = props.filter as GuildListFilterQuery
      name.value = filterProp.name || ''
      tags.value = filterProp.tags || ''
    }

    return {
      name,
      tags,
      onClickFilterBtn
    }
  }
})
</script>
