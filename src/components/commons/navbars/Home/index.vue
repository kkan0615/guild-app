<template>
  <nav class="navbar navbar-expand-lg navbar-light tw-h-16">
    <div>
      logo
    </div>
    <div
      class="tw-ml-auto tw-flex tw-items-center tw-gap-x-4"
    >
      <div
        class="tw-cursor-pointer"
      >
        {{ $t('views.Home.guildListLink') }}
      </div>
      <div
        class="tw-cursor-pointer"
      >
        {{ $t('views.Home.loginLink') }}
      </div>
      <button
        type="button"
        class="btn btn-primary"
      >
        {{ $t('views.Home.createGuildBtn') }}
      </button>
      <button
        type="button"
        class="btn btn-outline-primary"
      >
        {{ $t('views.Home.signUpBtn') }}
      </button>
    </div>
  </nav>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'
export default defineComponent({
  name: 'HomeNavbar',
  setup: () => {
    const message = ref('Hello world prototype')
    return { message }
  }
})
</script>
