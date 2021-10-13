<template>
  <div>
    <div>
      <c-input-label
        id="input-board-form-title"
      >
        Title
      </c-input-label>
      <b-base-input
        id="input-board-form-title"
        v-model="boardForm.title"
      />
    </div>
  </div>
</template>
<script
    lang="ts"
>
export default {
  name: 'PostBoardFromGuildPostGroupBoardForm',
}
</script>
<script setup lang="ts">
import type { PropType } from 'vue'
import type { GuildPostCreateForm, GuildPostUpdateForm } from '@/types/model/guilds/post'
import { defineProps, ref } from 'vue'
import CInputLabel from '@/components/commons/inputs/Label/index.vue'
import BBaseInput from '@/components/commons/inputs/Base/index.vue'

const props = defineProps({
  boardForm: {
    type: Object as PropType<GuildPostCreateForm | GuildPostUpdateForm>,
    required: true,
    default: () => {}
  },
  title: {
    type: String,
    required: true,
    default: ''
  }
})
</script>
