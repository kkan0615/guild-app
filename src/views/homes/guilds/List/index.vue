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
      class="tw-grid md:tw-grid-cols-4 tw-grid-cols-1 tw-gap-4"
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
    <!--      -->
    <div
      class="tw-mt-4 tw-flex tw-justify-center"
    >
      <c-pagination
        @click:next="onClickNext"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, computed, onBeforeUnmount } from 'vue'
import useStore from '@/store'
import { HomeActionTypes } from '@/store/modules/home/actions'
import GuildListItem from '@/components/guilds/ListItem/index.vue'
import GuildListFilter from '@/components/filters/GuildList/index.vue'
import CPagination from '@/components/Pagination/index.vue'

export default defineComponent({
  name: 'HomeGuildList',
  components: { CPagination, GuildListFilter, GuildListItem },
  setup: () => {
    const store = useStore()

    const guildList = computed(() => store.state.home.guildList)
    const guildListLoading = computed(() => store.state.home.guildListLoading)

    onMounted(async () => {
      await store.dispatch(HomeActionTypes.OPEN_GUILD_LIST_LOADING)
      await store.dispatch(HomeActionTypes.LOAD_GUILD_LIST)
      await store.dispatch(HomeActionTypes.CLOSE_GUILD_LIST_LOADING)
    })

    onBeforeUnmount(async () => {
      /* Reset data */
      await store.dispatch(HomeActionTypes.RESET_GUILD_LIST)
    })

    const onClickNext = async () => {
      console.log('test')
      await store.dispatch(HomeActionTypes.SET_GUILD_LIST_FILTER_OPTION, {
        ...store.state.home.guildListFilterOption,
        offset: store.state.home.guildListFilterOption.offset ? store.state.home.guildListFilterOption.offset + 1 : 1,
      })
      // await store.dispatch(HomeActionTypes.RESET_GUILD_LIST)
      await store.dispatch(HomeActionTypes.OPEN_GUILD_LIST_LOADING)
      await store.dispatch(HomeActionTypes.LOAD_GUILD_LIST)
      window.scroll({
        top: 0,
        behavior: 'smooth',
      })
      await store.dispatch(HomeActionTypes.CLOSE_GUILD_LIST_LOADING)
    }

    return {
      guildList,
      guildListLoading,
      onClickNext,
    }
  }
})
</script>
