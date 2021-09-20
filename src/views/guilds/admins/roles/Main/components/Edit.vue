<template>
  <div
    class="tw-h-full tw-flex tw-flex-col"
  >
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
        {{ $t('standardBtnLabels.save') }}
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue'
import useStore from '@/store'
import CHorizontalView from '@/components/commons/HorizontalView/index.vue'
import CHorizontalViewLabel from '@/components/commons/HorizontalView/components/Label.vue'
import CHorizontalViewContent from '@/components/commons/HorizontalView/components/Content.vue'
import BBaseInput from '@/components/commons/inputs/Base/index.vue'
import BForm from '@/components/commons/Form/index.vue'
import BCheckbox from '@/components/commons/inputs/Checkbox/index.vue'
import { GuildAdminRoleActionTypes } from '@/store/modules/guilds/admins/Role/actions'
import { GuildRoleUpdateForm } from '@/types/model/guilds/role'
import useToast from '@/mixins/useToast'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'MainRoleGuildAdminEdit',
  components: { BCheckbox, BForm, BBaseInput, CHorizontalViewContent, CHorizontalViewLabel, CHorizontalView },
  setup: () => {
    const store = useStore()
    const i18n = useI18n()
    const { addToast } = useToast()

    const isEdited = ref(false)
    const name = ref('')
    const color = ref('')
    const isDefault = ref(false)
    const isAbleToChangeDefault = ref(true)
    const saveBtnLoading = ref(false)

    const selectedRole = computed(() => store.state.guildAdminRole.selectedRole)

    onMounted(async () => {
      initDate()
    })

    const initDate = () =>{
      name.value = selectedRole.value.name
      color.value = selectedRole.value.color || ''
      isDefault.value = selectedRole.value.default

      /* It's not allowed to change if it's default */
      if (selectedRole.value.default) {
        isAbleToChangeDefault.value = false
      }
    }

    const onClickCancelBtn = async () => {
      if (isEdited.value && confirm('Would you like to cancel?')) {
        try {
          await store.dispatch(GuildAdminRoleActionTypes.SET_MODE, 'READ')
        } catch (e) {
          console.error(e)
        }
      } else {
        try {
          await store.dispatch(GuildAdminRoleActionTypes.SET_MODE, 'READ')
        } catch (e) {
          console.error(e)
        }
      }
    }

    const onClickSaveBtn = async () => {
      saveBtnLoading.value = true
      try {
        await store.dispatch(GuildAdminRoleActionTypes.UPDATE_ROLE, {
          id: selectedRole.value.id,
          name: name.value,
          color: color.value,
          default: isDefault.value,
          index: selectedRole.value.index,
        } as GuildRoleUpdateForm)
        /* Reload role list */
        await store.dispatch(GuildAdminRoleActionTypes.LOAD_ROLE_LIST)
        /* reload selected role */
        await store.dispatch(GuildAdminRoleActionTypes.LOAD_SELECTED_ROLE, selectedRole.value.id)
        /* Change mode to 'READ' */
        await store.dispatch(GuildAdminRoleActionTypes.SET_MODE, 'READ')
        addToast({
          title: i18n.t('standardToastTitle.saved'),
          content: i18n.t('standardResult.updated'),
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
      selectedRole,
      onClickCancelBtn,
      onClickSaveBtn,
    }
  }
})
</script>
