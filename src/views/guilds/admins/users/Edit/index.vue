<template>
  <div
    class="md:tw-w-2/3"
  >
    <div
      class="tw-text-lg tw-font-bold"
    >
      Guild User Edit
    </div>
    <c-divider
      class="tw-my-4"
    />
    <b-form>
      <!--   Nickname   -->
      <c-horizontal-view>
        <c-horizontal-view-label>
          {{ $t('types.models.guilds.user.fields.nickname') }}
        </c-horizontal-view-label>
        <c-horizontal-view-content>
          <b-base-input
            id="user-nickname-input"
            v-model="nickname"
            disabled
            placeholder="nickname"
          />
        </c-horizontal-view-content>
      </c-horizontal-view>
      <!--   Nickname   -->
      <c-horizontal-view>
        <c-horizontal-view-label>
          {{ $t('types.models.guilds.user.fields.email') }}
        </c-horizontal-view-label>
        <c-horizontal-view-content>
          <b-base-input
            id="user-nickname-input"
            v-model="email"
            disabled
            placeholder="nickname"
          />
        </c-horizontal-view-content>
      </c-horizontal-view>
      <!--   description   -->
      <c-horizontal-view>
        <c-horizontal-view-label>
          {{ $t('types.models.guilds.user.fields.description') }}
        </c-horizontal-view-label>
        <c-horizontal-view-content>
          <b-textarea
            id="user-description-input"
            v-model="description"
            disabled
          />
        </c-horizontal-view-content>
      </c-horizontal-view>
      <!--   Role id   -->
      <c-horizontal-view>
        <c-horizontal-view-label>
          {{ $t('types.models.guilds.role.fields.name') }}
        </c-horizontal-view-label>
        <c-horizontal-view-content>
          <c-multiple-select
            id="user-role-id-select"
            v-model="roleId"
            placeholder="Role"
            :options="roleList"
            mode="single"
          />
        </c-horizontal-view-content>
      </c-horizontal-view>
      <!--   remark   -->
      <c-horizontal-view>
        <c-horizontal-view-label>
          {{ $t('types.models.guilds.user.fields.remark') }}
        </c-horizontal-view-label>
        <c-horizontal-view-content>
          <b-textarea
            id="user-remark-input"
            v-model="remark"
          />
        </c-horizontal-view-content>
      </c-horizontal-view>
      <div
        class="tw-flex tw-items-center tw-space-x-2 tw-justify-end"
      >
        <button
          type="button"
          class="btn btn-outline"
          @click="onClickCancelBtn"
        >
          {{ $t('standardBtnLabels.cancel') }}
        </button>
        <button
          type="button"
          class="btn btn-primary"
          @click="onClickSaveBtn"
        >
          {{ $t('standardBtnLabels.edit') }}
        </button>
      </div>
    </b-form>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeUnmount, onMounted, ref } from 'vue'
import BForm from '@/components/commons/Form/index.vue'
import { GuildAdminUserActionTypes } from '@/store/modules/guilds/admins/User/actions'
import useStore from '@/store'
import { useRoute, useRouter } from 'vue-router'
import CMultipleSelect from '@/components/commons/inputs/Tags/index.vue'
import CInputLabel from '@/components/commons/inputs/Label/index.vue'
import { MultiselectOption } from '@/utils/libs/multiselect'
import BBaseInput from '@/components/commons/inputs/Base/index.vue'
import CHorizontalView from '@/components/commons/HorizontalView/index.vue'
import CHorizontalViewLabel from '@/components/commons/HorizontalView/components/Label.vue'
import CHorizontalViewContent from '@/components/commons/HorizontalView/components/Content.vue'
import BTextarea from '@/components/commons/inputs/Textarea/index.vue'
import CDivider from '@/components/commons/Divider/index.vue'
import { GuildUserFormAtAdminUser } from '@/types/model/guilds/user'
import useToast from '@/mixins/useToast'
import { useI18n } from 'vue-i18n'
import { RouterNameEnum } from '@/types/systems/routers/keys'

export default defineComponent({
  name: 'EditUserGuildAdmin',
  components: {
    CDivider,
    BTextarea,
    CHorizontalViewContent,
    CHorizontalViewLabel, CHorizontalView, BBaseInput, CInputLabel, CMultipleSelect, BForm },
  setup: () => {
    const store = useStore()
    const route = useRoute()
    const router = useRouter()
    const i18n = useI18n()
    const { addToast } = useToast()

    const nickname = ref('')
    const email = ref('')
    const roleId = ref('')
    const description = ref('')
    const remark = ref('')

    const userDetail = computed(() => store.state.guildAdminUser.userDetail)
    const roleList = computed(() => store.state.guildAdminUser.roleList.map(role => {
      return { value: role.id, label: role.name } as MultiselectOption
    }))

    onMounted(async () => {
      const { userId } = route.params
      if (userId) {
        try {
          await store.dispatch(GuildAdminUserActionTypes.LOAD_USER_DETAIL, userId as string)
          await store.dispatch(GuildAdminUserActionTypes.LOAD_ROLE_LIST)
          initData()
        } catch (e) {
          console.error(e)
          router.back()
        }
      } else {
        router.back()
      }
    })

    onBeforeUnmount(async () => {
      try {
        await store.dispatch(GuildAdminUserActionTypes.RESET_USER_DETAIL)
        await store.dispatch(GuildAdminUserActionTypes.RESET_ROLE_LIST)
      } catch (e) {
        console.error(e)
        router.back()
      }
    })

    const initData = () => {
      nickname.value = userDetail.value.nickname
      email.value = userDetail.value.email
      roleId.value = userDetail.value.roleId
    }

    const onClickSaveBtn = async () => {
      try {
        await store.dispatch(GuildAdminUserActionTypes.UPDATE_GUILD_USER_INFO, {
          roleId: roleId.value,
          remark: remark.value,
        } as GuildUserFormAtAdminUser)
        // /* Reload detail */
        // await store.dispatch(GuildAdminUserActionTypes.LOAD_USER_DETAIL, userDetail.value.uid)
        await router.push({ name: RouterNameEnum.GUILD_ADMIN_USER_DETAIL, params: { userId: userDetail.value.id } })
        addToast({
          title: 'Success',
          type: 'success',
          content: i18n.t('standardResult.saved'),
        })
      } catch (e) {
        console.error(e)
        addToast({
          title: i18n.t('standardToastTitle.failed'),
          content: i18n.t('standardResult.failed'),
          type: 'danger',
        })
      }
    }

    const onClickCancelBtn = () => {
      router.back()
    }

    return {
      roleList,
      nickname,
      email,
      roleId,
      description,
      remark,
      onClickSaveBtn,
      onClickCancelBtn,
    }
  }
})
</script>
