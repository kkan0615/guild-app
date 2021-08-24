import useStore from '@/store'
import { computed } from 'vue'

export default function () {
  const store = useStore()

  const guildUserInfo = computed(() => store.state.guild.guildUserInfo)
  const guildInfo = computed(() => store.state.guild.guildInfo)

  return {
    guildUserInfo,
    guildInfo,
  }
}
