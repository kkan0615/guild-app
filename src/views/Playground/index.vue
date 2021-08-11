<template>
  <div
    class="tw-h-full"
  >
    {{ message }}
    <input
      v-model="message"
      class="tw-text-sm"
    >
    <p>{{ $t("message.hello") }}</p>
  </div>
</template>


<script setup lang="ts">
import { ref } from 'vue'

const message = ref('hello world')
</script>
