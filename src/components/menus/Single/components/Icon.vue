<template>
  <c-material-icon
    class="material-icons tw-mr-4 tw-text-base"
  >
    <slot />
  </c-material-icon>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import CMaterialIcon from '@/components/commons/icons/Material/index.vue'

export default defineComponent({
  name: 'SingMenuIcon',
  components: { CMaterialIcon },
  setup: () => {
    return {

    }
  }
})
</script>
