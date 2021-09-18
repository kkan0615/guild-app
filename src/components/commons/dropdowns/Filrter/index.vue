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
      <slot
        name="activator"
      >
        <span>
          Filter
        </span>
      </slot>
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
      <!--   content slot   -->
      <div
        class="tw-px-2"
      >
        <slot />
      </div>
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
          @click="onClickSearchBtn"
        >
          search
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'
import CDivider from '@/components/commons/Divider/index.vue'

export default defineComponent({
  name: 'CFilterDropdown',
  components: { CDivider },
  emits: ['click:searchBtn', 'click:filterBtn'],
  setup: (_, { emit }) => {

    const onClickFilterBtn = () => {
      emit('click:searchBtn')
    }

    const onClickSearchBtn = () => {
      emit('click:filterBtn')
    }

    return {
      onClickFilterBtn,
      onClickSearchBtn,
    }
  }
})
</script>
