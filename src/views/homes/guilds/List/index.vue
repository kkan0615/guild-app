<template>
  <div>
    <!--  actions  -->
    <div
      class="tw-flex tw-mb-4"
    >
      <!--  Filter   -->
      <guild-list-filter
        class="tw-ml-auto"
      />
    </div>
    <div
      v-if="guildList.length"
      class="tw-grid tw-grid-cols-4 tw-gap-4"
    >
      <guild-list-item
        v-for="guild in guildList"
        :key="guild.uid"
        :guild="guild"
      />
    </div>
    <div
      v-if="guildListLoading"
    >
      Loading...
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onBeforeMount, computed } from 'vue'
import useStore from '@/store'
import { HomeActionTypes } from '@/store/modules/home/actions'
import GuildListItem from '@/components/guilds/ListItem/index.vue'
import GuildListFilter from '@/components/filters/GuildList/index.vue'

export default defineComponent({
  name: 'HomeGuildList',
  components: { GuildListFilter, GuildListItem },
  setup: () => {
    const store = useStore()

    const guildList = computed(() => store.state.home.guildList)
    const guildListLoading = computed(() => store.state.home.guildListLoading)

    onMounted(async () => {
      await store.dispatch(HomeActionTypes.OPEN_GUILD_LIST_LOADING)
      await store.dispatch(HomeActionTypes.LOAD_GUILD_LIST)
      await store.dispatch(HomeActionTypes.CLOSE_GUILD_LIST_LOADING)
    })

    onBeforeMount(async () => {
      /* Reset data */
      await store.dispatch(HomeActionTypes.RESET_GUILD_LIST)
    })

    return {
      guildList,
      guildListLoading,
    }
  }
})
</script>
