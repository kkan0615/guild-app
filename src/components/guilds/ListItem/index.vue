<template>
  <div
    class="tw-p-2 tw-flex tw-flex-col tw-ring tw-text-center tw-cursor-pointer hover:tw-shadow-2xl"
    @click="onClickListItem"
  >
    <guild-list-item-image
      :src="guild.img"
    />
    <div
      class="tw-text-xl tw-font-black"
    >
      {{ guild.name }}
    </div>
    <div>
      {{ guild.description }}
    </div>
    <div
      class="mt-auto"
    >
      Users: {{ guild.memberIds.length }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { GuildInfo } from '@/types/model/guilds'
import GuildListItemImage from '@/components/guilds/ListItem/components/Image.vue'
import { RouterNameEnum } from '@/types/systems/routers/keys'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'GuildListItem',
  components: { GuildListItemImage },
  props: {
    guild: {
      type: Object as PropType<GuildInfo>,
      required: true,
      default: () => {
        return {} as GuildInfo
      },
    }
  },
  setup: (props) => {
    const router = useRouter()

    const onClickListItem = async () => {
      await router.push({ name: RouterNameEnum.HOME_GUILD_DETAIL, params: { id: props.guild.uid } })
    }

    return {
      onClickListItem
    }
  }
})
</script>
