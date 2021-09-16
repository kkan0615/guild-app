<template>
  <div
    class="tw-h-full tw-flex tw-flex-col"
  >
    <b-form
      @input="isEdited = true"
    >
      <c-horizontal-view>
        <c-horizontal-view-label>
          Role name
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
      class="tw-flex tw-gap-x-2 tw-mt-auto tw-justify-end"
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

export default defineComponent({
  name: 'MainRoleGuildAdminEdit',
  components: { BCheckbox, BForm, BBaseInput, CHorizontalViewContent, CHorizontalViewLabel, CHorizontalView },
  setup: () => {
    const store = useStore()

    const isEdited = ref(false)
    const name = ref('')
    const color = ref('')
    const isDefault = ref(false)

    const selectedRole = computed(() => store.state.guildAdminRole.selectedRole)

    onMounted(async () => {
      initDate()
    })

    const initDate = () =>{
      name.value = selectedRole.value.name
      color.value = selectedRole.value.color
      isDefault.value = selectedRole.value.default
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

    return {
      isEdited,
      name,
      color,
      isDefault,
      selectedRole,
      onClickCancelBtn,
    }
  }
})
</script>
