<template>
  <div>
    <div
      class="tw-flex tw-items-center tw-space-x-2"
    >
      <c-material-icon
        @click="onClickBackBtn"
      >
        chevron_left
      </c-material-icon>
      <span
        v-if="route.name === RouterNameEnum.GUILD_CALENDAR_CREATE_FORM"
      >
        {{ $t('standardBtnLabels.create') }}
      </span>
      <span
        v-else-if="route.name === RouterNameEnum.GUILD_CALENDAR_UPDATE_FORM"
      >
        {{ $t('standardBtnLabels.edit') }}
      </span>
    </div>
    <c-divider
      class="tw-my-2"
    />
    FormGuildCalendar
  </div>
</template>
<script
    lang="ts"
>
export default {
  name: 'FormGuildCalendar',
}
</script>
<script setup lang="ts">
import CMaterialIcon from '@/components/commons/icons/Material/index.vue'
import { useRoute, useRouter } from 'vue-router'
import CDivider from '@/components/commons/Divider/index.vue'
import { RouterNameEnum } from '@/types/systems/routers/keys'

const router = useRouter()
const route = useRoute()

const onClickBackBtn = () => {
  router.back()
}

</script>
