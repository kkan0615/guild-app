<template>
  <slot
    name="prepend"
  />
  <input
    :id="id"
    :type="type"
    :value="modelValue"
    class="form-control"
    :class="{
      'is-invalid': errorMessage
    }"
    @input="onInput"
  >
  <div class="invalid-feedback">
    {{ errorMessage }}
  </div>
  <slot
    name="append"
  />
</template>

<script lang="ts">
import { ref, defineComponent, onMounted, onBeforeUnmount, getCurrentInstance, inject } from 'vue'
import { validate } from '@/utils/bootstrap/validate'
import { InputRuleType } from '@/types/bootstrap/validate'
import { BFormProvideKey } from '@/components/commons/Form/types'

export default defineComponent({
  name: 'BBaseInput',
  props: {
    id: {
      type: String,
      required: true,
      default: ''
    },
    type: {
      type: String,
      required: false,
      default: 'text'
    },
    rules: {
      type: Array,
      required: false,
      default: () => []
    },
    modelValue: {
      required: true,
    },
  },
  emits: [
    'update:modelValue',
  ],
  setup: (props, { emit }) => {
    const errorMessage = ref('')

    const form = inject(BFormProvideKey)

    onMounted(() => {
      const instance = getCurrentInstance()
      if (instance && form)
        form.register({ inputValidate, uid: instance.uid } as InstanceType<any>)
    })
    onBeforeUnmount(() => {
      const instance = getCurrentInstance()
      if (instance && form)
        form.unregister(instance.uid)
    })

    const onInput = (event: InputEvent) => {
      if (event.target) {
        const elemet = event.target as HTMLInputElement
        inputValidate(elemet.value)

        emit('update:modelValue', elemet.value)
      }
    }

    const inputValidate = (value = props.modelValue) => {
      const result = validate(value, props.rules as Array<InputRuleType>)

      if (typeof result === 'string') {
        errorMessage.value = result
      } else {
        errorMessage.value = result ? '' : 'invalid'
      }

      return result
    }

    return {
      errorMessage,
      onInput,
      inputValidate
    }
  }
})
</script>
