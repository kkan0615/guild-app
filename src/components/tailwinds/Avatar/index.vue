<template>
  <div
    class="tw-relative"
    :class="{
      [`tw-w-${size}`]: true,
      [`tw-h-${size}`]: true
    }"
  >
    <div
      class="tw-group tw-w-full tw-h-full tw-rounded-full tw-overflow-hidden tw-shadow-inner tw-text-center tw-table tw-cursor-pointer"
      :class="{
        [`bg-${color}`]: !!color,
      }"
    >
      <!--      <slot />-->
      <img
        v-if="src"
        :src="src"
        :alt="name"
        class="tw-object-cover tw-object-center tw-w-full tw-h-full"
      >
      <span
        v-else
        class="tw-font-bold tw-w-full tw-h-full tw-flex tw-justify-center tw-items-center"
      >
        {{ formattedName }}
      </span>
    </div>
    <slot
      name="badge"
    />
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, computed } from 'vue'

export default defineComponent({
  name: 'TAvatar',
  props: {
    size: {
      type: [Number, String],
      required: false,
      default: 12
    },
    color: {
      type: String,
      required: false,
      default: 'primary',
    },
    src: {
      type: String,
      required: false,
      default: '',
    },
    name: {
      type: String,
      required: false,
      default: '',
    }
  },
  setup: (props) => {
    const formattedName = computed(() => {
      const name = props.name
      if (props.name.length >= 2)
        return name.slice(name.length - 2)

      return name
    })
    return {
      formattedName
    }
  }
})
</script>
