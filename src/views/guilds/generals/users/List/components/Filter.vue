<template>
  <div>
    <c-filter-dropdown
      @click:searchBtn="onClickSearchBtn"
      @click:filterBtn="onClickFilterBtn"
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
import { ref, defineComponent, onMounted, computed } from 'vue'
import CFilterDropdown from '@/components/commons/dropdowns/Filrter/index.vue'
import useStore from '@/store'
import BForm from '@/components/commons/Form/index.vue'
import BBaseInput from '@/components/commons/inputs/Base/index.vue'
import CInputLabel from '@/components/commons/inputs/Label/index.vue'
import { GuildListFilterQuery } from '@/types/model/guilds'
import { GuildUserActionTypes } from '@/store/modules/guilds/generals/users/actions'
import { GuildUserSelectListQuery } from '@/types/model/auth/user/user'

export default defineComponent({
  name: 'GuildUserListFilter',
  components: { CInputLabel, BBaseInput, BForm, CFilterDropdown },
  setup: () => {
    const store = useStore()

    const nicknameRefEl = ref<InstanceType<typeof BBaseInput>>(null)
    const nickname = ref('')

    const userListFilterOption = computed(() => store.state.guildUser.userFilterOption)

    onMounted(() => {
      initData()
    })

    const initData = () => {
      nickname.value = userListFilterOption.value.nickname
    }

    const onClickSearchBtn = () => {
      if (nicknameRefEl.value) {
        nicknameRefEl.value.focus()
      }
    }

    const onClickFilterBtn = async () => {
      try {
        await store.dispatch(GuildUserActionTypes.SET_USER_FILTER_OPTION, {
          ...userListFilterOption.value,
          offset: undefined,
          nickname: nickname.value || undefined,
        } as GuildUserSelectListQuery)
        /* Reload user list */
        await store.dispatch(GuildUserActionTypes.LOAD_USER_LIST)
      } catch (e) {
        console.error(e)
      }
    }

    return {
      nicknameRefEl,
      nickname,
      onClickSearchBtn,
      onClickFilterBtn,
    }
  }
})
</script>
