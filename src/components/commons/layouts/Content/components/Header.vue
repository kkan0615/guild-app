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
      class="tw-ml-auto tw-flex tw-items-center"
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
import CMaterialIcon from '@/components/commons/icons/Material/index.vue'
import CDivider from '@/components/commons/Divider/index.vue'
import { useRoute, useRouter } from 'vue-router'
import { defineEmits } from 'vue'

const router = useRouter()
const route = useRoute()

const emit = defineEmits(['click:backBtn'])

const onClickBackBtn = async () => {
  emit('click:backBtn')
}
</script>
