<template>
  <div>
    <b-form
      ref="formRef"
      class="tw-flex tw-flex-col tw-gap-y-2"
    >
      <div
        class="tw-flex tw-gap-x-4 tw-items-end"
      >
        <div>
          <div>
            Main
          </div>
          <image-dropzone
            height="40"
            width="40"
            @update="onUpdateMainImage"
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
            @update="onUpdateLogoImage"
          />
        </div>
      </div>
      <!--   title   -->
      <div>
        <label
          class="form-label"
        >
          Title
        </label>
        <b-base-input
          id="title"
          v-model="title"
          :rules="rules.title"
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
      <!--   description   -->
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
    </b-form>
    <hr
      class="my-2"
    >
    <!--  actions  -->
    <div
      class="tw-flex tw-gap-x-2"
    >
      <span
        class="tw-ml-auto"
      />
      <button
        type="button"
        class="btn btn-outline-primary"
        @click="onClickCancelBtn"
      >
        Cancel
      </button>
      <button
        type="button"
        class="btn btn-primary"
        @click="onClickSaveBtn"
      >
        Save
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import BBaseInput from '@/components/commons/inputs/Base/index.vue'
import { RuleType } from '@/types/bootstrap/validate'
import { useI18n } from 'vue-i18n'
import BForm from '@/components/commons/Form/index.vue'
import BTextarea from '@/components/commons/inputs/Textarea/index.vue'
import ImageDropzone from '@/components/commons/dropzones/Image/index.vue'
import CMultipleSelect from '@/components/commons/inputs/Tags/index.vue'
import { dummyGuildTags } from '@/dummy/guilds/tag'
import useStore from '@/store'
import { HomeActionTypes } from '@/store/modules/home/actions'
import { GuildCreateForm } from '@/types/model/guilds'
import { RouterNameEnum } from '@/types/systems/routers/keys'

export default defineComponent({
  name: 'HomeGuildForm',
  components: { CMultipleSelect, ImageDropzone, BTextarea, BForm, BBaseInput },
  setup: () => {
    const store = useStore()
    const router = useRouter()
    const i18n = useI18n()

    const formRef = ref<InstanceType<typeof BForm> | null>(null)

    const mainImg = ref<File | null>(null)
    const logoImg = ref<File | null>(null)
    const title = ref('')
    const tags = ref<Array<string>>([])
    const description = ref('')
    // @TODO: Consider how to save control common code
    const tagOptions = dummyGuildTags.map(tag => {
      return { value: tag.uid, label: tag.name }
    })

    const rules: RuleType = {
      title: [
        (v: string) => !!v || i18n.t('standardRules.required', { field: 'title' }),
        (v: string) => {
          if (!v)
            return true
          return v.length <= 20 || i18n.t('standardRules.maxLength', { length: 20 })
        },
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
      if (formRef.value)
        console.log(formRef.value.checkValidation())
      if (formRef.value && formRef.value.checkValidation()) {
        alert('pass!')
        try {
          const uid = await store.dispatch(HomeActionTypes.CREATE_GUILD_INFO, {
            img: 'https://octodex.github.com/images/saketocat.png',
            logoImg: 'https://octodex.github.com/images/saketocat.png',
            name: title.value,
            description: description.value,
            tagIds: tags.value,
          } as GuildCreateForm)

          await router.push({ name: RouterNameEnum.HOME_GUILD_DETAIL, params: { id: uid } })
        } catch (e) {
          console.error(e)
        }
      } else {
        alert('could not pass')
      }
    }

    const onClickCancelBtn = async () => {
      await router.go(-1)
    }

    const onUpdateMainImage = (file: File) => {
      mainImg.value = file
    }

    const onUpdateLogoImage = (file: File) => {
      logoImg.value = file
    }

    return {
      formRef,
      title,
      tags,
      tagOptions,
      description,
      rules,
      onClickSaveBtn,
      onClickCancelBtn,
      onUpdateMainImage,
      onUpdateLogoImage,
    }
  }
})
</script>
