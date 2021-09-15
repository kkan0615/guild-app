<template>
  <!--  <ul class="nav nav-tabs">-->
  <!--    &lt;!&ndash;  Main  &ndash;&gt;-->
  <!--    <li class="nav-item">-->
  <!--      <router-link-->
  <!--        class="nav-link"-->
  <!--        aria-current="page"-->
  <!--        :class="{-->
  <!--          active: routerKey === RouterNameEnum.GUILD_ADMIN_ROLE_MAIN,-->
  <!--        }"-->
  <!--        :to="{ name: RouterNameEnum.GUILD_ADMIN_ROLE_MAIN }"-->
  <!--      >-->
  <!--        {{ $t(`router.${RouterNameEnum.GUILD_ADMIN_ROLE_MAIN}.title`) }}-->
  <!--      </router-link>-->
  <!--    </li>-->
  <!--  </ul>-->
  <router-view
    :key="routerKey"
  />
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useRoute } from 'vue-router'
import { RouterNameEnum } from '@/types/systems/routers/keys'

export default defineComponent({
  name: 'GuildAdminRoleLayout',
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
