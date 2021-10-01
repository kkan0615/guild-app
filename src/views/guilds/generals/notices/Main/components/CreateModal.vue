<template>
  <!-- Button trigger modal -->
  <button
    type="button"
    class="btn btn-primary"
    data-bs-toggle="modal"
    data-bs-target="#create-form-modal"
  >
    Launch demo modal
  </button>

  <!-- Modal -->
  <div
    id="create-form-modal"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="create-form-modal"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
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
          />
        </div>
        <div class="modal-body">
          <main-guild-notice-form />
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn"
            data-bs-dismiss="modal"
          >
            {{ $t('standardBtnLabels.cancel') }}
          </button>
          <button
            type="button"
            class="btn btn-primary"
          >
            {{ $t('standardBtnLabels.save') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script
    lang="ts"
>
export default {
  name: 'MainGuildNoticeCreateForm',
}
</script>
<script setup lang="ts">
import { ref } from 'vue'
import MainGuildNoticeForm from '@/views/guilds/generals/notices/Main/components/Form.vue'
</script>
