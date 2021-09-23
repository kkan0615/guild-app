<template>
  <div
    class="tw-flex tw-items-center"
  >
    <button
      type="button"
      class="btn btn-primary"
      @click="onClickBackBtn"
    >
      back
    </button>
    <c-material-icon
      class="tw-ml-auto tw-text-gray-500 tw-cursor-pointer"
      @click="onClickEditBtn"
    >
      edit
    </c-material-icon>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useRouter } from 'vue-router'
import CMaterialIcon from '@/components/commons/icons/Material/index.vue'
import useToast from '@/mixins/useToast'
import { RouterNameEnum } from '@/types/systems/routers/keys'
import useStore from '@/store'

export default defineComponent({
  name: 'DetailUserGuildAdminHeaderActions',
  components: { CMaterialIcon },
  setup: () => {
    const router = useRouter()
    const store = useStore()
    const { addToast } = useToast()

    const userDetail = computed(() => store.state.guildAdminUser.userDetail)

    const onClickBackBtn = () => {
      router.back()
    }

    const onClickEditBtn = async () =>{
      try {
        if (userDetail.value.id)
          await router.push({ name: RouterNameEnum.GUILD_ADMIN_USER_EDIT, params: { id: userDetail.value.id } })
        else
          throw new Error('no user id')
      } catch (e) {
        console.error(e)
        addToast({
          title: 'Redirect error',
          content: 'Redirect fail',
          type: 'danger',
        })
      }
    }

    return {
      onClickBackBtn,
      onClickEditBtn,
    }
  }
})
</script>
