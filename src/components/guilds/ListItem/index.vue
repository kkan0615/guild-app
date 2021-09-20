<template>
  <div
    class="tw-p-2 tw-flex tw-flex-col tw-ring tw-text-center tw-cursor-pointer hover:tw-shadow-2xl"
    @click="onClickListItem"
  >
    <guild-list-item-image
      :src="guild.img"
    />
    <div
      class="tw-text-xl tw-font-black tw-mt-1"
    >
      {{ guild.name }}
    </div>
    <div
      class="tw-font-light"
    >
      {{ guild.introduction }}
    </div>
    <div
      class="tw-mt-auto"
    >
      <c-divider
        class="mt-2"
      />
      <div
        class="tw-my-2 tw-flex tw-flex-wrap tw-space-x-2"
      >
        <tag-badge
          v-for="tag in tags"
          :key="tag.id"
          class="tw-mb-1"
          :color="tag.color"
        >
          {{ tag.name }}
        </tag-badge>
        <div
          v-if="guild.tagIds.length >= 8"
        >
          ...
        </div>
      </div>
      Users: {{ guild.memberIds.length }}
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import { GuildInfo, GuildInfoInList } from '@/types/model/guilds'
import GuildListItemImage from '@/components/guilds/ListItem/components/Image.vue'
import { RouterNameEnum } from '@/types/systems/routers/keys'
import { useRouter } from 'vue-router'
import TagBadge from '@/components/badeges/Tag/index.vue'
import { GuildTag } from '@/types/model/guilds/tag'
import CDivider from '@/components/commons/Divider/index.vue'

export default defineComponent({
  name: 'GuildListItem',
  components: { CDivider, TagBadge, GuildListItemImage },
  props: {
    guild: {
      type: Object as PropType<GuildInfoInList>,
      required: true,
      default: () => {
        return {} as GuildInfo
      },
    }
  },
  setup: (props) => {
    const router = useRouter()

    /**
     * only take 8 tags
     */
    const tags = computed(() => {
      const result: Array<GuildTag> = []
      const loopSize = props.guild.tagIds.length >= 8 ? 8 : props.guild.tagIds.length
      for (let i = 0; i < loopSize; i++) {
        result.push(props.guild.tags[i])
      }

      return result
    })

    const onClickListItem = async () => {
      await router.push({ name: RouterNameEnum.HOME_GUILD_DETAIL, params: { id: props.guild.id } })
    }

    return {
      tags,
      onClickListItem
    }
  }
})
</script>
