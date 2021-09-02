<template>
  <router-view
    :key="routerKey"
  />
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'GuildAdminInformationLayout',
  setup: () => {
    const route = useRoute()
    const routerKey = computed(() => route.name)
    return {
      routerKey,
    }
  }
})
</script>
