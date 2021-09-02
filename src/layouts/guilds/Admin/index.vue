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
          class="tw-p-2 flex-grow-1 flex-shrink-0"
        >
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AdminSidebar from '@/components/sidebars/Admin/index.vue'
import AdminNavbar from '@/components/commons/navbars/Admin/index.vue'

export default defineComponent({
  name: 'GuildAdminLayout',
  components: { AdminNavbar, AdminSidebar },
  setup: () => {
    return {
    }
  }
})
</script>
