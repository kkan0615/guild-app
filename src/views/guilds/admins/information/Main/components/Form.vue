<template>
  <div>
    <b-form
      ref="formRef"
      class="tw-flex tw-flex-col tw-space-y-3 tw-w-full"
    >
      <div
        class="tw-flex tw-flex-wrap tw-space-x-4 tw-items-end"
      >
        <div>
          <div>
            Main
          </div>
          <image-dropzone
            height="40"
            width="40"
          />
        </div>
        <div>
          <div
            class="tw-flex"
          >
            <div
              class="tw-mr-2"
            >
              Logo
            </div>
          </div>
          <image-dropzone
            height="32"
            width="72"
          />
        </div>
      </div>
      <!--   title   -->
      <div>
        <label
          class="form-label"
        >
          Name
        </label>
        <b-base-input
          id="title"
          v-model="name"
          :rules="rules.name"
          placeholder="title"
        />
      </div>
      <!--   tags   -->
      <div>
        <label
          class="form-label"
        >
          tags
        </label>
        <c-multiple-select
          id="tags"
          v-model="tags"
          placeholder="tags"
          :options="tagOptions"
          :rules="rules.tags"
          searchable
          :close-on-select="false"
          mode="tags"
        />
      </div>
      <!--   introduction   -->
      <div>
        <label
          class="form-label"
        >
          Introduction
        </label>
        <b-textarea
          id="introduction"
          v-model="introduction"
          :height="32"
          :rules="rules.introduction"
          placeholder="Introduction"
        />
      </div>
      <!--   description   -->
      <!--  @TODO: Change to tiptap   -->
      <div>
        <label
          class="form-label"
        >
          Description
        </label>
        <b-textarea
          id="description"
          v-model="description"
          :height="32"
          :rules="rules.description"
          placeholder="description"
        />
      </div>
      <div>
        <b-checkbox
          id="is-require-permission"
          v-model="isRequirePermission"
          type="checkbox"
          label="require permission"
        />
      </div>
    </b-form>
    <c-divider
      class="tw-my-4"
    />
    <!--  actions  -->
    <div
      class=" tw-flex tw-space-x-2"
    >
      <span
        class="tw-ml-auto"
      />
      <button
        type="button"
        class="btn btn-primary"
        @click="onClickSaveBtn"
      >
        {{ $t('standardBtnLabels.edit') }}
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'
import useGuildInfoMixin from '@/mixins/useGuildInfoMixin'
import BBaseInput from '@/components/commons/inputs/Base/index.vue'
import BTextarea from '@/components/commons/inputs/Textarea/index.vue'
import BCheckbox from '@/components/commons/inputs/Checkbox/index.vue'
import ImageDropzone from '@/components/commons/dropzones/Image/index.vue'
import CMultipleSelect from '@/components/commons/inputs/Tags/index.vue'
import { useI18n } from 'vue-i18n'
import { dummyGuildTags } from '@/dummy/guilds/tag'
import { RuleType } from '@/types/bootstrap/validate'
import BForm from '@/components/commons/Form/index.vue'
import CDivider from '@/components/commons/Divider/index.vue'
import useToast from '@/mixins/useToast'

export default defineComponent({
  name: 'MainInformationGuildAdminForm',
  components: { CDivider, BForm, CMultipleSelect, BCheckbox, BTextarea, ImageDropzone, BBaseInput },
  emits: ['edited'],
  setup: (props, { emit }) => {
    const i18n = useI18n()
    const { guildInfo } = useGuildInfoMixin()
    const { addToast } = useToast()

    const formRef = ref<InstanceType<typeof BForm> | null>(null)

    const name = ref(guildInfo.value.name)
    const tags = ref(guildInfo.value.tagIds)
    const isRequirePermission = ref(guildInfo.value.isRequirePermission)
    const introduction = ref(guildInfo.value.introduction)
    const description = ref(guildInfo.value.description)

    // @TODO: Consider how to save control common code
    const tagOptions = dummyGuildTags.map(tag => {
      return { value: tag.uid, label: tag.name }
    })

    const rules: RuleType = {
      name: [
        (v: string) => !!v || i18n.t('standardRules.required', { field: 'name' }),
        (v: string) => {
          if (!v)
            return true
          return v.length <= 20 || i18n.t('standardRules.maxLength', { length: 20 })
        },
      ],
      introduction: [
        (v: string) => {
          if (!v) {
            return true
          }
          return v.length <= 200 || i18n.t('standardRules.maxLength', { length: 200 })
        }
      ],
      description: [
        (v: string) => {
          if (!v) {
            return true
          }
          return v.length <= 200 || i18n.t('standardRules.maxLength', { length: 200 })
        }
      ],
      tags: [
        (v: any) => {
          if (!v)
            return i18n.t('standardRules.required', { field: 'tags' })
          if (!v.length)
            return i18n.t('standardRules.required', { field: 'tags' })

          return true
        },
      ],
    }

    const onClickSaveBtn = async () => {
      if (formRef.value && formRef.value.checkValidation()) {
        try {
          addToast({
            title: 'Information',
            content: 'Success to edit',
            type: 'info',
          })
          // const uid = await store.dispatch(HomeActionTypes.CREATE_GUILD_INFO, {
          //   img: 'https://octodex.github.com/images/saketocat.png',
          //   logoImg: 'https://octodex.github.com/images/saketocat.png',
          //   name: title.value,
          //   introduction: introduction.value,
          //   description: description.value,
          //   tagIds: tags.value,
          // } as GuildCreateForm)
          //
          // await router.push({ name: RouterNameEnum.HOME_GUILD_DETAIL, params: { id: uid } })
          emit('edited')
        } catch (e) {
          console.error(e)
        }
      } else {
        alert('could not pass')
      }
    }

    return {
      guildInfo,
      formRef,
      name,
      tags,
      isRequirePermission,
      introduction,
      description,
      tagOptions,
      rules,
      onClickSaveBtn,
    }
  }
})
</script>
