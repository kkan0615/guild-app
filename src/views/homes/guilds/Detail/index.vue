<template>
  <div
    v-if="guildInfo"
  >
    <div
      class="text-center"
    >
      <div
        class="tw-flex tw-justify-center tw-mb-2"
      >
        <img
          class="tw-rounded-full tw-border tw-border-black tw-w-44 tw-h-44"
          :src="guildInfo.img"
          alt="img"
        >
      </div>
      <div
        class="tw-text-xl tw-font-black"
      >
        {{ guildInfo.name }}
      </div>
      <!--   Introduction   -->
      <div
        class="tw-whitespace"
      >
        {{ guildInfo.introduction }}
      </div>
      <!--   Manage div   -->
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
      <!--   Created At div   -->
      <div
        v-if="guildInfo.mainManger"
      >
        <span
          class="tw-text-gray-500"
        >
          Created At:
        </span>
        <span>
          {{ formattedCreatedAt }}
        </span>
      </div>
    </div>
    <!--   tags   -->
    <div
      class="my-2"
    >
      <div
        class="tw-text-xl mb-1"
      >
        Tags
      </div>
      <c-divider
        class="tw-mb-2"
      />
      <div
        v-if="guildInfo.tags"
        class="tw-flex flex- gap-2 tw-w-full tw-flex-wrap tw-py-2"
      >
        <tag-badge
          v-for="tag in guildInfo.tags"
          :key="tag.id"
          :color="tag.color"
        >
          {{ tag.name }}
        </tag-badge>
      </div>
    </div>
    <!--  description  -->
    <div
      class="tw-text-xl mb-1"
    >
      Description
    </div>
    <c-divider />
    <div
      class="tw-whitespace-pre-wrap tw-py-2"
    >
      {{ guildInfo.description }}
    </div>
    <c-divider />
    <div
      class="mb-4"
    >
      <div
        class="tw-text-xl mb-1"
      >
        User List ({{ rows ? rows.length : 0 }})
      </div>
      <c-ag-grid
        v-if="rows"
        :columns="columns"
        :rows="rows"
      />
    </div>
    <!--  Join to guild button  -->
    <!--  If the logged in user is not joined  -->
    <!--    <button-->
    <!--      v-if="!isJoined && isLoggedIn"-->
    <!--      class="btn btn-primary tw-ml-auto tw-w-full"-->
    <!--      type="button"-->
    <!--      @click="onClickJoinBtn"-->
    <!--    >-->
    <!--      Join to the {{ guildInfo.name }}-->
    <!--    </button>-->
    <home-guild-detail-join-form
      v-if="!isJoined && isLoggedIn"
    />
    <!--  If the logged in user is already joined  -->
    <button
      v-else-if="isJoined && isLoggedIn"
      class="btn btn-primary tw-ml-auto tw-w-full"
      type="button"
      @click="onClickMoveGuildBtn"
    >
      Move to the {{ guildInfo.name }}
    </button>
    <!--  @TODO: 로그인 만들기  -->
    <button
      v-else
      class="btn btn-primary tw-ml-auto tw-w-full"
      type="button"
    >
      Login and Join to Guild
    </button>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import useStore from '@/store'
import { HomeActionTypes } from '@/store/modules/home/actions'
import CAgGrid from '@/components/commons/AgGrid/index.vue'
import { UserColumn } from '@/types/model/auth/user/column'
import RoleColumnBadge from '@/components/columns/badges/Role.vue'
import { RouterNameEnum } from '@/types/systems/routers/keys'
import useUserMixin from '@/mixins/useUserMixin'
import TagBadge from '@/components/badeges/Tag/index.vue'
import CDivider from '@/components/commons/Divider/index.vue'
import dayjs from 'dayjs'
import HomeGuildDetailJoinForm from '@/views/homes/guilds/Detail/components/JoinForm.vue'

export default defineComponent({
  name: 'HomeGuildDetail',
  components: {
    HomeGuildDetailJoinForm,
    CDivider,
    TagBadge,
    RoleColumnBadge, // Use in Column component
    CAgGrid,
  },
  setup: () => {
    const route = useRoute()
    const router = useRouter()
    const store = useStore()
    const { loggedInUser, isLoggedIn } = useUserMixin()

    const columns = UserColumn

    const rows = computed(() => guildInfo.value.members)
    const guildInfo = computed(() => store.state.home.guildInfo)
    const isJoined = computed(() => {
      if (!loggedInUser)
        return false
      return loggedInUser.value.guildList.findIndex(guild => guild.id === guildInfo.value.id) >= 0
    })
    const formattedCreatedAt = computed(() => dayjs(guildInfo.value.createdAt).format('ll'))

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
        await store.dispatch(HomeActionTypes.JOIN_TO_GUILD, guildInfo.value.id)
        /* If permission is not required */
        if (!guildInfo.value.isRequirePermission) {
          await router.push({ name: RouterNameEnum.GUILD_HOME, params: { guildId: guildInfo.value.id } })
        }
      }
    }

    const onClickMoveGuildBtn = async () => {
      await router.push({ name: RouterNameEnum.GUILD_HOME, params: { guildId: guildInfo.value.id } })
    }

    return {
      columns,
      rows,
      guildInfo,
      isJoined,
      isLoggedIn,
      formattedCreatedAt,
      onClickJoinBtn,
      onClickMoveGuildBtn,
    }
  }
})
</script>
