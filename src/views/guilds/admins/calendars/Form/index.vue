<template>
  <div
    class="tw-p-2 tw-flex tw-flex-col tw-h-full"
  >
    <div
      class="tw-font-bold tw-text-lg"
    >
      {{ $t(`router.${$route.name}.title`) }}
    </div>
    <c-divider
      class="tw-my-2"
    />
    <b-form
      ref="formRef"
    >
      <!--   name input   -->
      <c-horizontal-view>
        <c-horizontal-view-label
          required
        >
          {{ $t('types.models.guilds.calendar.fields.name') }}
        </c-horizontal-view-label>
        <c-horizontal-view-content>
          <b-base-input
            id="calendar-name-input"
            v-model="name"
            :rules="rules.name"
          />
        </c-horizontal-view-content>
      </c-horizontal-view>
      <!--   color input   -->
      <c-horizontal-view>
        <c-horizontal-view-label
          required
        >
          {{ $t('types.models.guilds.calendar.fields.color') }}
        </c-horizontal-view-label>
        <c-horizontal-view-content>
          <c-multiple-select
            id="calendar-name-input"
            v-model="color"
            :options="lightTextBgColors"
            :rules="rules.color"
          >
            <template
              #singlelabel="{ value }"
            >
              <div
                class="multiselect-single-label"
              >
                <span
                  class="tw-w-4 tw-h-4 tw-mr-2 tw-rounded-full"
                  :style="{
                    'background-color': value,
                  }"
                />
                {{ value }}
              </div>
            </template>
            <template
              #option="{ option }"
            >
              <span
                class="tw-w-4 tw-h-4 tw-mr-2 tw-rounded-full"
                :style="{
                  'background-color': option.value,
                }"
              />
              {{ option.label }}
            </template>
          </c-multiple-select>
        </c-horizontal-view-content>
      </c-horizontal-view>
      <!--    input   -->
      <c-horizontal-view>
        <c-horizontal-view-content>
          <b-checkbox
            id="calendar-is-all-targets-input"
            v-model="isAllTargets"
            label="All Users"
            @input="onInputIsAllTargets"
          />
        </c-horizontal-view-content>
      </c-horizontal-view>
      <!--   name input   -->
      <c-horizontal-view>
        <c-horizontal-view-label>
          targets
        </c-horizontal-view-label>
        <c-horizontal-view-content>
          <c-multiple-select
            id="calendar-targets-input"
            v-model="targets"
            :disabled="isAllTargets"
            :options="userList"
            mode="tags"
          />
        </c-horizontal-view-content>
      </c-horizontal-view>
      <!--   description input   -->
      <c-horizontal-view>
        <c-horizontal-view-label>
          {{ $t('types.models.guilds.calendar.fields.description') }}
        </c-horizontal-view-label>
        <c-horizontal-view-content>
          <b-textarea
            id="calendar-description-input"
            v-model="description"
          />
        </c-horizontal-view-content>
      </c-horizontal-view>
    </b-form>
    <!--  actions  -->
    <div
      class="tw-mt-auto tw-flex md:tw-space-x-2 tw-gap-x-2 tw-mt-auto tw-justify-end"
    >
      <button
        type="button"
        class="btn"
        @click="onClickCancelBtn"
      >
        {{ $t('standardBtnLabels.cancel') }}
      </button>
      <button
        type="button"
        class="btn btn-primary"
        @click="onClickSaveBtn"
      >
        <c-spinner-icon
          v-if="saveBtnLoading"
        />
        <span
          v-else
        >
          {{ $t('standardBtnLabels.save') }}
        </span>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeUnmount, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { RouterNameEnum } from '@/types/systems/routers/keys'
import useStore from '@/store'
import { GuildAdminCalendarActionTypes } from '@/store/modules/guilds/admins/Calendar/actions'
import BForm from '@/components/commons/Form/index.vue'
import BBaseInput from '@/components/commons/inputs/Base/index.vue'
import CHorizontalView from '@/components/commons/HorizontalView/index.vue'
import CHorizontalViewLabel from '@/components/commons/HorizontalView/components/Label.vue'
import CHorizontalViewContent from '@/components/commons/HorizontalView/components/Content.vue'
import BTextarea from '@/components/commons/inputs/Textarea/index.vue'
import CMultipleSelect from '@/components/commons/inputs/Tags/index.vue'
import { lightTextBgColors } from '@/data/color'
import { RuleType } from '@/types/bootstrap/validate'
import { UserLoginForm } from '@/types/model/auth/user/user'
import { useI18n } from 'vue-i18n'
import { GuildCalendarCreateForm, GuildCalendarUpdateForm } from '@/types/model/guilds/calendar'
import CDivider from '@/components/commons/Divider/index.vue'
import useToast from '@/mixins/useToast'
import CSpinnerIcon from '@/components/commons/icons/Spinner/index.vue'
import BCheckbox from '@/components/commons/inputs/Checkbox/index.vue'

export default defineComponent({
  name: 'FormCalendarGuildAdmin',
  components: { BCheckbox, CSpinnerIcon, CDivider, CMultipleSelect, BTextarea, CHorizontalViewContent, CHorizontalViewLabel, CHorizontalView, BBaseInput, BForm },
  setup: () => {
    const store = useStore()
    const route = useRoute()
    const router = useRouter()
    const i18n = useI18n()
    const { addToast } = useToast()

    const formRef = ref<InstanceType<typeof BForm> | null>(null)
    const saveBtnLoading = ref(false)
    const name = ref('')
    const color = ref('') // #something
    const isAllTargets = ref(false) // #something
    const targets = ref<Array<string>>([]) // #something
    const description = ref('')

    const rules: RuleType<GuildCalendarCreateForm | GuildCalendarUpdateForm> = {
      name: [
        (v: string) => !!v || i18n.t('standardRules.required', { field: 'name' }),
      ],
      color: [
        (v: string) => !!v || i18n.t('standardRules.required', { field: 'color' }),
      ],
      // description: [
      //   (v: string) => !!v || i18n.t('standardRules.required', { field: 'password' }),
      // ]
    }

    const selectedCalendar = computed(() => store.state.guildAdminCalendar.selectedCalendar)
    const userList = computed(() => store.state.guildAdminCalendar.userList)

    onMounted(async () => {
      await store.dispatch(GuildAdminCalendarActionTypes.LOAD_USER_LIST)
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

    onBeforeUnmount(async () => {
      try {
        await store.dispatch(GuildAdminCalendarActionTypes.RESET_SELECTED_CALENDAR)
        await store.dispatch(GuildAdminCalendarActionTypes.RESET_USER_LIST)
      } catch (e) {
        console.error(e)
      }
    })

    const initData = () => {
      if (route.name === RouterNameEnum.GUILD_ADMIN_CALENDAR_UPDATE_FORM) {
        name.value = selectedCalendar.value.name
        color.value = selectedCalendar.value.color
        isAllTargets.value = selectedCalendar.value.targets ? selectedCalendar.value.targets.length === userList.value.length : false
        description.value = selectedCalendar.value.description || ''
      }
    }

    const onClickCancelBtn = () => {
      router.back()
    }

    const onClickSaveBtn = async () => {
      saveBtnLoading.value = true
      /* Form ref should existed */
      if (formRef.value) {
        const validated = formRef.value.checkValidation()
        /* should be validated */
        if (validated) {
          try {
            if (route.name === RouterNameEnum.GUILD_ADMIN_CALENDAR_UPDATE_FORM) {
              /* Update */
              await store.dispatch(GuildAdminCalendarActionTypes.UPDATE_GUILD_CALENDAR, {
                id: selectedCalendar.value.id,
                name: name.value,
                color: color.value,
                targets: isAllTargets.value ? userList.value : targets.value,
                description: description.value,
              } as GuildCalendarUpdateForm)
              /* Redirect page */
              await router.push({ name: RouterNameEnum.GUILD_ADMIN_CALENDAR_DETAIL, params: { calendarId: selectedCalendar.value.id } })
              addToast({
                title: i18n.t('standardToastTitle.saved'),
                content: i18n.t('standardResult.updated'),
                type: 'success',
              })
            } else {
              /* Create */
              const createdId = await store.dispatch(GuildAdminCalendarActionTypes.CREATE_GUILD_CALENDAR, {
                name: name.value,
                color: color.value,
                targets: isAllTargets.value ? userList.value : targets.value,
                description: description.value,
              } as GuildCalendarCreateForm)
              /* Redirect page */
              await router.push({ name: RouterNameEnum.GUILD_ADMIN_CALENDAR_DETAIL, params: { calendarId: createdId } })
              addToast({
                title: i18n.t('standardToastTitle.saved'),
                content: i18n.t('standardResult.created'),
                type: 'success',
              })
            }
          } catch (e) {
            console.error(e)
            addToast({
              title: i18n.t('standardToastTitle.failed'),
              content: i18n.t('standardResult.failed'),
              type: 'danger',
            })
            saveBtnLoading.value = false
          }
        } // validate if statement ends
      }
      saveBtnLoading.value = false
    }

    const onInputIsAllTargets = () => {
      targets.value = []
    }

    return {
      name,
      color,
      isAllTargets,
      targets,
      description,
      lightTextBgColors,
      rules,
      formRef,
      saveBtnLoading,
      userList,
      onClickCancelBtn,
      onClickSaveBtn,
      onInputIsAllTargets,
    }
  }
})
</script>
