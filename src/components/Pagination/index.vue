<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination">
      <!--   prev   -->
      <li class="page-item">
        <span
          class="page-link tw-cursor-pointer"
          aria-label="Next"
        >
          <span aria-hidden="true">&laquo;</span>
        </span>
      </li>
      <li class="page-item">
        <a
          class="page-link"
          href="#"
        >1</a>
      </li>
      <li class="page-item">
        <a
          class="page-link"
          href="#"
        >2</a>
      </li>
      <li class="page-item">
        <a
          class="page-link"
          href="#"
        >3</a>
      </li>
      <!--   next   -->
      <li
        class="page-item"
        @click="onClickNext"
      >
        <span
          class="page-link tw-cursor-pointer"
          aria-label="Next"
        >
          <span aria-hidden="true">&raquo;</span>
        </span>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'

export default defineComponent({
  name: 'CPagination',
  props: {
    maxSize: {
      type: Number,
      default: 0,
      required: false,
    }
  },
  emits: ['click:page', 'click:next', 'click:prev'],
  setup: (props, { emit }) => {
    const onClickPage = (pageNum: number) => {
      emit('click:page', pageNum)
    }

    const onClickNext = () => {
      emit('click:next')
    }

    const onClickPrev = () => {
      emit('click:prev')
    }

    return {
      onClickPage,
      onClickNext,
      onClickPrev,
    }
  }
})
</script>
