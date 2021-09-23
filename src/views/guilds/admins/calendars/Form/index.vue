<template>
  <div>
    Form
    name: {{ name }}
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { RouterNameEnum } from '@/types/systems/routers/keys'
import useStore from '@/store'
import { GuildAdminCalendarActionTypes } from '@/store/modules/guilds/admins/Calendar/actions'

export default defineComponent({
  name: 'FormCalendarGuildAdmin',
  setup: () => {
    const store = useStore()
    const route = useRoute()
    const router = useRouter()

    const name = ref('')
    const color = ref('') // #something
    const description = ref('')

    const selectedCalendar = computed(() => store.state.guildAdminCalendar.selectedCalendar)

    onMounted(async () => {
      if (route.name === RouterNameEnum.GUILD_ADMIN_CALENDAR_UPDATE_FORM) {
        const { calendarId } = route.params
        /* If update form, calendar id should be existed */
        if (calendarId) {
          try {
            await store.dispatch(GuildAdminCalendarActionTypes.LOAD_SELECTED_CALENDAR_BY_ID, calendarId as string)
          } catch (e) {
            console.error(e)
            await router.push({ name: RouterNameEnum.GUILD_ADMIN_CALENDAR_MAIN })
          }
        } else {
          await router.push({ name: RouterNameEnum.GUILD_ADMIN_CALENDAR_MAIN })
        }
      }

      initData()
    })

    const initData = () => {
      if (route.name === RouterNameEnum.GUILD_ADMIN_CALENDAR_UPDATE_FORM) {
        name.value = selectedCalendar.value.name
        color.value = selectedCalendar.value.color
        color.value = selectedCalendar.value.color
        description.value = selectedCalendar.value.description
      }
    }

    return {
      name,
      color,
      description,
    }
  }
})
</script>
