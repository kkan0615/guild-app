<template>
  <div
    class="tw-p-2"
  >
    <button
      class="btn btn-danger"
      type="button"
      @click="onClickDeleteGuildBtn"
    >
      DELETE GUILD
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ImportanceInformationGuildAdmin',
  setup: () => {
    const onClickDeleteGuildBtn = () => {
      console.log('onClickDeleteGuildBtn')
    }
    return {
      onClickDeleteGuildBtn,
    }
  }
})
</script>
