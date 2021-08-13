<template>
  <div>
    <form
      class="tw-flex tw-flex-col tw-gap-y-2"
    >
      <!--   title   -->
      <div>
        <label
          for="title"
          class="form-label"
        >
          Title
        </label>
        <input
          id="title"
          type="text"
          class="form-control"
          placeholder="title"
        >
      </div>
      <!--   description   -->
      <div>
        <label
          for="description"
          class="form-label"
        >
          Description
        </label>
        <input
          id="description"
          type="text"
          class="form-control"
          placeholder="description"
        >
      </div>
    </form>
    <hr
      class="my-2"
    >
    <!--  actions  -->
    <div
      class="tw-flex tw-gap-x-2"
    >
      <span
        class="tw-ml-auto"
      />
      <button
        v-if="currentIndex === 0"
        type="button"
        class="btn btn-outline-primary"
        @click="onClickCancelBtn"
      >
        Cancel
      </button>
      <button
        v-else
        type="button"
        class="btn btn-outline-primary"
        @click="onClickBackBtn"
      >
        Prev
      </button>
      <!--   next or save   -->
      <button
        v-if="currentIndex === 3"
        type="button"
        class="btn btn-primary"
        @click="onClickSaveBtn"
      >
        Save
      </button>
      <button
        v-else
        type="button"
        class="btn btn-primary"
        @click="onClickNextBtn"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'
import { useRouter } from 'vue-router'
export default defineComponent({
  name: 'HomeGuildForm',
  setup: () => {
    const router = useRouter()

    const currentIndex = ref(0)
    const title = ref('')
    const description = ref('')

    const onClickSaveBtn = () => {
      alert('saved')
    }

    const onClickCancelBtn = async () => {
      await router.go(-1)
    }

    const onClickNextBtn = () => {
      currentIndex.value += 1
    }

    const onClickBackBtn = () => {
      currentIndex.value -= 1
    }

    return {
      onClickSaveBtn,
      onClickCancelBtn,
      onClickNextBtn,
      onClickBackBtn,
      currentIndex,
      title,
      description
    }
  }
})
</script>
