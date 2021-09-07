import { RouterNameEnum } from '@/types/systems/routers/keys'

export const englishDictionary = {
  message: {
    hello: 'hello world'
  },
  standardRules: {
    required: '{field} is required',
    maxLength: 'length should be under {length}'
  },
  standardBtnLabels: {
    save: 'Save',
    edit: 'Edit',
    cancel: 'Cancel',
  },
  router: {
    GuildBaseLayout: {
      title: 'Guild layout'
    },
    GeneralLayout: {
      title: 'Guild layout'
    },
    Guild_Home: {
      title: 'Home'
    },
    GuildAdminLayout: {
      title: 'Guild Admin layout'
    },
    [RouterNameEnum.GUILD_ADMIN_MAIN_GUILD]: {
      title: 'Guild Main'
    },
    GuildAdminInformationLayout: {
      title: 'Guild information layout'
    },
    [RouterNameEnum.GUILD_ADMIN_INFORMATION_MAIN]: {
      title: 'Information'
    },
    [RouterNameEnum.GUILD_ADMIN_INFORMATION_QUESTION]: {
      title: 'Join question'
    },
    [RouterNameEnum.GUILD_ADMIN_INFORMATION_IMPORTANCE]: {
      title: 'Importance'
    },
  },
  views: {
    Home: {
      guildListLink: 'Find Guild',
      loginLink: 'Login',
      createGuildBtn: 'Create Guild',
      signUpBtn: 'Sign Up For Free'
    }
  }
}
