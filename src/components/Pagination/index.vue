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
    const checkedDisplayCount = computed(() =>  props.displayCount > props.maxSize ? props.maxSize : props.displayCount)
    const halfDisplayCount = computed(() => parseInt((checkedDisplayCount.value / 2).toString()))

    const visibleCounts = computed(() => {
      let result: Array<number> = []
      let start = 0
      let end = checkedDisplayCount.value
      if (props.modelValue < halfDisplayCount.value) {
        start = 0
      } else if ((props.modelValue) > (props.maxSize - checkedDisplayCount.value)) {
        start = props.maxSize - checkedDisplayCount.value
        end = props.maxSize
      } else {
        start = props.modelValue - halfDisplayCount.value
        end = props.modelValue + 1 + halfDisplayCount.value
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
