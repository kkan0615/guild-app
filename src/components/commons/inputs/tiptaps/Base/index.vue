<template>
  <div
    class="input-group has-validation tw-w-full tw-h-full"
  >
    <div
      v-if="editor"
      class="tw-divide-x tw-divide-black tw-flex tw-flex-wrap tw-space-x-2"
    >
      <button
        type="button"
        :class="{ 'is-active': editor.isActive('bold') }"
        @click="editor.chain().focus().toggleBold().run()"
      >
        bold
      </button>
      <button
        type="button"
        :class="{ 'is-active': editor.isActive('italic') }"
        @click="editor.chain().focus().toggleItalic().run()"
      >
        italic
      </button>
      <button
        type="button"
        :class="{ 'is-active': editor.isActive('strike') }"
        @click="editor.chain().focus().toggleStrike().run()"
      >
        strike
      </button>
      <button
        type="button"
        :class="{ 'is-active': editor.isActive('code') }"
        @click="editor.chain().focus().toggleCode().run()"
      >
        code
      </button>
      <button
        type="button"
        @click="editor.chain().focus().unsetAllMarks().run()"
      >
        clear marks
      </button>
      <button @click="editor.chain().focus().clearNodes().run()">
        clear nodes
      </button>
      <button
        type="button"
        :class="{ 'is-active': editor.isActive('paragraph') }"
        @click="editor.chain().focus().setParagraph().run()"
      >
        paragraph
      </button>
      <button
        type="button"
        :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }"
        @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
      >
        h1
      </button>
      <button
        type="button"
        :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }"
        @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
      >
        h2
      </button>
      <button
        type="button"
        :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }"
        @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
      >
        h3
      </button>
      <button
        :class="{ 'is-active': editor.isActive('heading', { level: 4 }) }"
        type="button"
        @click="editor.chain().focus().toggleHeading({ level: 4 }).run()"
      >
        h4
      </button>
      <button
        type="button"
        :class="{ 'is-active': editor.isActive('heading', { level: 5 }) }"
        @click="editor.chain().focus().toggleHeading({ level: 5 }).run()"
      >
        h5
      </button>
      <button
        type="button"
        :class="{ 'is-active': editor.isActive('heading', { level: 6 }) }"
        @click="editor.chain().focus().toggleHeading({ level: 6 }).run()"
      >
        h6
      </button>
      <button
        type="button"
        :class="{ 'is-active': editor.isActive('bulletList') }"
        @click="editor.chain().focus().toggleBulletList().run()"
      >
        bullet list
      </button>
      <button
        type="button"
        :class="{ 'is-active': editor.isActive('orderedList') }"
        @click="editor.chain().focus().toggleOrderedList().run()"
      >
        ordered list
      </button>
      <button
        type="button"
        :class="{ 'is-active': editor.isActive('codeBlock') }"
        @click="editor.chain().focus().toggleCodeBlock().run()"
      >
        code block
      </button>
      <button
        type="button"
        :class="{ 'is-active': editor.isActive('blockquote') }"
        @click="editor.chain().focus().toggleBlockquote().run()"
      >
        blockquote
      </button>
      <button
        type="button"
        @click="editor.chain().focus().setHorizontalRule().run()"
      >
        horizontal rule
      </button>
      <button
        type="button"
        @click="editor.chain().focus().setHardBreak().run()"
      >
        hard break
      </button>
      <button
        type="button"
        @click="editor.chain().focus().undo().run()"
      >
        undo
      </button>
      <button
        type="button"
        @click="editor.chain().focus().redo().run()"
      >
        redo
      </button>
    </div>
    <editor-content
      class="tw-w-full tw-h-full"
      :editor="editor"
    />
  </div>
</template>
<script
  lang="ts"
>
export default {
  name: 'CBaseTiptap',
}
</script>
<script setup lang="ts">
import { defineEmits, defineProps, onBeforeUnmount, onMounted, ref } from 'vue'
import type { PropType } from 'vue'
import { Editor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'

const props = defineProps({
  id: {
    type: String,
    required: true,
    default: 'c-base-tiptap',
  },
  initValue: {
    type: String,
    required: false,
    default: '',
  },
  modelValue: {
    type: String,
    required: false,
    default: '',
  },
  type: {
    type: String as PropType<'HTML' | 'JSON'>,
    required: false,
    default: 'HTML',
  }
})

const emits = defineEmits(['update:modelValue'])

const editor = ref<Editor | null>(null)

onMounted(() => {
  editor.value = new Editor({
    content: `
        <h2>
          Hi there,
        </h2>
        <p>
          this is a <em>basic</em> example of <strong>tiptap</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:
        </p>
        <ul>
          <li>
            That’s a bullet list with one …
          </li>
          <li>
            … or two list items.
          </li>
        </ul>
        <p>
          Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:
        </p>
        <pre><code class="language-css">body {
  display: none;
}</code></pre>
        <p>
          I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t forget to check the other examples too.
        </p>
        <blockquote>
          Wow, that’s amazing. Good work, boy! 👏
          <br />
          — Mom
        </blockquote>
      `,
    extensions: [
      StarterKit,
    ],
    editorProps: {
      attributes: {
        class: 'tw-prose tw-mx-auto form-control tw-w-full',
      },
    },
    onUpdate: editorProps => {
      if (props.type === 'HTML') {
        emits('update:modelValue', editorProps.editor.getHTML())
      } else if (props.type === 'JSON') {
        emits('update:modelValue', editorProps.editor.getJSON())
      }
    }
  })
})

onBeforeUnmount(() => {
  if (editor.value) {
    editor.value.destroy()
  }
})

</script>
<!--<style lang="scss">-->
<!--/* Basic editor styles */-->
<!--.ProseMirror {-->
<!--  > * + * {-->
<!--    margin-top: 0.75em;-->
<!--  }-->

<!--  ul,-->
<!--  ol {-->
<!--    padding: 0 1rem;-->
<!--  }-->

<!--  code {-->
<!--    background-color: rgba(#616161, 0.1);-->
<!--    color: #616161;-->
<!--  }-->

<!--  pre {-->
<!--    background: #0D0D0D;-->
<!--    color: #FFF;-->
<!--    font-family: 'JetBrainsMono', monospace;-->
<!--    padding: 0.75rem 1rem;-->
<!--    border-radius: 0.5rem;-->

<!--    code {-->
<!--      color: inherit;-->
<!--      padding: 0;-->
<!--      background: none;-->
<!--      font-size: 0.8rem;-->
<!--    }-->
<!--  }-->

<!--  img {-->
<!--    max-width: 100%;-->
<!--    height: auto;-->
<!--  }-->

<!--  blockquote {-->
<!--    padding-left: 1rem;-->
<!--    border-left: 2px solid rgba(#0D0D0D, 0.1);-->
<!--  }-->

<!--  hr {-->
<!--    border: none;-->
<!--    border-top: 2px solid rgba(#0D0D0D, 0.1);-->
<!--    margin: 2rem 0;-->
<!--  }-->
<!--  h1 {-->
<!--    display: block;-->
<!--    font-size: 2em;-->
<!--    margin-top: 0.67em;-->
<!--    margin-bottom: 0.67em;-->
<!--    margin-left: 0;-->
<!--    margin-right: 0;-->
<!--    font-weight: bold;-->
<!--  }-->

<!--  h2 {-->
<!--    display: block;-->
<!--    font-size: 1.5em;-->
<!--    margin-top: 0.83em;-->
<!--    margin-bottom: 0.83em;-->
<!--    margin-left: 0;-->
<!--    margin-right: 0;-->
<!--    font-weight: bold;-->
<!--  }-->

<!--  h3 {-->
<!--    display: block;-->
<!--    font-size: 1.17em;-->
<!--    margin-top: 1em;-->
<!--    margin-bottom: 1em;-->
<!--    margin-left: 0;-->
<!--    margin-right: 0;-->
<!--    font-weight: bold;-->
<!--  }-->

<!--  h4 {-->
<!--    display: block;-->
<!--    margin-top: 1.33em;-->
<!--    margin-bottom: 1.33em;-->
<!--    margin-left: 0;-->
<!--    margin-right: 0;-->
<!--    font-weight: bold;-->
<!--  }-->

<!--  h5 {-->
<!--    display: block;-->
<!--    font-size: .83em;-->
<!--    margin-top: 1.67em;-->
<!--    margin-bottom: 1.67em;-->
<!--    margin-left: 0;-->
<!--    margin-right: 0;-->
<!--    font-weight: bold;-->
<!--  }-->

<!--  h6 {-->
<!--    display: block;-->
<!--    font-size: .67em;-->
<!--    margin-top: 2.33em;-->
<!--    margin-bottom: 2.33em;-->
<!--    margin-left: 0;-->
<!--    margin-right: 0;-->
<!--    font-weight: bold;-->
<!--  }-->
<!--}-->
<!--</style>-->
