<template>
  <div>
    <div
      class="tw-flex tw-items-center tw-space-x-2"
    >
      <c-material-icon
        @click="onClickBackBtn"
      >
        chevron_left
      </c-material-icon>
      <span
        v-if="route.name === RouterNameEnum.GUILD_CALENDAR_CREATE_FORM"
      >
        {{ $t('standardBtnLabels.create') }}
      </span>
      <span
        v-else-if="route.name === RouterNameEnum.GUILD_CALENDAR_UPDATE_FORM"
      >
        {{ $t('standardBtnLabels.edit') }}
      </span>
    </div>
    <c-divider
      class="tw-my-2"
    />
    <b-form
      ref="formRef"
    >
      <c-horizontal-view>
        <c-horizontal-view-label
          required
        >
          {{ $t('types.models.guilds.calendar.fields.name') }}
        </c-horizontal-view-label>
        <c-horizontal-view-content>
          <b-base-input
            id="calendar-name"
            v-model="name"
            type="text"
            :rules="rules.name"
          />
        </c-horizontal-view-content>
      </c-horizontal-view>
      <c-horizontal-view>
        <c-horizontal-view-label
          required
        >
          {{ $t('types.models.guilds.calendar.fields.color') }}
        </c-horizontal-view-label>
        <!--   color input   -->
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
<script
    lang="ts"
>
export default {
  name: 'FormGuildCalendar',
}
</script>
<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import CMaterialIcon from '@/components/commons/icons/Material/index.vue'
import { useRoute, useRouter } from 'vue-router'
import CDivider from '@/components/commons/Divider/index.vue'
import { RouterNameEnum } from '@/types/systems/routers/keys'
import BForm from '@/components/commons/Form/index.vue'
import BBaseInput from '@/components/commons/inputs/Base/index.vue'
import CHorizontalView from '@/components/commons/HorizontalView/index.vue'
import CHorizontalViewLabel from '@/components/commons/HorizontalView/components/Label.vue'
import CHorizontalViewContent from '@/components/commons/HorizontalView/components/Content.vue'
import CMultipleSelect from '@/components/commons/inputs/Tags/index.vue'
import { lightTextBgColors } from '@/data/color'
import BTextarea from '@/components/commons/inputs/Textarea/index.vue'
import CSpinnerIcon from '@/components/commons/icons/Spinner/index.vue'
import useStore from '@/store'
import { useI18n } from 'vue-i18n'
import useToast from '@/mixins/useToast'
import { GuildCalendarActionTypes } from '@/store/modules/guilds/generals/calendars/actions'
import type { RuleType } from '@/types/bootstrap/validate'
import type { GuildCalendarCreateForm, GuildCalendarUpdateForm } from '@/types/model/guilds/calendar'

const router = useRouter()
const route = useRoute()
const store = useStore()
const i18n = useI18n()
const { addToast } = useToast()

const formRef = ref<InstanceType<typeof BForm> | null>(null)
const targetCalendar = computed(() => store.state.guildCalendar.targetCalendar)
const name = ref('')
const color = ref('')
const description = ref('')
const saveBtnLoading = ref(false)

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

onMounted(async () => {
  if (route.name === RouterNameEnum.GUILD_ADMIN_CALENDAR_UPDATE_FORM) {
    const { calendarId } = route.params
    /* If update form, calendar id should be existed */
    if (calendarId) {
      try {
        await store.dispatch(GuildCalendarActionTypes.LOAD_TARGET_CALENDAR, calendarId as string)
      } catch (e) {
        console.error(e)
        await router.push({ name: RouterNameEnum.GUILD_CALENDAR_MAIN })
      }
    } else {
      await router.push({ name: RouterNameEnum.GUILD_CALENDAR_MAIN })
    }
  }

  initData()
})

onBeforeUnmount(async () => {
  try {
    await store.dispatch(GuildCalendarActionTypes.RESET_TARGET_CALENDAR)
  } catch (e) {
    console.error(e)
  }
})

const initData = () => {
  if (route.name === RouterNameEnum.GUILD_ADMIN_CALENDAR_UPDATE_FORM) {
    name.value = targetCalendar.value.name
    color.value = targetCalendar.value.color
    description.value = targetCalendar.value.description || ''
  }
}

const onClickBackBtn = () => {
  router.back()
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
          await store.dispatch(GuildCalendarActionTypes.UPDATE_CALENDAR, {
            id: targetCalendar.value.id,
            name: name.value,
            color: color.value,
            description: description.value,
          })
          /* Redirect page */
          await router.push({ name: RouterNameEnum.GUILD_ADMIN_CALENDAR_DETAIL, params: { calendarId: targetCalendar.value.id } })
          addToast({
            title: i18n.t('standardToastTitle.saved'),
            content: i18n.t('standardResult.updated'),
            type: 'success',
          })
        } else {
        /* Create */
          await store.dispatch(GuildCalendarActionTypes.CREATE_CALENDAR, {
            name: name.value,
            color: color.value,
            description: description.value,
          })
          await store.dispatch(GuildCalendarActionTypes.LOAD_MY_CALENDAR_LIST)
          /* Redirect to main */
          await router.push({ name: RouterNameEnum.GUILD_CALENDAR_MAIN })
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

</script>
