<template>
  <button
    class="btn btn-primary tw-ml-auto tw-w-full"
    type="button"
    data-bs-toggle="modal"
    data-bs-target="#guild-join-form"
    @click="onClickJoinBtn"
  >
    Join to the {{ guildInfo.name }}
  </button>
  <!-- Modal -->
  <div
    id="guild-join-form"
    class="modal fade"
    tabindex="-1"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5
            id="exampleModalLabel"
            class="modal-title"
          >
            Modal title
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          />
        </div>
        <div class="modal-body">
          <b-form>
            <div>
              <label
                class="form-label"
              >
                Nickname
              </label>
              <b-base-input
                id="nickname"
                v-model="nickname"
                :rules="rules.nickname"
                placeholder="nickname"
              />
            </div>
            <div
              v-for="i in 5"
              :key="i"
            >
              questions {{ i }}
            </div>
          </b-form>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button
            type="button"
            class="btn btn-primary"
            @click="onClickSaveBtn"
          >
            Save changes
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, computed, onMounted } from 'vue'
import useStore from '@/store'
import useUserMixin from '@/mixins/useUserMixin'
import BForm from '@/components/commons/Form/index.vue'
import BBaseInput from '@/components/commons/inputs/Base/index.vue'
import { GuildJoinQuestion } from '@/types/model/guilds/question'
import { GuildJoinCreateForm } from '@/types/model/guilds/join'
import { RuleType } from '@/types/bootstrap/validate'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'HomeGuildDetailJoinForm',
  components: { BBaseInput, BForm },
  setup: () => {
    const store = useStore()
    const i18n = useI18n()
    const { loggedInUser, isLoggedIn } = useUserMixin()

    const modalRef = ref<HTMLDivElement | null>(null)
    const nickname = ref('')
    const questions = ref <Array<GuildJoinQuestion>>([])

    const guildInfo = computed(() => store.state.home.guildInfo)
    const isJoined = computed(() => {
      if (!loggedInUser)
        return false
      return loggedInUser.value.guildList.findIndex(guild => guild.id === guildInfo.value.id) >= 0
    })

    const rules: RuleType = {
      nickname: [
        (v: string) => !!v || i18n.t('standardRules.required', { field: 'nickname' }),
        (v: string) => {
          if (!v)
            return true
          return v.length <= 20 || i18n.t('standardRules.maxLength', { length: 20 })
        },
      ],
      questionAnswer: [
        (v: string) => !!v || i18n.t('standardRules.required', { field: 'answer' }),
        (v: string) => {
          if (!v)
            return true
          return v.length <= 20 || i18n.t('standardRules.maxLength', { length: 20 })
        },
      ],
    }

    const onClickJoinBtn = () => {
      nickname.value = loggedInUser.value.nickname
      questions.value = guildInfo.value.joinQuestions ? guildInfo.value.joinQuestions.map(question => {
        return {
          question: question,
          answer: '',
        } as GuildJoinQuestion
      }) : []
    }

    const onClickSaveBtn = () => {
      const guildJoinForm: GuildJoinCreateForm = {
        guildId: guildInfo.value.id,
        userId: loggedInUser.value.id,
        nickname: nickname.value,
        guildQuestions: questions.value,
      }
      // @TODO: Join 생성 기능 로직 만들기 (store action 만들기)
      console.log('onClickSaveBtn', guildJoinForm)
    }

    return {
      isLoggedIn,
      isJoined,
      modalRef,
      guildInfo,
      nickname,
      rules,
      onClickJoinBtn,
      onClickSaveBtn,
    }
  }
})
</script>
