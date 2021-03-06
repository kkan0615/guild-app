<template>
  <div
    class="form-check has-validation"
  >
    <slot
      name="prepend"
    />
    <input
      :id="id"
      :type="type"
      :readonly="readonly"
      :disabled="disabled"
      :placeholder="placeholder"
      :list="list"
      :value="modelValue"
      class="form-check-input"
      :class="{
        'is-invalid': errorMessage,
        'form-control-sm': size === 'sm',
        'form-control-lg': size === 'lg',
      }"
      @input="onInput"
    >
    <slot />
    <div class="invalid-feedback">
      {{ errorMessage }}
    </div>
    <slot
      name="append"
    />
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, onMounted, onBeforeUnmount, getCurrentInstance, inject } from 'vue'
import { validate } from '@/utils/bootstrap/validate'
import { InputRuleType } from '@/types/bootstrap/validate'
import { BFormProvideKey } from '@/components/commons/Form/types'

export default defineComponent({
  name: 'BCheckRadioBox',
  props: {
    id: {
      type: String,
      required: true,
      default: ''
    },
    type: {
      type: String,
      required: false,
      default: 'checkbox'
    },
    placeholder: {
      type: String,
      required: false,
      default: ''
    },
    readonly: {
      type: Boolean,
      required: false,
      default: false,
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
    size: {
      type: String,
      required: false,
      default: ''
    },
    list: {
      type: String,
      required: false,
      default: ''
    },
    rules: {
      type: Array,
      required: false,
      default: () => []
    },
    modelValue: {
      type: Boolean,
      required: false,
      default: false,
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
        inputValidate(elemet.value as boolean | undefined)

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
