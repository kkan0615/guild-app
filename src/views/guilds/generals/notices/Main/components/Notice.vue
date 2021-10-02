<template>
  <div
    class="tw-p-2"
  >
    {{ notice }}
  </div>
</template>
<script
  lang="ts"
>
export default {
  name: 'MainGuildNoticeNotice',
}
</script>
<script setup lang="ts">
import type { PropType } from 'vue'
import type { GuildNotice } from '@/types/model/guilds/notice'
import { computed, defineProps, onBeforeUnmount, onMounted } from 'vue'
import useStore from '@/store'

const props = defineProps({
  notice: {
    type: Object as PropType<GuildNotice>,
    required: true,
    default: () => {}
  }
})

const store = useStore()

</script>
