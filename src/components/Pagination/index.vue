<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination">
      <!--   prev   -->
      <li class="page-item">
        <span
          class="page-link tw-cursor-pointer"
          aria-label="Prev"
          @click="onClickPrev"
        >
          <span aria-hidden="true">&laquo;</span>
        </span>
      </li>
      <!--      <li class="page-item">-->
      <!--        <a-->
      <!--          class="page-link"-->
      <!--          href="#"-->
      <!--        >1</a>-->
      <!--      </li>-->
      <!--      <li class="page-item">-->
      <!--        <a-->
      <!--          class="page-link"-->
      <!--          href="#"-->
      <!--        >2</a>-->
      <!--      </li>-->
      <!--      <li class="page-item">-->
      <!--        <a-->
      <!--          class="page-link"-->
      <!--          href="#"-->
      <!--        >3</a>-->
      <!--      </li>-->
      <li
        v-for="visibleCount in visibleCounts"
        :key="visibleCount"
        class="page-item"
        :class="{
          active: visibleCount === modelValue + 1,
        }"
      >
        <div
          class="page-link tw-cursor-pointer"
          @click="onClickPage(visibleCount)"
        >
          {{ visibleCount }}
        </div>
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
import { defineComponent, computed } from 'vue'

export default defineComponent({
  name: 'CPagination',
  props: {
    maxSize: {
      type: Number,
      default: 0,
      required: false,
    },
    displayCount: {
      type: Number,
      default: 3,
      required: false,
    },
    modelValue: {
      type: Number,
      default: 0,
      required: false,
    }
  },
  emits: ['click:page', 'click:next', 'click:prev'],
  setup: (props, { emit }) => {
    const halftDisplayCount = computed(() => parseInt((props.displayCount / 2).toString()))

    const visibleCounts = computed(() => {
      let result: Array<number> = []
      let start = 0
      let end = props.displayCount
      if (props.modelValue < halftDisplayCount.value) {
        start = 0
      } else if ((props.modelValue) > (props.maxSize - props.displayCount)) {
        start = props.maxSize - props.displayCount
        end = props.maxSize
      } else {
        start = props.modelValue - halftDisplayCount.value
        end = props.modelValue + 1 + halftDisplayCount.value
      }

      for (let i = start; i < end; i++) {
        result.push(i + 1)
      }

      return result
    })

    const onClickPage = (pageNum: number) => {
      emit('click:page', pageNum - 1)
    }

    const onClickNext = () => {
      emit('click:next')
    }

    const onClickPrev = () => {
      emit('click:prev')
    }

    return {
      visibleCounts,
      onClickPage,
      onClickNext,
      onClickPrev,
    }
  }
})
</script>
