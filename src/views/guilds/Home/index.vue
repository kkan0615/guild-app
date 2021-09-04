<template>
  <div>
    Guild Home
    <button
      type="button"
      class="btn btn-primary"
      @click="onClickPlaygroundBtn"
    >
      playground
    </button>
    <div>
      <div>
        {{ guildInfo.name }}
      </div>
      <div>
        {{ guildInfo.description }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import useGuildInfoMixin from '@/mixins/useGuildInfoMixin'

export default defineComponent({
  name: 'GuildHome',
  setup: () => {
    const router = useRouter()
    const { guildInfo } = useGuildInfoMixin()

    const onClickPlaygroundBtn = async () =>{
      await router.push({ name: 'Playground' })
    }

    return {
      guildInfo,
      onClickPlaygroundBtn
    }
  }
})
</script>
