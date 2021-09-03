<template>
  <div
    class="tw-h-full"
  >
    <div
      class="tw-h-full tw-flex tw-w-full"
    >
      <admin-sidebar
        class="flex-grow-0 flex-shrink-1"
      />
      <div
        class="flex-grow-1 flex-shrink-0 tw-min-h-full tw-flex tw-flex-col"
      >
        <admin-navbar
          class="flex-grow-0 flex-shrink-1"
        />
        <div
          class="tw-p-2 flex-grow-1 flex-shrink-0 tw-h-1 tw-overflow-y-auto"
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
