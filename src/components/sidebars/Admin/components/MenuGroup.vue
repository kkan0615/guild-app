<template>
  <div
    class="tw-w-full tw-select-none tw-cursor-pointer"
    style="background-color: #2b303a"
  >
    <div
      class="tw-text-sm tw-py-1 tw-px-2 tw-flex tw-items-center"
      :class="{
        'tw-text-gray-400': !isActive,
        'tw-text-white': isActive,
      }"
      @click="onClickMenuGroup"
    >
      <div>
        {{ title }}
      </div>
      <div
        v-if="isOpen"
        class="material-icons tw-ml-auto"
      >
        arrow_drop_down
      </div>
      <div
        v-else
        class="material-icons tw-ml-auto"
      >
        arrow_drop_up
      </div>
    </div>
    <div
      v-if="isOpen"
    >
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'

export default defineComponent({
  name: 'AdminSidebarMenuGroup',
  props: {
    isActive: {
      type: Boolean,
      required: false,
      default: false,
    },
    title: {
      type: String,
      required: false,
      default: '',
    }
    // open: {
    //   type: Boolean,
    //   required: false,
    //   default: false,
    // }
  },
  emits: ['update:open'],
  setup: (props, { emit }) => {
    const isOpen = ref(props.isActive)

    const onClickMenuGroup = () => {
      // console.log('hi!')
      // emit('update:open', !props.open)
      isOpen.value = !isOpen.value
    }

    return {
      isOpen,
      onClickMenuGroup,
    }
  }
})
</script>
