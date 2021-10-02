<template>
  <div>
    {{ message }}
    <div>
      count: {{ count }}
    </div>
    <b-base-input
      id="test-name-input"
      v-model="field"
    />
    <div
      class="tw-flex tw-space-x-4"
    >
      <button
        type="button"
        class="btn btn-primary"
        @click="onClickTestBtn"
      >
        test
      </button>
      <b-tooltip
        title="Tooltip on top"
      >
        <button
          type="button"
          class="btn btn-primary"
          @click="onClickTest2Btn"
        >
          test2
        </button>
      </b-tooltip>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, computed } from 'vue'

import useStore from '@/store'
import BBaseInput from '@/components/commons/inputs/Base/index.vue'
import BTooltip from '@/components/bootstraps/Tooltip/index.vue'
import useToast from '@/mixins/useToast'

export default defineComponent({
  name: 'Prototype',
  components: { BTooltip, BBaseInput },
  setup: () => {
    const store = useStore()
    const { addToast } = useToast()

    const message = ref('Hello world prototype')
    const field = ref('test ')

    const count = computed(() => store.state.user.id)

    const onClickTestBtn = async () => {
      addToast({
        title: 'test',
        content: 'testing...',
        type: 'warning',
      })
    }

    const onClickTest2Btn = async () => {
      console.log('onClickTest2Btn')
    }

    return {
      message,
      field,
      count,
      onClickTestBtn,
      onClickTest2Btn,
    }
  }
})
</script>
