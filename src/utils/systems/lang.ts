import { LocalstrageKeyEnum } from '@/types/systems/localstrage'

export const getCurrentLanguage = () => {
  return localStorage.getItem(LocalstrageKeyEnum.LANGUAGE) || window.navigator.language.split('-')[0]
}
