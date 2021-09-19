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
        :display-count="displayCounts"
        :model-value="offset"
        :max-size="pageMaxSize"
        @click:prev="onClickPrev"
        @click:next="onClickNext"
        @click:page="onClickPage"
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
    const displayCounts = computed(() => store.state.home.guildListFilterOption.displayCounts)
    const pageMaxSize = computed(() => Math.ceil(store.state.home.totalGuildList / store.state.home.guildListFilterOption.limit))
    const offset = computed(() => store.state.home.guildListFilterOption.offset || 0)
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

    const onClickPrev = async () => {
      try {
        await store.dispatch(HomeActionTypes.SET_GUILD_LIST_FILTER_OPTION, {
          ...store.state.home.guildListFilterOption,
          offset: store.state.home.guildListFilterOption.offset ? store.state.home.guildListFilterOption.offset - 1 : 0,
        })
        // await store.dispatch(HomeActionTypes.RESET_GUILD_LIST)
        await store.dispatch(HomeActionTypes.OPEN_GUILD_LIST_LOADING)
        await store.dispatch(HomeActionTypes.LOAD_GUILD_LIST)
        window.scroll({
          top: 0,
          behavior: 'smooth',
        })
        await store.dispatch(HomeActionTypes.CLOSE_GUILD_LIST_LOADING)
      } catch (e) {
        console.error(e)
      }
    }

    const onClickNext = async () => {
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

    const onClickPage = async (pageNum: number) => {
      try {
        await store.dispatch(HomeActionTypes.SET_GUILD_LIST_FILTER_OPTION, {
          ...store.state.home.guildListFilterOption,
          offset: pageNum,
        })
        // await store.dispatch(HomeActionTypes.RESET_GUILD_LIST)
        await store.dispatch(HomeActionTypes.OPEN_GUILD_LIST_LOADING)
        await store.dispatch(HomeActionTypes.LOAD_GUILD_LIST)
        window.scroll({
          top: 0,
          behavior: 'smooth',
        })
        await store.dispatch(HomeActionTypes.CLOSE_GUILD_LIST_LOADING)
      } catch (e) {
        console.error(e)
      }
    }

    return {
      guildList,
      displayCounts,
      pageMaxSize,
      offset,
      guildListLoading,
      onClickPrev,
      onClickNext,
      onClickPage,
    }
  }
})
</script>
