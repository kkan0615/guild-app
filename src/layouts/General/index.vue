<template>
  <div
    class="tw-h-screen"
  >
    <div
      class="tw-h-full tw-flex"
    >
      <div
        class="tw-h-full tw-w-52 bg-light"
      >
        Menu
        <div
          class="tw-flex tw-items-center tw-border-l-4 tw-border-blue-500 tw-px-2"
        >
          test
        </div>
      </div>
      <div
        class="tw-h-full tw-flex-grow"
      >
        <div
          class="tw-h-full tw-flex tw-flex-col tw-overflow-y-scroll"
        >
          <nav class="tw-flex-grow-0 tw-flex-shrink-0 navbar navbar-expand-lg navbar-light bg-light">
            <div>
              Logo
            </div>
            <auth />
          </nav>
          <!--     content     -->
          <div
            class="tw-h-1 tw-flex-grow tw-flex-shrink"
          >
            <router-view />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Auth from '@/components/commons/menus/Auth/Auth.vue'

</script>
