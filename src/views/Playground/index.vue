<template>
  <div>
    {{ message }}
    <div>
      count: {{ count }}
    </div>
    <button
      type="button"
      class="btn btn-primary"
      @click="onClickIncrease"
    >
      onClickIncrease
    </button>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, computed } from 'vue'
import { UserActionTypes } from '@/store/modules/user/actions'
import useStore from '@/store'

export default defineComponent({
  name: 'Prototype',
  setup: () => {
    const store = useStore()

    const message = ref('Hello world prototype')

    const count = computed(() => store.state.user.uid)

    const onClickIncrease = async () => {
      await store.dispatch(UserActionTypes.LOGIN)
    }

    return {
      message,
      count,
      onClickIncrease,
    }
  }
})
</script>
