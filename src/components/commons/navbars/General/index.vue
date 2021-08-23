<template>
  <nav class="navbar navbar-expand-lg navbar-light tw-h-16">
    <div
      @click="onClickLogo"
    >
      logo
    </div>
    <div
      class="tw-ml-auto tw-flex tw-items-center tw-gap-x-4"
    >
      <!--   if it's logged in   -->
      <user-dropdown
        v-if="isLoggedIn"
        class="tw-mr-2"
        left="auto"
        right="0"
      />
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import useUserMixin from '@/mixins/useUserMixin'
import UserDropdown from '@/components/commons/dropdowns/User/index.vue'

export default defineComponent({
  name: 'GeneralNavbar',
  components: { UserDropdown },
  setup: () => {
    const router = useRouter()
    const { isLoggedIn } = useUserMixin()

    const onClickLogo = async () => {
      await router.push({ path: '/' })
    }

    return {
      isLoggedIn,
      onClickLogo,
    }
  }
})
</script>
