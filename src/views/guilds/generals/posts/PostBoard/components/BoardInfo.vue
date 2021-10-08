<template>
  <c-card
    class="tw-bg-gray-100"
  >
    <c-card-content>
      <!--   Group name   -->
      <c-horizontal-view
        v-if="currentPostBoard.PostBoardGroup"
      >
        <c-horizontal-view-label>
          Group Name
        </c-horizontal-view-label>
        <c-horizontal-view-content>
          {{ currentPostBoard.PostBoardGroup.name }}
        </c-horizontal-view-content>
      </c-horizontal-view>
      <!--   name   -->
      <c-horizontal-view>
        <c-horizontal-view-label>
          Name
        </c-horizontal-view-label>
        <c-horizontal-view-content>
          {{ currentPostBoard.name }}
        </c-horizontal-view-content>
      </c-horizontal-view>
      <!--   description   -->
      <c-horizontal-view>
        <c-horizontal-view-label>
          Description
        </c-horizontal-view-label>
        <c-horizontal-view-content>
          {{ currentPostBoard.description }}
        </c-horizontal-view-content>
      </c-horizontal-view>
      <!--   Operators   -->
      <c-horizontal-view
        v-if="currentPostBoard.setting && currentPostBoard.setting.Operators"
      >
        <c-horizontal-view-label>
          Operators
        </c-horizontal-view-label>
        <c-horizontal-view-content
          class="tw-flex tw-flex-wrap tw-space-x-2 tw-space-y-2"
        >
          <div
            v-for="(operator) in currentPostBoard.setting.Operators"
            :key="operator.id"
            class="tw-flex tw-items-center"
          >
            <t-avatar
              size="5"
              class="tw-mr-2"
              :src="operator.img"
              :name="operator.nickname"
            />
            <span
              class="tw-text-sm"
            >
              {{ operator.name }}
            </span>
          </div>
        </c-horizontal-view-content>
      </c-horizontal-view>
    </c-card-content>
  </c-card>
</template>
<script
    lang="ts"
>
export default {
  name: 'PostBoardPostBoardInfo',
}
</script>
<script setup lang="ts">
import { computed } from 'vue'
import useStore from '@/store'
import CCard from '@/components/commons/Card/index.vue'
import CCardContent from '@/components/commons/Card/components/Content.vue'
import CHorizontalView from '@/components/commons/HorizontalView/index.vue'
import CHorizontalViewLabel from '@/components/commons/HorizontalView/components/Label.vue'
import CHorizontalViewContent from '@/components/commons/HorizontalView/components/Content.vue'
import TAvatar from '@/components/tailwinds/Avatar/index.vue'
const store = useStore()

const currentPostBoard = computed(() => store.state.guildPost.currentPostBoard)
</script>
