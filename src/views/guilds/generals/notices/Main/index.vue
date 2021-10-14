<template>
  <div
    class="tw-p-4"
  >
    <c-base-header
      :page-name="$t(`router.${RouterNameEnum.GUILD_NOTICE_MAIN}.title`)"
      :breadcrumbs="breadcrumbs"
    />
    <div
      class="tw-flex tw-items-center"
    >
      <div
        class="tw-mr-auto"
      >
        Total: {{ noticeList.length }}
      </div>
      <main-guild-notice-form>
        <c-b-button
          class="btn-primary"
        >
          <c-material-icon
            left
          >
            add
          </c-material-icon>
          Create Notice
        </c-b-button>
      </main-guild-notice-form>
    </div>
    <button
      @click="test"
    >
      test
    </button>
    <div
      class="notices tw-mt-4 tw-w-full"
    >
      <div
        v-for="(notice, index) in noticeList"
        :key="notice.id"
        class="notice md:tw-w-1/4 tw-w-full p-1"
      >
        <main-guild-notice-notice
          :id="`notice-update-form-${index}`"
          :notice="notice"
        />
      </div>
    </div>
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
import type { CBBreadcrumb } from '@/components/bootstraps/Breadcrumb/types'
import Masonry from 'masonry-layout'
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import useStore from '@/store'
import { GuildNoticeActionTypes } from '@/store/modules/guilds/generals/notices/actions'
import MainGuildNoticeForm from '@/views/guilds/generals/notices/Main/components/Form.vue'
import MainGuildNoticeNotice from '@/views/guilds/generals/notices/Main/components/Notice.vue'
import CMaterialIcon from '@/components/commons/icons/Material/index.vue'
import CBaseHeader from '@/components/headers/Base/index.vue'
import { RouterNameEnum } from '@/types/systems/routers/keys'
import { useI18n } from 'vue-i18n'
import CBButton from '@/components/bootstraps/Button/index.vue'

const store = useStore()
const i18n = useI18n()

/* Breadcrumbs data */
const breadcrumbs = ref<Array<CBBreadcrumb>>([
  {
    name: i18n.t(`router.${RouterNameEnum.GUILD_HOME}.title`),
    routerName: RouterNameEnum.GUILD_HOME,
    active: true,
  },
  {
    name: i18n.t(`router.${RouterNameEnum.GUILD_NOTICE_MAIN}.title`),
    routerName: RouterNameEnum.GUILD_NOTICE_MAIN,
    active: false,
  },
])

const noticeList = computed(() => store.state.guildNotice.noticeList)

onMounted(async () => {
  try {
    await store.dispatch(GuildNoticeActionTypes.LOAD_NOTICE_LIST)
    new Masonry('.notices', {
      itemSelector: '.notice',
      originTop: true,
      resize: true,
    })
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

// const test = () => {
//   noticeList.value.unshift({
//     id: 'test',
//     title: 'tr123',
//     content: 'wow',
//   })
//
//   nextTick(() => {
//     const msnry = new Masonry('.notices', {
//       itemSelector: '.notice',
//       originTop: true,
//       resize: true,
//     })
//   })
// }

</script>
<style>

</style>
