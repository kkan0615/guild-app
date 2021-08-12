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
    <div
      v-for="i in 100"
      :key="i"
    >
      Home is here! -{{ i }}
      <button
        type="button"
        class="btn btn-primary"
      >
        Primary
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'GuildHome',
  setup: () => {
    const count = ref(0)
    const router = useRouter()

    const onClickPlaygroundBtn = async () =>{
      await router.push({ name: 'Playground' })
    }

    return { count, onClickPlaygroundBtn }
  }
})
</script>
