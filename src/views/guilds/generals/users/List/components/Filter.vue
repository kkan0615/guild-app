<template>
  <div>
    <c-filter-dropdown
      @click:searchBtn="onClickSearchBtn"
    >
      <b-form>
        <!--    Name    -->
        <div>
          <c-input-label>
            Name
          </c-input-label>
          <b-base-input
            id="guild-user-name-input"
            ref="nicknameRefEl"
            v-model="nickname"
            placeholder="nickname"
          />
        </div>
      </b-form>
    </c-filter-dropdown>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, onMounted } from 'vue'
import CFilterDropdown from '@/components/commons/dropdowns/Filrter/index.vue'
import useStore from '@/store'
import BForm from '@/components/commons/Form/index.vue'
import BBaseInput from '@/components/commons/inputs/Base/index.vue'
import CInputLabel from '@/components/commons/inputs/Label/index.vue'

export default defineComponent({
  name: 'GuildUserListFilter',
  components: { CInputLabel, BBaseInput, BForm, CFilterDropdown },
  setup: () => {
    const store = useStore()

    const nicknameRefEl = ref<InstanceType<typeof BBaseInput>>(null)
    const nickname = ref('')

    const userListFilterOption = store.state.guildUser.userFilterOption

    onMounted(() => {
      initData()
    })

    const initData = () => {
      nickname.value = userListFilterOption.nickname
    }

    const onClickSearchBtn = () => {
      if (nicknameRefEl.value) {
        nicknameRefEl.value.focus()
      }
    }

    return {
      nicknameRefEl,
      nickname,
      onClickSearchBtn,
    }
  }
})
</script>
