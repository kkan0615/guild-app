<template>
  <!-- Button trigger modal -->
  <button
    type="button"
    class="btn btn-primary"
    data-bs-toggle="modal"
    data-bs-target="#exampleModal"
  >
    Launch demo modal
  </button>
  <div
    v-if="display"
    class="modal-backdrop fade show"
  />
  <!-- Modal -->
  <div
    id="exampleModal"
    class="modal show"
    :class="{
      show: display
    }"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    role="dialog"
    :style="`${display ? 'display: block' : ''}`"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5
            id="exampleModalLabel"
            class="modal-title"
          >
            Modal title
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            @click="handleClose"
          />
        </div>
        <div class="modal-body">
          {{ message }}
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
            @click="handleClose"
          >
            Close
          </button>
          <button
            type="button"
            class="btn btn-primary"
          >
            Save changes
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'

export default defineComponent({
  name: 'ConfirmModal',
  setup: () => {
    const message = ref('Hello World')
    const display = ref(true)

    const handleClose = () => {
      display.value = false
    }

    return {
      message,
      display,
      handleClose,
    }
  }
})
</script>
