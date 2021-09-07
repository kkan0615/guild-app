<template>
  <div
    class="tw-h-full"
  >
    <admin-sidebar />
    <div
      class="md:tw-pl-72 tw-h-full"
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

export default defineComponent({
  name: 'GuildAdminLayout',
  components: { AdminNavbar, AdminSidebar },
  setup: () => {
    const route = useRoute()
    const i18n = useI18n()

    const breadcrumb = computed(() => route.matched.map(matchRoute => i18n.t(`router.${matchRoute.name}.title`)))

    return {
      breadcrumb,
    }
  }
})
</script>
