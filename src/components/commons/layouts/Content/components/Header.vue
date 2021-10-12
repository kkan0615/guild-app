<template>
  <div
    class="tw-flex tw-items-center"
  >
    <c-material-icon
      clickable
      @click="onClickBackBtn"
    >
      chevron_left
    </c-material-icon>
    <div
      class="tw-ml-auto"
    >
      <slot
        name="end"
      />
    </div>
  </div>
  <c-divider
    class="tw-my-2"
  />
</template>
<script
    lang="ts"
>
export default {
  name: 'CContentLayoutHeader',
}
</script>
<script setup lang="ts">
import type { PropType } from 'vue'
import type { RouteParams } from 'vue-router'
import CMaterialIcon from '@/components/commons/icons/Material/index.vue'
import CDivider from '@/components/commons/Divider/index.vue'
import { useRoute, useRouter } from 'vue-router'
import { defineProps } from 'vue'

const router = useRouter()
const route = useRoute()

const props = defineProps({
  to: {
    type: Object as PropType<{ name: string; params: RouteParams }>,
    required: false,
    default: null
  }
})

const onClickBackBtn = async () => {
  if (props.to) {
    try {
      await router.push({ name: props.to.name, params: props.to.params })
    } catch (e) {
      console.error(e)
    }
  } else {
    router.back()
  }
}
</script>
