<template>
  <div
    class="tw-p-2"
  >
    Form Role
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeUnmount, onMounted } from 'vue'
import useStore from '@/store'

export default defineComponent({
  name: 'FormRoleGuildAdmin',
  setup: () => {
    const store = useStore()

    return {
    }
  }
})
</script>
