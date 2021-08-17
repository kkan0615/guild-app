import { LocalstorageKeyEnum } from '@/types/systems/localstrage'

export const getCurrentLanguage = () => {
  return localStorage.getItem(LocalstorageKeyEnum.LANGUAGE) || window.navigator.language.split('-')[0]
}
