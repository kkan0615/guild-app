<template>
  <div
    ref="dropZoneDivRef"
    class="tw-border tw-rounded-md tw-relative"
    :class="{
      [`tw-h-${height}`]: true,
      [`tw-w-${width}`]: true,
    }"
    @click="onClickDropzone"
    @drop.prevent="onDrop"
    @dragover.prevent="onDragEvent"
    @dragenter.prevent="onDragEvent"
  >
    <input
      ref="fileInputRef"
      hidden
      type="file"
      accept="image/*"
      @change="onChangeFileInput"
    >
    <div
      v-if="!innerPreviewSrc"
      class="tw-h-full tw-flex tw-flex-col tw-items-center tw-justify-center"
    >
      <div>
        Upload Image
      </div>
      <div>
        {{ height }} X {{ width }}
      </div>
    </div>

    <div
      v-if="innerPreviewSrc || previewSrc"
    >
      <img
        class="image-dropzone--preview"
        :src="innerPreviewSrc || previewSrc"
        alt="preview"
      >
      <div
        class="image-dropzone--hide tw-bg-white"
        @click.stop="onClickDeletePreviewBtn"
      >
        <span class="material-icons">
          delete
        </span>
      </div>
    </div>
  </div>
</template>
<script
  setup
  lang="ts"
>
import { ref, defineProps, defineEmits } from 'vue'

const props = defineProps({
  height: {
    type: String,
    required: false,
    default: '32',
  },
  width: {
    type: String,
    required: false,
    default: '32',
  },
  preview: {
    type: Boolean,
    required: false,
    default: false,
  },
  previewSrc: {
    type: String,
    required: false,
    default: '',
  },
})

const emit = defineEmits(['error', 'update'])

const dropZoneDivRef = ref<HTMLDivElement | null>(null)
const fileInputRef = ref<HTMLInputElement | null>(null)

const innerPreviewSrc = ref<string>('')

const uploadFile = (file: any) => {
  const reader = new FileReader()
  reader.onload = el => {
    if (el) {
      const result = el.target.result
      innerPreviewSrc.value = el.target.result
      emit('update', result)
    }
  }
  reader.readAsDataURL(file)
  reader.onerror = error => {
    console.error(error)
  }
}

const onClickDropzone = () => {
  if (fileInputRef.value) {
    fileInputRef.value.click()
  }
}

const onChangeFileInput = (data: Event) => {
  if (data.target) {
    console.log('data', data)
    const files: Array<File> = Array.from((data.target as any).files)
    if (files.length > 1) {
      emit('error', 'Multiple upload is not allowed')
    }
    uploadFile(files[0])
  }
}

const onDrop = (event: DragEvent) => {
  if (event.dataTransfer && event.currentTarget) {
    const files: Array<File> = Array.from(event.dataTransfer.files)
    if (files.length > 1) {
      emit('error', 'Multiple upload is not allowed')
    }
    uploadFile(files[0])
  }
}

const onDragEvent = (event: DragEvent) => {
  if (event.dataTransfer && event.currentTarget) {
    event.stopPropagation()
    event.dataTransfer.dropEffect = 'copy'
  }
}

const onClickDeletePreviewBtn = () => {
  innerPreviewSrc.value = ''
}

</script>
<style
  lang="scss"
  scoped
>
.image-dropzone {
  &--hide {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 1;
    display: none;
  }
  &--preview:hover + &--hide {
    display: block;
  }
 }
</style>
