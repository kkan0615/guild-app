<template>
  <c-content-layout>
    <c-content-layout-header />
    <b-form>
      PostBoardFromGuildPost
    </b-form>
  </c-content-layout>
</template>
<script
    lang="ts"
>
export default {
  name: 'PostBoardFromGuildPost',
}
</script>
<script setup lang="ts">
import CContentLayout from '@/components/commons/layouts/Content/index.vue'
import CContentLayoutHeader from '@/components/commons/layouts/Content/components/Header.vue'
import BForm from '@/components/commons/Form/index.vue'
import { ref } from 'vue'

const name = ref('')
const description = ref('')
const isAllowComment = ref(true)
const isPrivate = ref(false)
const operatorIds = ref<Array<number>>([])
const allowUserIds = ref<Array<number>>([])
</script>
