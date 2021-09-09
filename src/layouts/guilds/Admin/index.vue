<template>
  <div
    class="tw-h-full"
  >
    <admin-sidebar />
    <div
      class="tw-h-full"
      :class="{
        'md:tw-pl-72': isOpenSidebar,
      }"
    >
      <admin-navbar />
      <div
        class="tw-p-3"
      >
        <!--     breadcrumb     -->
        <!--          <nav-->
        <!--            aria-label="breadcrumb"-->
        <!--          >-->
        <!--            <ol-->
        <!--              class="breadcrumb"-->
        <!--            >-->
        <!--              <li-->
        <!--                v-for="breadcrumbItem in breadcrumb"-->
        <!--                :key="breadcrumbItem"-->
        <!--                class="breadcrumb-item"-->
        <!--              >-->
        <!--                <span-->
        <!--                  class="tw-text-sm"-->
        <!--                >-->
        <!--                  {{ breadcrumbItem }}-->
        <!--                </span>-->
        <!--              </li>-->
        <!--            </ol>-->
        <!--          </nav>-->
        <router-view />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import AdminSidebar from '@/components/sidebars/Admin/index.vue'
import AdminNavbar from '@/components/commons/navbars/Admin/index.vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import useStore from '@/store'

export default defineComponent({
  name: 'GuildAdminLayout',
  components: { AdminNavbar, AdminSidebar },
  setup: () => {
    const store = useStore()
    const route = useRoute()
    const i18n = useI18n()

    const breadcrumb = computed(() => route.matched.map(matchRoute => i18n.t(`router.${matchRoute.name}.title`)))
    const isOpenSidebar = computed(() => store.state.guildAdminApp.isOpenSideBar)

    return {
      breadcrumb,
      isOpenSidebar,
    }
  }
})
</script>
