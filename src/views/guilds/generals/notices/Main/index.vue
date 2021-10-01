<template>
  <div
    class="tw-p-2"
  >
    <!--  Header  -->
    <div>
      123
    </div>
    MainGuildNotice
  </div>
</template>
<script
    lang="ts"
>
export default {
  name: 'MainGuildNotice',
}
</script>
<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import useStore from '@/store'
import { GuildNoticeActionTypes } from '@/store/modules/guilds/generals/notices/actions'

const store = useStore()

onMounted(async () => {
  try {
    await store.dispatch(GuildNoticeActionTypes.LOAD_NOTICE_LIST)
  } catch (e) {
    console.error(e)
  }
})

onBeforeUnmount(async () => {
  try {
    await store.dispatch(GuildNoticeActionTypes.LOAD_NOTICE_LIST)
  } catch (e) {
    console.error(e)
  }
})

</script>
