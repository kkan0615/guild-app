<template>
  <div
    class="tw-h-full"
  >
    <div
      class="tw-h-full tw-flex"
    >
      <admin-sidebar />
      <div>
        <router-view />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AdminSidebar from '@/components/sidebars/Admin/index.vue'

export default defineComponent({
  name: 'GuildAdminLayout',
  components: { AdminSidebar },
  setup: () => {
    return {
    }
  }
})
</script>
