<template>
  <div
    class="tw-p-2"
  >
    <!--  Header  -->
    <div>
      <main-guild-notice-form>
        add
      </main-guild-notice-form>
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
import MainGuildNoticeForm from '@/views/guilds/generals/notices/Main/components/Form.vue'

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
