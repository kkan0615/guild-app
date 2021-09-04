import useStore from '@/store'
import { ApplicationActionTypes } from '@/store/modules/applications/actions'
import { Toast } from '@/types/systems/toast'

export default function () {
  const store = useStore()

  const addToast = (toast: Toast) => {
    store.dispatch(ApplicationActionTypes.ADD_TOAST, toast)
  }

  return {
    addToast,
  }
}
