<template>
  <div
    v-if="guildInfo"
  >
    <!--  header  -->
    <div
      class="tw-flex"
    >
      <button
        class="btn btn-primary tw-ml-auto tw-w-24"
        type="button"
      >
        Join
      </button>
    </div>
    <div>
      {{ guildInfo }}
    </div>
    <div
      class="text-center"
    >
      <div
        class="tw-flex tw-justify-center"
      >
        <img
          class="tw-rounded-full tw-border tw-border-black tw-w-44 tw-h-44"
          :src="guildInfo.img"
          alt="logo"
        >
      </div>
      <div
        class="tw-text-xl tw-font-black"
      >
        {{ guildInfo.name }}
      </div>
      <div>
        {{ guildInfo.description }}
      </div>
      <div>
        Manager data
      </div>
    </div>
    <div>
      User List!
    </div>
    <button
      class="btn btn-primary tw-ml-auto tw-w-full"
      type="button"
    >
      Join to the {{ guildInfo.name }}
    </button>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import useStore from '@/store'
import { HomeActionTypes } from '@/store/modules/home/actions'

export default defineComponent({
  name: 'HomeGuildDetail',
  setup: () => {
    const route = useRoute()
    const router = useRouter()
    const store = useStore()

    const guildInfo = computed(() => store.state.home.guildInfo)

    onMounted(async () => {
      const guildId = route.params.id
      /* If guildId ex */
      if (guildId) {
        await store.dispatch(HomeActionTypes.LOAD_GUILD_INFO, guildId)
      } else {
        // @TODO: Redirect 404 page, but now is just send back
        router.back()
      }
    })

    return {
      guildInfo
    }
  }
})
</script>
