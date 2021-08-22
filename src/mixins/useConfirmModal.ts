import ConfirmModal from '@/components/commons/ConfirmModal/index.vue'
import { createApp, defineComponent } from 'vue'

export const confirm = (message: string) => {
  return new Promise(resolve => {
    const confirmModalComp = defineComponent({
      extends: ConfirmModal, data () {
        return {
          message,
          display: true
        }
      },
    })


  })
}
