<template>
  <div>
    <div
      v-if="guildJoin.User"
      class="tw-border tw-rounded tw-bg-blue-500 tw-p-2 tw-text-white hover:tw-bg-blue-300 tw-cursor-pointer user-select-none"
      @click="onClickCard"
    >
      <div
        class="tw-flex tw-items-center"
      >
        <!--    Expand icon    -->
        <div
          class="tw-mr-2 tw-pt-1"
        >
          <c-material-icon
            v-if="isExpand"
          >
            expand_less
          </c-material-icon>
          <c-material-icon
            v-else
          >
            expand_more
          </c-material-icon>
        </div>
        <div>
          {{ guildJoin.nickname }}
        </div>
        <div
          class="tw-ml-auto tw-flex tw-gap-x-2"
        >
          <!--     accept     -->
          <c-material-icon
            class="tw-cursor-pointer hover:tw-bg-gray-500 tw-rounded-full tw-p-1"
            @click.prevent.stop="onClickCheckBtn"
          >
            check
          </c-material-icon>
          <!--    reject      -->
          <c-material-icon
            class="tw-cursor-pointer hover:tw-bg-gray-500 tw-rounded-full tw-p-1"
            @click.prevent.stop="onClickRejectBtn"
          >
            close
          </c-material-icon>
          <!--     block     -->
          <c-material-icon
            class="tw-cursor-pointer hover:tw-bg-gray-500 tw-rounded-full tw-p-1"
            @click.prevent.stop="onClickBlockBtn"
          >
            block
          </c-material-icon>
        </div>
      </div>
    </div>
    <!--  question list up  -->
    <div
      v-if="isExpand"
      role="list"
      class="tw-flex tw-flex-col tw-gap-y-3 tw-px-4 tw-py-2"
    >
      <join-user-guild-admin-question
        v-for="(question, i) in questions"
        :key="i"
        :question="question"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, PropType, computed } from 'vue'
import { GuildJoinInfo } from '@/types/model/guilds/join'
import CMaterialIcon from '@/components/commons/icons/Material/index.vue'
import JoinUserGuildAdminQuestion from '@/views/guilds/admins/users/Join/components/Question.vue'

export default defineComponent({
  name: 'JoinUserGuildAdminJoin',
  components: { JoinUserGuildAdminQuestion, CMaterialIcon },
  props: {
    guildJoin: {
      type: Object as PropType<GuildJoinInfo>,
      required: false,
      default: () => {},
    }
  },
  setup: (props) => {
    const isExpand = ref(false)
    const questions = computed(() => props.guildJoin.guildQuestions)

    const onClickCard = () => {
      isExpand.value = !isExpand.value
    }

    const onClickCheckBtn = () => {
      console.log('onClickCheckBtn')
    }

    const onClickRejectBtn = () => {
      console.log('onClickCloseBtn')
    }

    const onClickBlockBtn = () => {
      console.log('onClickBlockBtn')
    }

    return {
      isExpand,
      questions,
      onClickCard,
      onClickCheckBtn,
      onClickRejectBtn,
      onClickBlockBtn,
    }
  }
})
</script>
