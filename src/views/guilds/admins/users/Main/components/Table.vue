<template>
  <div>
    MainUserGuildAdminTable
    {{ userList }}
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, computed } from 'vue'
import useStore from '@/store'

export default defineComponent({
  name: 'MainUserGuildAdminTable',
  setup: () => {
    const store = useStore()

    const userList = computed(() => store.state.guildAdminUser.userList)

    return {
      userList
    }
  }
})
</script>
