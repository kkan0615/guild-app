<template>
  <div>
    <!--  Form  -->
    <div
      class="md:tw-w-1/2 tw-px-2"
    >
      <main-information-guild-admin-form
        @input="onInputFromForm"
        @edited="onEdited"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, onBeforeUnmount } from 'vue'
import MainInformationGuildAdminForm from '@/views/guilds/admins/information/Main/components/Form.vue'
import { RouterNameEnum } from '@/types/systems/routers/keys'

export default defineComponent({
  name: 'MainInformationGuildAdmin',
  components: {
    MainInformationGuildAdminForm
  },
  setup: () => {
    const isChanged = ref(false)
    const onInputFromForm = () => {
      isChanged.value = true
    }

    onBeforeUnmount(() => {
      if (isChanged.value) {
        confirm('Changed data is not saved')
      }
    })

    /**
     * Edit button is clicked and event is success
     */
    const onEdited = () =>{
      isChanged.value = false
    }

    return {
      RouterNameEnum,
      onInputFromForm,
      onEdited,
    }
  }
})
</script>
