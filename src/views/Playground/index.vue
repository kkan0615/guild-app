<template>
  <div>
    {{ message }}
    <div>
      count: {{ count }}
    </div>
    <button
      type="button"
      class="btn btn-primary"
      @click="onClickTestBtn"
    >
      test
    </button>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, computed } from 'vue'
import useStore from '@/store'

export default defineComponent({
  name: 'Prototype',
  setup: () => {
    const store = useStore()

    const message = ref('Hello world prototype')

    const count = computed(() => store.state.user.uid)

    const onClickTestBtn = async () => {
      console.log('test')
    }

    return {
      message,
      count,
      onClickTestBtn,
    }
  }
})
</script>
