<template>
  <div>
    <b-base-input
      :id="randomId"
      :model-value="modelValue"
      :placeholder="placeholder"
      @update:modelValue="onUpdateModelValue"
    >
      <template
        #prepend
      >
        <c-material-icon>
          drag_indicator
        </c-material-icon>
      </template>
    </b-base-input>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, PropType, computed } from 'vue'
import BBaseInput from '@/components/commons/inputs/Base/index.vue'
import { v4 } from 'uuid'
import CMaterialIcon from '@/components/commons/icons/Material/index.vue'
import { GuildJoinQuestion } from '@/types/model/guilds/question'

export default defineComponent({
  name: 'QuestionInformationGuildAdminQuestion',
  components: { CMaterialIcon, BBaseInput },
  props: {
    num: {
      type: Number,
      required: false,
      default: 0,
    },
    modelValue: {
      type: String,
      required: false,
      default: '',
    },
    question: {
      type: Object as PropType<GuildJoinQuestion>,
      required: false,
      default: () => {},
    },
  },
  emits: [
    'update:modelValue',
  ],
  setup: (props, { emit }) => {
    const randomId = ref(v4())

    const placeholder = computed(() => props.num ? `Question ${props.num}` : '')

    const onUpdateModelValue = (value: string) => {
      emit('update:modelValue', value)
    }

    return {
      randomId,
      placeholder,
      onUpdateModelValue,
    }
  }
})
</script>
