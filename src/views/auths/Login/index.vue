<template>
  <div
    class="tw-h-full tw-flex tw-justify-center tw-items-center"
  >
    <div
      class="tw-bg-white tw-w-full md:tw-w-4/12 tw-p-4 tw-shadow-lg tw-rounded-lg"
    >
      <!--   Title part   -->
      <div
        class="tw-text-center"
      >
        <div
          class="tw-font-bold"
        >
          Welcome back!
        </div>
        <div
          class="tw-text-sm"
        >
          Sign in to continue to Crocom.
        </div>
      </div>
      <!--   Form part   -->
      <b-form
        class="tw-flex tw-flex-col tw-gap-y-4"
      >
        <!--   id   -->
        <div>
          <label
            class="form-label"
          >
            Email
          </label>
          <b-base-input
            id="email"
            ref="emailRef"
            v-model="email"
            type="email"
            placeholder="email"
            @keydown.enter="onKeyDownEnterEmail"
          />
        </div>
        <!--    password    -->
        <div>
          <label
            class="form-label tw-flex"
          >
            Password
            <span
              class="tw-ml-auto tw-text-sm tw-cursor-pointer"
            >
              Forgot Password?
            </span>
          </label>
          <b-base-input
            id="password"
            ref="passwordRef"
            v-model="password"
            :type="seePassword ? 'text' : 'password'"
            placeholder="Password"
            @keydown.enter="onKeyDownEnterPassword"
          >
            <template
              #append
            >
              <span
                class="input-group-text tw-cursor-pointer"
                @click="onClickPwEyeBtn"
              >
                <span
                  class="material-icons"
                >
                  {{ seePassword ? 'visibility' : 'visibility_off' }}
                </span>
              </span>
            </template>
          </b-base-input>
        </div>
        <!--   Remeber id   -->
        <div>
          <b-check-radio-box
            id="remember-id"
            v-model="rememberId"
            placeholder="rememberId"
          >
            <label
              class="form-check-label"
            >
              Remember id
            </label>
          </b-check-radio-box>
        </div>
      </b-form>
      <!--   actions   -->
      <div
        class="text-end"
      >
        <button
          type="button"
          class="btn btn-primary"
          @click="onClickLoginBtn"
        >
          login
        </button>
      </div>
      <div
        class="text-center"
      >
        <span>
          Don't have an account?
        </span>
        <span
          class="tw-text-blue-500 tw-cursor-pointer"
          @click="onClickSignUpLink"
        >
          Signup now
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import BForm from '@/components/commons/Form/index.vue'
import BBaseInput from '@/components/commons/inputs/Base/index.vue'
import BCheckRadioBox from '@/components/commons/inputs/CheckRadio/index.vue'
import { UserLoginForm } from '@/types/model/auth/user'
export default defineComponent({
  name: 'Login',
  components: { BCheckRadioBox, BBaseInput, BForm },
  setup: () => {
    const email = ref('')
    const password = ref('')
    const rememberId = ref(false)
    const seePassword = ref(false)
    /* Dom refs */
    const emailRef = ref<InstanceType<typeof BBaseInput> | null>(null)
    const passwordRef = ref<InstanceType<typeof BBaseInput> | null>(null)

    onMounted(() => {
      if (emailRef.value) {
        emailRef.value.focus()
      }
    })

    const login = () => {
      const loginForm: UserLoginForm = {
        email: email.value,
        password: password.value,
      }
      console.log('login', loginForm)
    }

    const onKeyDownEnterEmail = () => {
      if (passwordRef.value) {
        passwordRef.value.focus()
      }
    }

    const onKeyDownEnterPassword = () => {
      login()
    }

    const onClickPwEyeBtn = () => {
      seePassword.value = !seePassword.value
    }

    const onClickForgotPwLink = () => {
      console.log('onClickForgotPwLink')
    }

    const onClickLoginBtn = () => {
      console.log('onClickLoginBtn')
      login()
    }

    const onClickSignUpLink = () => {
      console.log('onClickSignUpLink')
    }

    return {
      email,
      password,
      rememberId,
      seePassword,
      emailRef,
      passwordRef,
      onKeyDownEnterEmail,
      onKeyDownEnterPassword,
      onClickPwEyeBtn,
      onClickForgotPwLink,
      onClickLoginBtn,
      onClickSignUpLink,
    }
  }
})
</script>
