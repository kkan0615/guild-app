<template>
  <div
    v-if="guildInfo"
  >
    <!--  header  -->
    <div
      class="tw-flex"
    >
      <button
        class="btn btn-primary tw-ml-auto tw-w-24"
        type="button"
      >
        Join
      </button>
    </div>
    <div
      class="text-center"
    >
      <div
        class="tw-flex tw-justify-center"
      >
        <img
          class="tw-rounded-full tw-border tw-border-black tw-w-44 tw-h-44"
          :src="guildInfo.img"
          alt="logo"
        >
      </div>
      <div
        class="tw-text-xl tw-font-black"
      >
        {{ guildInfo.name }}
      </div>
      <div>
        {{ guildInfo.description }}
      </div>
      <div
        v-if="guildInfo.mainManger"
      >
        <span
          class="tw-text-gray-500"
        >
          Manager:
        </span>
        <span>
          {{ guildInfo.mainManger.nickname }}
        </span>
      </div>
    </div>
    <div
      class="mb-4"
    >
      User List ({{ rows ? rows.length : 0 }})
      <c-ag-grid
        v-if="rows"
        :columns="columns"
        :rows="rows"
      />
    </div>
    <button
      :disabled="isJoined"
      class="btn btn-primary tw-ml-auto tw-w-full"
      type="button"
      @click="onClickJoinBtn"
    >
      Join to the {{ guildInfo.name }}
    </button>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import useStore from '@/store'
import { HomeActionTypes } from '@/store/modules/home/actions'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'
import CAgGrid from '@/components/commons/AgGrid/index.vue'
import { UserColumn } from '@/types/model/auth/user/column'
import RoleColumnBadge from '@/components/columns/badges/Role.vue'
import { RouterNameEnum } from '@/types/systems/routers/keys'
import useUserMixin from '@/mixins/useUserMixin'

export default defineComponent({
  name: 'HomeGuildDetail',
  components: {
    RoleColumnBadge, // Use in Column component
    CAgGrid,
  },
  setup: () => {
    const route = useRoute()
    const router = useRouter()
    const store = useStore()
    const { loggedInUser, isLoggedIn } = useUserMixin()

    const defaultColumn = {
      resizable: true,
    }
    const columns = UserColumn

    const rows = computed(() => guildInfo.value.members)
    const guildInfo = computed(() => store.state.home.guildInfo)
    const isJoined = computed(() => {
      if (!loggedInUser)
        return false

      console.log(loggedInUser.value.guildList.findIndex(guild => guild.uid === guildInfo.value.uid))

      return loggedInUser.value.guildList.findIndex(guild => guild.uid === guildInfo.value.uid) >= 0
    })

    onMounted(async () => {
      const guildId = route.params.id as string
      /* If guildId ex */
      if (guildId) {
        await store.dispatch(HomeActionTypes.LOAD_GUILD_INFO, guildId)
      } else {
        // @TODO: Redirect 404 page, but now is just send back
        router.back()
      }
    })

    const onClickJoinBtn = async () => {
      if (confirm(`Would like to join to ${guildInfo.value.name}`)) {
        await store.dispatch(HomeActionTypes.JOIN_TO_GUILD, guildInfo.value.uid)
        await router.push({ name: RouterNameEnum.GUILD_HOME, params: { id: guildInfo.value.uid } })
      }
    }

    return {
      defaultColumn,
      columns,
      rows,
      guildInfo,
      isJoined,
      isLoggedIn,
      onClickJoinBtn,
    }
  }
})
</script>
