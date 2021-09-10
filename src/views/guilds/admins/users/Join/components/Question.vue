<template>
  <div
    role="listitem"
    class="tw-bg-gray-200 tw-px-4 tw-py-1"
  >
    <div>
      <span
        class="tw-font-bold tw-mr-1"
      >
        Q.
      </span>
      {{ question.question }}
    </div>
    <div>
      <span
        class="tw-font-bold tw-mr-1"
      >
        A:
      </span>
      {{ question.answer }}
    </div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, PropType } from 'vue'
import { GuildJoinQuestion } from '@/types/model/guilds/question'

export default defineComponent({
  name: 'JoinUserGuildAdminQuestion',
  props: {
    question: {
      type: Object as PropType<GuildJoinQuestion>,
      required: false,
      default: () => {},
    }
  },
  setup: () => {
    const message = ref('Hello world prototype')
    return {
      message
    }
  }
})
</script>
