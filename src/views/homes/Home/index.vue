<template>
  <div
    class="tw-h-full"
  >
    <div
      class="tw-flex"
    >
      <div
        class="tw-flex tw-items-center tw-w-2/5"
      >
        <div
          class="tw-w-full"
        >
          <div
            class="tw-text-2xl mb-2"
          >
            Find and Join the Guild!
          </div>
          <div
            class="tw-flex"
          >
            <input
              type="text"
              class="form-control"
              aria-label="search"
              aria-describedby="inputGroup-sizing-lg"
            >
            <button
              type="button"
              class="btn btn-primary tw-ml-1"
            >
              search
            </button>
          </div>
        </div>
      </div>
      <div
        class="tw-w-3/5"
      >
        <img
          style="height: 570px; width: 100%"
          alt="home"
          src="../../../assets/home/home-image.jpg"
        >
      </div>
    </div>
    <p
      v-for="i in 100"
      :key="i"
    >
      test ={{ i }}
    </p>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'
import { useRouter } from 'vue-router'
export default defineComponent({
  name: 'Home',
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
