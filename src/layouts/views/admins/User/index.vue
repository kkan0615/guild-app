<template>
  <ul class="nav nav-tabs">
    <!--  Main  -->
    <li class="nav-item">
      <router-link
        class="nav-link"
        aria-current="page"
        :class="{
          active: routerKey === RouterNameEnum.GUILD_ADMIN_USER_MAIN,
        }"
        :to="{ name: RouterNameEnum.GUILD_ADMIN_USER_MAIN }"
      >
        {{ $t(`router.${RouterNameEnum.GUILD_ADMIN_USER_MAIN}.title`) }}
      </router-link>
    </li>
    <!--  Join  -->
    <li class="nav-item">
      <router-link
        class="nav-link"
        :class="{
          active: routerKey === RouterNameEnum.GUILD_ADMIN_USER_JOINS,
        }"
        aria-current="page"
        :to="{ name: RouterNameEnum.GUILD_ADMIN_USER_JOINS }"
      >
        {{ $t(`router.${RouterNameEnum.GUILD_ADMIN_USER_JOINS}.title`) }}
      </router-link>
    </li>
    <!--  BlackList  -->
    <li class="nav-item">
      <router-link
        class="nav-link"
        :class="{
          active: routerKey === RouterNameEnum.GUILD_ADMIN_USER_BLACK_LIST,
        }"
        aria-current="page"
        :to="{ name: RouterNameEnum.GUILD_ADMIN_USER_BLACK_LIST }"
      >
        {{ $t(`router.${RouterNameEnum.GUILD_ADMIN_USER_BLACK_LIST}.title`) }}
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
  name: 'GuildAdminUserLayout',
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
