<template>
  <div
    class="tw-p-4 tw-h-full tw-flex tw-flex-col"
  >
    <c-base-header
      class="tw-flex-grow-0 tw-flex-shrink"
      :page-name="$t(`router.${RouterNameEnum.GUILD_POST_MAIN}.title`)"
      :breadcrumbs="breadcrumbs"
    />
    <div
      class="tw-flex-grow tw-flex-shrink-0 tw-h-1"
    >
      <router-view />
    </div>
  </div>
</template>
<script
    lang="ts"
>
export default {
  name: 'GuildPostLayout',
}
</script>
<script setup lang="ts">
import type { CBBreadcrumb } from '@/components/bootstraps/Breadcrumb/types'
import { ref } from 'vue'
import CBaseHeader from '@/components/headers/Base/index.vue'
import { useI18n } from 'vue-i18n'
import { RouterNameEnum } from '@/types/systems/routers/keys'

const i18n = useI18n()

/* Breadcrumbs data */
const breadcrumbs = ref<Array<CBBreadcrumb>>([
  {
    name: i18n.t(`router.${RouterNameEnum.GUILD_HOME}.title`),
    routerName: RouterNameEnum.GUILD_HOME,
    active: true,
  },
  {
    name: i18n.t(`router.${RouterNameEnum.GUILD_POST_LAYOUT}.title`),
    routerName: RouterNameEnum.GUILD_POST_MAIN,
    active: false,
  },
])

</script>
