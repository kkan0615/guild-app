<template>
  <div
    class="tw-p-4"
  >
    <c-base-header
      :page-name="$t(`router.${RouterNameEnum.GUILD_NOTICE_MAIN}.title`)"
      :breadcrumbs="breadcrumbs"
    />
    <div
      class="tw-flex"
    >
      <main-guild-notice-form>
        <div
          class="tw-flex tw-items-center"
        >
          <c-material-icon
            class="tw-mr-2"
          >
            add
          </c-material-icon>
          Create Notice
        </div>
      </main-guild-notice-form>
    </div>
    <div>
      <main-guild-notice-notice
        v-for="notice in noticeList"
        :key="notice.id"
        :notice="notice"
      />
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
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import useStore from '@/store'
import { GuildNoticeActionTypes } from '@/store/modules/guilds/generals/notices/actions'
import MainGuildNoticeForm from '@/views/guilds/generals/notices/Main/components/Form.vue'
import MainGuildNoticeNotice from '@/views/guilds/generals/notices/Main/components/Notice.vue'
import CMaterialIcon from '@/components/commons/icons/Material/index.vue'
import CBaseHeader from '@/components/headers/Base/index.vue'
import { RouterNameEnum } from '@/types/systems/routers/keys'
import { useI18n } from 'vue-i18n'

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
