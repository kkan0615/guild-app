<template>
  <div
    class="tw-h-full tw-flex tw-flex-col tw-p-4"
  >
    <div
      class="tw-text-lg tw-font-bold"
    >
      Create role
    </div>
    <c-divider
      class="tw-my-4"
    />
    <b-form
      @input="isEdited = true"
    >
      <c-horizontal-view>
        <c-horizontal-view-label>
          {{ $t('types.models.guilds.role.fields.name') }}
        </c-horizontal-view-label>
        <c-horizontal-view-content>
          <b-base-input
            id="role-name-input"
            v-model="name"
            placeholder="name"
          />
        </c-horizontal-view-content>
      </c-horizontal-view>
      <b-checkbox
        id="role-is-default-checkbox"
        v-model="isDefault"
        label="Default role"
      />
    </b-form>
    <div
      class="tw-flex tw-space-x-2 tw-mt-auto tw-justify-end"
    >
      <button
        type="button"
        class="btn"
        @click="onClickCancelBtn"
      >
        {{ $t('standardBtnLabels.cancel') }}
      </button>
      <button
        type="button"
        class="btn btn-primary"
        @click="onClickSaveBtn"
      >
        {{ $t('standardBtnLabels.create') }}
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue'
import useStore from '@/store'
import { GuildAdminRoleActionTypes } from '@/store/modules/guilds/admins/Role/actions'
import BForm from '@/components/commons/Form/index.vue'
import CHorizontalView from '@/components/commons/HorizontalView/index.vue'
import CHorizontalViewLabel from '@/components/commons/HorizontalView/components/Label.vue'
import CHorizontalViewContent from '@/components/commons/HorizontalView/components/Content.vue'
import BBaseInput from '@/components/commons/inputs/Base/index.vue'
import BCheckbox from '@/components/commons/inputs/Checkbox/index.vue'
import { useI18n } from 'vue-i18n'
import useToast from '@/mixins/useToast'
import { GuildRoleCreateForm, GuildRoleUpdateForm } from '@/types/model/guilds/role'
import CDivider from '@/components/commons/Divider/index.vue'
import { router } from '@/router'
import { RouterNameEnum } from '@/types/systems/routers/keys'

export default defineComponent({
  name: 'FormRoleGuildAdmin',
  components: { CDivider, BCheckbox, BBaseInput, CHorizontalViewContent, CHorizontalViewLabel, CHorizontalView, BForm },
  setup: () => {
    const store = useStore()
    const i18n = useI18n()
    const { addToast } = useToast()

    const isEdited = ref(false)
    const name = ref('')
    const color = ref('')
    const isDefault = ref(false)
    const saveBtnLoading = ref(false)

    const roleList = computed(() => store.state.guildAdminRole.roleList)

    onMounted(async () => {
      try {
        /* For in case, it has selected role */
        await store.dispatch(GuildAdminRoleActionTypes.RESET_SELECTED_ROLE)
      } catch (e) {
        console.error(e)
      }
    })

    const onClickCancelBtn = async () => {
      if (isEdited.value && confirm('Would you like to cancel?')) {
        router.back()
      } else {
        router.back()
      }
    }

    const onClickSaveBtn = async () => {
      saveBtnLoading.value = true
      try {
        const createdId = await store.dispatch(GuildAdminRoleActionTypes.CREATE_ROLE, {
          name: name.value,
          color: color.value,
          default: isDefault.value,
          index: roleList.value.length,
        } as GuildRoleCreateForm)
        /* Reload role list */
        await store.dispatch(GuildAdminRoleActionTypes.LOAD_ROLE_LIST)
        /* Move to Detail */
        await router.push({ name: RouterNameEnum.GUILD_ADMIN_ROLE_DETAIL, params: { id: createdId } })
        addToast({
          title: i18n.t('standardToastTitle.saved'),
          content: i18n.t('standardResult.created'),
          type: 'success',
        })
      } catch (e) {
        console.error(e)
        addToast({
          title: i18n.t('standardToastTitle.failed'),
          content: i18n.t('standardResult.failed'),
          type: 'danger',
        })
      } finally {
        saveBtnLoading.value = true
      }
    }

    return {
      isEdited,
      name,
      color,
      isDefault,
      onClickCancelBtn,
      onClickSaveBtn,
    }
  }
})
</script>
