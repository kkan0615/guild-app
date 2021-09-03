<template>
  <div
    class="form-check has-validation"
  >
    <slot
      name="prepend"
    />
    <input
      :id="id"
      ref="inputRef"
      type="checkbox"
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
    <slot
      name="checkbox"
    >
      <label
        :for="id"
        class="form-check-label"
      >
        {{ label }}
      </label>
    </slot>
    <slot
      name="append"
    />
    <div class="invalid-feedback">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, onMounted, onBeforeUnmount, getCurrentInstance, inject } from 'vue'
import { validate } from '@/utils/bootstrap/validate'
import { InputRuleType } from '@/types/bootstrap/validate'
import { BFormProvideKey } from '@/components/commons/Form/types'

export default defineComponent({
  name: 'BCheckbox',
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
    label: {
      type: String,
      required: false,
      default: ''
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
    const inputRef = ref<HTMLInputElement | null>(null)

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

    const focus = () => {
      if (inputRef.value)
        inputRef.value.focus()
    }

    return {
      errorMessage,
      inputRef,
      onInput,
      inputValidate,
      focus
    }
  }
})
</script>
