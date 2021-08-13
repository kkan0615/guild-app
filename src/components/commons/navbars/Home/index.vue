<template>
  <nav class="navbar navbar-expand-lg navbar-light tw-h-16">
    <div>
      logo
    </div>
    <div
      class="tw-ml-auto tw-flex tw-items-center tw-gap-x-4"
    >
      <!--   Guild list   -->
      <div
        class="tw-cursor-pointer"
      >
        {{ $t('views.Home.guildListLink') }}
      </div>
      <!--   Login   -->
      <div
        class="tw-cursor-pointer"
        @click="onClickLoginLink"
      >
        {{ $t('views.Home.loginLink') }}
      </div>
      <!--   Create guild   -->
      <button
        type="button"
        class="btn btn-primary"
        @click="onClickCreateGuildBtn"
      >
        {{ $t('views.Home.createGuildBtn') }}
      </button>
      <!--   sign up if it's not logged in   -->
      <button
        type="button"
        class="btn btn-outline-primary"
        @click="onClickSignUpBtn"
      >
        {{ $t('views.Home.signUpBtn') }}
      </button>
    </div>
  </nav>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { RouterNameEnum } from '@/types/systems/routers/keys'
export default defineComponent({
  name: 'HomeNavbar',
  setup: () => {
    const router = useRouter()

    /**
     * SingUp button click event
     */
    const onClickSignUpBtn = async () => {
      await router.push({ name: RouterNameEnum.REGISTER })
    }

    /**
     * Create guild button click event
     */
    const onClickCreateGuildBtn = async () => {
      await router.push({ name: RouterNameEnum.HOME_GUILD_FORM })
    }

    /**
     * Login button Click event
     */
    const onClickLoginLink = async () => {
      await router.push({ name: RouterNameEnum.REGISTER })
    }

    return {
      onClickSignUpBtn,
      onClickLoginLink,
      onClickCreateGuildBtn,
    }
  }
})
</script>
