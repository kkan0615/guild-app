<template>
  <div
    class="md:tw-flex md:tw-justify-center"
  >
    <div
      class="md:tw-w-1/2"
    >
      <detail-user-guild-admin-header-actions />
      <div
        class="tw-flex tw-justify-center tw-mb-12"
      >
        <t-avatar
          size="72"
          class="tw-ring tw-rounded-full tw-mr-2"
          :src="user.img"
          :name="user.nickname"
        />
      </div>
      <!--      <div>-->
      <!--        <div>-->
      <!--          {{ user.nickname }}-->
      <!--        </div>-->
      <!--        <div>-->
      <!--          {{ user.role.name }}-->
      <!--        </div>-->
      <!--        <div>-->
      <!--          {{ user.email }}-->
      <!--        </div>-->
      <!--      </div>-->
      <div
        class="tw-font-bold tw-text-md tw-mb-2"
      >
        User information
      </div>
      <table
        class="tw-w-full"
      >
        <tbody
          class="tw-text-sm"
        >
          <tr>
            <th
              class="tw-border tw-border-gray-400 tw-p-2 tw-bg-gray-300 tw-w-1/3"
            >
              {{ $t('types.models.guilds.user.fields.nickname') }}
            </th>
            <td
              class="tw-border tw-border-gray-400 tw-p-2"
            >
              {{ user.nickname }}
            </td>
          </tr>
          <tr>
            <th
              class="tw-border tw-border-gray-400 tw-p-2 tw-bg-gray-300 tw-w-1/3"
            >
              {{ $t('types.models.guilds.role.fields.name') }}
            </th>
            <td
              v-if="user.role"
              class="tw-border tw-border-gray-400 tw-p-2"
            >
              <tag-badge
                :color="user.role.color"
              >
                {{ user.role.name }}
              </tag-badge>
            </td>
          </tr>
          <tr>
            <th
              class="tw-border tw-border-gray-400 tw-p-2 tw-bg-gray-300 tw-w-1/3"
            >
              {{ $t('types.models.guilds.user.fields.email') }}
            </th>
            <td
              class="tw-border tw-border-gray-400 tw-p-2"
            >
              {{ user.email }}
            </td>
          </tr>
          <tr>
            <th
              class="tw-border tw-border-gray-400 tw-p-2 tw-bg-gray-300 tw-w-1/3"
            >
              {{ $t('types.models.auth.user.fields.auth') }}
            </th>
            <td
              class="tw-border tw-border-gray-400 tw-p-2"
            >
              {{ user.auth }}
            </td>
          </tr>
          <tr>
            <th
              class="tw-border tw-border-gray-400 tw-p-2 tw-bg-gray-300 tw-w-1/3"
            >
              {{ $t('types.models.guilds.user.fields.description') }}
            </th>
            <td
              class="tw-border tw-border-gray-400 tw-p-2"
            >
              {{ user.description || '' }}
            </td>
          </tr>
          <tr>
            <th
              class="tw-border tw-border-gray-400 tw-p-2 tw-bg-gray-300 tw-w-1/3"
            >
              {{ $t('types.models.guilds.user.fields.remark') }}
            </th>
            <td
              class="tw-border tw-border-gray-400 tw-p-2"
            >
              {{ user.remark || '' }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from 'vue'
import useStore from '@/store'
import { useRoute, useRouter } from 'vue-router'
import { GuildAdminUserActionTypes } from '@/store/modules/guilds/admins/User/actions'
import TAvatar from '@/components/tailwinds/Avatar/index.vue'
import TagBadge from '@/components/badeges/Tag/index.vue'
import DetailUserGuildAdminHeaderActions from '@/views/guilds/admins/users/Detail/components/HeaderActions.vue'

export default defineComponent({
  name: 'DetailUserGuildAdmin',
  components: { DetailUserGuildAdminHeaderActions, TagBadge, TAvatar },
  setup: () => {
    const store = useStore()
    const route = useRoute()
    const router = useRouter()

    const user = computed(() => store.state.guildAdminUser.userDetail)

    onMounted(async () => {
      const { userId } = route.params
      if (userId) {
        try {
          await store.dispatch(GuildAdminUserActionTypes.LOAD_USER_DETAIL, userId as string)
        } catch (e) {
          console.error(e)
          router.back()
        }
      } else {
        router.back()
      }
    })

    return {
      user,
    }
  }
})
</script>
