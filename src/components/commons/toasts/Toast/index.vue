<template>
  <div
    ref="toastRef"
    class="toast"
    role="alert"
    aria-live="assertive"
    aria-atomic="true"
    data-bs-delay="2500"
  >
    <div class="toast-header">
      <!--      <img-->
      <!--        class="rounded me-2"-->
      <!--        alt="Logo"-->
      <!--      >-->
      <strong
        v-if="toast.title"
        class="me-auto"
      >
        {{ toast.title }}
      </strong>
      <small
        v-if="calendarTime"
        class="text-muted"
      >
        {{ calendarTime }}
      </small>
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="toast"
        aria-label="Close"
        @click="onClickCloseBtn"
      />
    </div>
    <div class="toast-body">
      {{ toast.content }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed, ref, onMounted, onUnmounted } from 'vue'
import { Toast } from '@/types/systems/toast'
import dayjs from 'dayjs'
import useStore from '@/store'
import { Toast as BToast } from 'bootstrap'
import { ApplicationActionTypes } from '@/store/modules/applications/actions'

export default defineComponent({
  name: 'BToast',
  props: {
    toast: {
      type: Object as PropType<Toast>,
      required: false,
      default: () => {}
    }
  },
  setup: (props) => {
    const store = useStore()

    const toastRef = ref<HTMLDivElement | undefined>(undefined)

    const calendarTime = computed(() => {
      if (!props.toast.createdAt) {
        return ''
      }
      const formattedCreatedAt = dayjs(props.toast.createdAt)
      return  formattedCreatedAt.fromNow()
    })

    onMounted(() => {
      if (toastRef.value) {
        const toast = new BToast(toastRef.value as any)
        toastRef.value.addEventListener('hide.bs.toast', handleCloseEvent)
        toast.show()
      }
    })

    onUnmounted(() => {
      if (toastRef.value) {
        const toast = new BToast(toastRef.value as any)
        toast.hide()
        toastRef.value.removeEventListener('hide.bs.toast', handleCloseEvent)
      }
    })

    const handleCloseEvent = async () => {
      await store.dispatch(ApplicationActionTypes.REMOVE_TOAST)
    }

    const onClickCloseBtn = async () => {
      await store.dispatch(ApplicationActionTypes.REMOVE_TOAST)
    }

    return {
      toastRef,
      calendarTime,
      onClickCloseBtn,
    }
  }
})
</script>
