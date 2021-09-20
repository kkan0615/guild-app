<template>
  <div
    class="tw-h-full tw-flex tw-items-center tw-space-x-2"
  >
    <c-material-icon
      class="tw-cursor-pointer"
      type="outlined"
      @click="onClickVisibilityBtn(params)"
    >
      visibility
    </c-material-icon>
    <c-material-icon
      class="tw-cursor-pointer"
      type="outlined"
      @click="onClickEditBtn(params)"
    >
      edit
    </c-material-icon>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ICellRendererParams } from 'ag-grid-community'
import CMaterialIcon from '@/components/commons/icons/Material/index.vue'
import { useRouter } from 'vue-router'
import { GuildUserAtAdminUserList } from '@/types/model/auth/user/user'
import { RouterNameEnum } from '@/types/systems/routers/keys'
import useToast from '@/mixins/useToast'

export default defineComponent({
  name: 'MainUserGuildAdminColumnActions',
  components: { CMaterialIcon },
  setup: () => {
    const router = useRouter()
    const { addToast } = useToast()

    const onClickVisibilityBtn = async (params: ICellRendererParams) => {
      const rowData = params.data as GuildUserAtAdminUserList
      try {
        await router.push({ name: RouterNameEnum.GUILD_ADMIN_USER_DETAIL, params: { userId: rowData.id } })
      } catch (e) {
        console.error(e)
        addToast({
          title: 'Redirect error',
          content: '',
          type: 'danger',
        })
      }
    }

    const onClickEditBtn = async (params: ICellRendererParams) => {
      const rowData = params.data as GuildUserAtAdminUserList
      try {
        await router.push({ name: RouterNameEnum.GUILD_ADMIN_USER_EDIT, params: { userId: rowData.id } })
      } catch (e) {
        console.error(e)
        addToast({
          title: 'Redirect error',
          content: '',
          type: 'danger',
        })
      }
    }
    return {
      onClickVisibilityBtn,
      onClickEditBtn,
    }
  }
})
</script>
