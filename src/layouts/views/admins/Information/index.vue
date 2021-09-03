<template>
  <ul class="nav nav-tabs">
    <li class="nav-item">
      <router-link
        class="nav-link"
        aria-current="page"
        :class="{
          active: routerKey === RouterNameEnum.GUILD_ADMIN_INFORMATION_MAIN,
        }"
        :to="{ name: RouterNameEnum.GUILD_ADMIN_INFORMATION_MAIN }"
      >
        {{ $i18n.t(`router.${RouterNameEnum.GUILD_ADMIN_INFORMATION_MAIN}.title`) }}
      </router-link>
    </li>
    <li class="nav-item">
      <router-link
        class="nav-link"
        :class="{
          active: routerKey === RouterNameEnum.GUILD_ADMIN_INFORMATION_IMPORTANCE,
        }"
        aria-current="page"
        :to="{ name: RouterNameEnum.GUILD_ADMIN_INFORMATION_IMPORTANCE }"
      >
        {{ $i18n.t(`router.${RouterNameEnum.GUILD_ADMIN_INFORMATION_IMPORTANCE}.title`) }}
      </router-link>
    </li>
  </ul>
  <router-view
    :key="routerKey"
  />
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useRoute } from 'vue-router'
import { RouterNameEnum } from '@/types/systems/routers/keys'

export default defineComponent({
  name: 'GuildAdminInformationLayout',
  setup: () => {
    const route = useRoute()
    const routerKey = computed(() => route.name)
    return {
      routerKey,
      RouterNameEnum,
    }
  }
})
</script>
