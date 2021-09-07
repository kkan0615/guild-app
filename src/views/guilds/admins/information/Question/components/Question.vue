<template>
  <div>
    <div>
      Questions
    </div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'

export default defineComponent({
  name: 'QuestionInformationGuildAdminQuestion',
  setup: () => {
    const message = ref('Hello world prototype')
    return {
      message
    }
  }
})
</script>
