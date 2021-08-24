<template>
  <nav class="navbar navbar-expand-lg navbar-light tw-h-16">
    <div
      @click="onClickLogo"
    >
      logo
    </div>
    <div
      class="tw-ml-auto tw-flex tw-items-center tw-gap-x-4"
    >
      <!--   Guild list   -->
      <div
        class="tw-cursor-pointer"
        @click="onClickGuildListLink"
      >
        {{ $t('views.Home.guildListLink') }}
      </div>
      <!--   Login   -->
      <div
        v-if="!isLoggedIn"
        class="tw-cursor-pointer"
        @click="onClickLoginLink"
      >
        {{ $t('views.Home.loginLink') }}
      </div>
      <!--   Create guild   -->
      <button
        v-if="isLoggedIn"
        type="button"
        class="btn btn-primary"
        @click="onClickCreateGuildBtn"
      >
        {{ $t('views.Home.createGuildBtn') }}
      </button>
      <guilds-dropdown
        v-if="isLoggedIn"
      />
      <!--   sign up if it's not logged in   -->
      <button
        v-if="!isLoggedIn"
        type="button"
        class="btn btn-outline-primary"
        @click="onClickSignUpBtn"
      >
        {{ $t('views.Home.signUpBtn') }}
      </button>
      <!--   if it's logged in   -->
      <user-dropdown
        v-else
      />
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { RouterNameEnum } from '@/types/systems/routers/keys'
import useUserMixin from '@/mixins/useUserMixin'
import UserDropdown from '@/components/commons/dropdowns/User/index.vue'
import GuildsDropdown from '@/components/commons/dropdowns/Guilds/index.vue'

export default defineComponent({
  name: 'HomeNavbar',
  components: { GuildsDropdown, UserDropdown },
  setup: () => {
    const router = useRouter()
    const { isLoggedIn, loggedInUser } = useUserMixin()

    const onClickLogo = async () => {
      await router.push({ path: '/' })
    }

    /**
     * SingUp button click event
     */
    const onClickSignUpBtn = async () => {
      await router.push({ name: RouterNameEnum.LOGIN })
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
      await router.push({ name: RouterNameEnum.LOGIN })
    }

    /**
     * Guild List link Click event
     */
    const onClickGuildListLink = async () => {
      await router.push({ name: RouterNameEnum.HOME_GUILD_LIST })
    }

    return {
      isLoggedIn,
      loggedInUser,
      onClickLogo,
      onClickGuildListLink,
      onClickSignUpBtn,
      onClickLoginLink,
      onClickCreateGuildBtn,
    }
  }
})
</script>
