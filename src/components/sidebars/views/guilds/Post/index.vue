<template>
  <div
    v-if="isOpenSidebar"
    class="md:tw-static md:tw-visible md:tw-bg-none md:tw-w-72 md:tw-block md:tw-border md:tw-overflow-auto tw-absolute tw-rounded-md tw-h-full tw-w-2/3 tw-z-10  p-2 tw-overflow-y-scroll"
    :class="{
      'tw-invisible':isOpenLayoutSidebar,
      'tw-bg-white': !isOpenLayoutSidebar,
    }"
  >
    <c-list-group
      label="border group name"
    >
      <div
        v-for="i in 10"
        :key="i"
      >
        post borders {{ i }}
      </div>
    </c-list-group>
  </div>
  <div
    v-if="isOpenSidebar"
    class="md:tw-hidden tw-opacity-50 tw-bg-gray-700 tw-h-full tw-w-1/3 md:tw-w-0 tw-z-10 tw-absolute tw-right-0"
    @click="onClickOutside"
  />
</template>
<script
    lang="ts"
>
export default {
  name: 'GuildPostViewSidebar',
}
</script>
<script setup lang="ts">
import { computed, ref } from 'vue'
import useStore from '@/store'
import { GuildPostActionTypes } from '@/store/modules/guilds/generals/posts/actions'
import CListGroup from '@/components/commons/groups/List/index.vue'

const store = useStore()

const isOpenSidebar = computed(() => store.state.guildPost.isOpenSidebar)
const isOpenLayoutSidebar = computed(() => store.state.guild.isOpenSideBar)

const onClickOutside = async () => {
  try {
    if (isOpenSidebar.value) {
      await store.dispatch(GuildPostActionTypes.CLOSE_SIDE_BAR)
    } else {
      await store.dispatch(GuildPostActionTypes.OPEN_SIDE_BAR)
    }
  } catch (e) {
    console.error(e)
  }
}

</script>
