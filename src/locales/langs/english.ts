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
  standardResult: {
    saved: 'Success to save',
    created: 'Success to create',
    updated: 'Success to update',
    removed: 'Success to remove',
    failed: 'Fail to save. Please try again after press F5 (Refresh)',
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
    [RouterNameEnum.GUILD_ADMIN_USER_MAIN]: {
      title: 'User list'
    },
    [RouterNameEnum.GUILD_ADMIN_USER_JOINS]: {
      title: 'Join forms'
    },
    [RouterNameEnum.GUILD_ADMIN_USER_BLACK_LIST]: {
      title: 'Black List'
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
