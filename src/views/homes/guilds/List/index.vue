<template>
  <div>
    {{ message }}
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, onMounted, onBeforeMount } from 'vue'
import useStore from '@/store'
import { HomeActionTypes } from '@/store/modules/home/actions'

export default defineComponent({
  name: 'HomeGuildList',
  setup: () => {
    const store = useStore()

    const message = ref('Hello world HomeGuildList')

    onMounted(async () => {
      await store.dispatch(HomeActionTypes.LOAD_GUILD_LIST)
    })

    onBeforeMount(async () => {
      /* Reset data */
      await store.dispatch(HomeActionTypes.RESET_GUILD_LIST)
    })

    return { message }
  }
})
</script>
