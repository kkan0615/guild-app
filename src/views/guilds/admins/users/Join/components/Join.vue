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
            @click.prevent.stop="onClickAcceptBtn"
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
import useStore from '@/store'
import useToast from '@/mixins/useToast'
import { useI18n } from 'vue-i18n'
import { GuildActionTypes } from '@/store/modules/guilds/info/actions'
import nProgress from 'nprogress'
import { GuildAdminUserActionTypes } from '@/store/modules/guilds/admins/User/actions'
import { GuildBlackCreateForm } from '@/types/model/guilds/blackList'

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
    const store = useStore()
    const i18n = useI18n()
    const { addToast } = useToast()

    /* Is expand or not for questions */
    const isExpand = ref(false)
    /* Question list in guildJoin props */
    const questions = computed(() => props.guildJoin.guildQuestions)

    const onClickCard = () => {
      isExpand.value = !isExpand.value
    }

    /**
     * Accept button click event
     */
    const onClickAcceptBtn = async () => {
      /* Loading start */
      nProgress.start()
      try {
        /* Join to the guild */
        await store.dispatch(GuildActionTypes.ACCEPT_JOIN_TO_GUILD, props.guildJoin)
        /* Refresh Joins */
        await store.dispatch(GuildAdminUserActionTypes.LOAD_GUILD_JOIN_FORMS)
        addToast({
          title: 'Success',
          type: 'success',
          content: i18n.t('standardResult.saved')
        })
      } catch (e) {
        console.error(e)
        addToast({
          title: 'Accept error',
          type: 'danger',
          content: i18n.t('standardResult.failed')
        })
      } finally {
        /* Loading end */
        nProgress.done()
      }
    }

    /**
     * reject button click event
     */
    const onClickRejectBtn = async () => {
      /* Loading start */
      nProgress.start()
      try {
        /* Reject to join to the guild */
        await store.dispatch(GuildActionTypes.REJECT_JOIN_TO_GUILD, props.guildJoin)
        /* Refresh Joins */
        await store.dispatch(GuildAdminUserActionTypes.LOAD_GUILD_JOIN_FORMS)
        addToast({
          title: 'Success',
          type: 'success',
          content: i18n.t('standardResult.saved')
        })
      } catch (e) {
        console.error(e)
        addToast({
          title: 'Reject error',
          type: 'danger',
          content: i18n.t('standardResult.failed')
        })
      } finally {
        /* Loading end */
        nProgress.done()
      }
    }

    const onClickBlockBtn = async () => {
      /* Loading start */
      nProgress.start()
      try {
        /* Reject to join to the guild */
        await store.dispatch(GuildActionTypes.BLOCK_JOIN_TO_GUILD, {
          userId: props.guildJoin.userId,
          guildId: props.guildJoin.guildId,
          description: '',
          guildJoinId: props.guildJoin.uid,
        } as GuildBlackCreateForm)
        /* Refresh Joins */
        await store.dispatch(GuildAdminUserActionTypes.LOAD_GUILD_JOIN_FORMS)
        addToast({
          title: 'Success',
          type: 'success',
          content: i18n.t('standardResult.saved')
        })
      } catch (e) {
        console.error(e)
        addToast({
          title: 'Block error',
          type: 'danger',
          content: i18n.t('standardResult.failed')
        })
      } finally {
        /* Loading end */
        nProgress.done()
      }
    }

    return {
      isExpand,
      questions,
      onClickCard,
      onClickAcceptBtn,
      onClickRejectBtn,
      onClickBlockBtn,
    }
  }
})
</script>
