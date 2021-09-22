import { Toast } from '@/types/systems/toast'

export interface ApplicationState {
  toasts: Array<Toast>
}

export const applicationState: ApplicationState = {
  toasts: [],
}
