<template>
  <div>
    {{ message }}
    <div>
      count: {{ count }}
    </div>
    <button
      type="button"
      class="btn btn-primary"
      @click="onClickTestBtn"
    >
      test
    </button>
    <ckeditor
      v-model="editorData"
      :editor="editor"
      :config="editorConfig"
    />
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, computed } from 'vue'
import useStore from '@/store'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

export default defineComponent({
  name: 'Prototype',
  setup: () => {
    const store = useStore()

    const message = ref('Hello world prototype')

    const count = computed(() => store.state.user.uid)
    const editor = ref(ClassicEditor)
    const editorData = ref('<p>content of editor </p>')
    const editorConfig = {}

    const onClickTestBtn = async () => {
      console.log(editorData.value)
    }

    return {
      editor,
      editorData,
      editorConfig,
      message,
      count,
      onClickTestBtn,
    }
  }
})
</script>
