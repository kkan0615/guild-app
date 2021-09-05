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
      class="dropdown-menu tw-w-72"
    >
      <div
        class="tw-px-2"
      >
        Filter
      </div>
      <c-divider
        class="my-2"
      />
      <b-form
        class="tw-p-2"
      >
        <!--    Name    -->
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
        <!--   tags   -->
        <div>
          <label
            class="form-label"
          >
            tags
          </label>
          <c-multiple-select
            id="tags"
            v-model="tags"
            placeholder="tags"
            :options="tagOptions"
            searchable
            :close-on-select="false"
            mode="tags"
          />
        </div>
      </b-form>
      <c-divider
        class="tw-my-2"
      />
      <!--  actions    -->
      <div
        class="tw-px-2"
      >
        <button
          class="btn btn-primary btn-sm mt-2 tw-w-full"
          type="button"
        >
          search
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, PropType } from 'vue'
import { GuildListFilterQuery } from '@/types/model/guilds'
import BForm from '@/components/commons/Form/index.vue'
import BBaseInput from '@/components/commons/inputs/Base/index.vue'
import CDivider from '@/components/commons/Divider/index.vue'
import CMultipleSelect from '@/components/commons/inputs/Tags/index.vue'
import { dummyGuildTags } from '@/dummy/guilds/tag'
import useStore from '@/store'
import { HomeActionTypes } from '@/store/modules/home/actions'

export default defineComponent({
  name: 'GuildListFilter',
  components: { CMultipleSelect, CDivider, BBaseInput, BForm },
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
    const store = useStore()

    const name = ref('')
    const tags = ref<Array<string>>([])

    // @TODO: Consider how to save control common code
    const tagOptions = dummyGuildTags.map(tag => {
      return { value: tag.uid, label: tag.name }
    })

    const onClickFilterBtn = async () => {
      await store.dispatch(HomeActionTypes.SET_GUILD_LIST_FILTER_OPTION, {
        ...store.state.home.guildListFilterOption,
        name: name.value,
        tags: tags.value,
      })
      await store.dispatch(HomeActionTypes.OPEN_GUILD_LIST_LOADING)
      await store.dispatch(HomeActionTypes.LOAD_GUILD_LIST)
      await store.dispatch(HomeActionTypes.CLOSE_GUILD_LIST_LOADING)
    }

    return {
      name,
      tags,
      tagOptions,
      onClickFilterBtn,
    }
  }
})
</script>
