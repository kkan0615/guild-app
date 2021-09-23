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
    create: 'Create',
    edit: 'Edit',
    cancel: 'Cancel',
    delete: 'Delete',
  },
  standardResult: {
    saved: 'Success to save',
    created: 'Success to create',
    updated: 'Success to update',
    removed: 'Success to remove',
    failed: 'Fail to save. Please try again after press F5 (Refresh)',
    failRedirect: 'Fail to redirect page.',
  },
  standardToastTitle: {
    saved: 'Saved',
    failed: 'Failed',
    failedRedirect: 'Failed to redirect',
  },
  standardAsking: {
    beforeOutWritingForm: 'Would you like to cancel to write form?',
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
    [RouterNameEnum.GUILD_ADMIN_ROLE_MAIN]: {
      title: 'Role list'
    },
    [RouterNameEnum.GUILD_ADMIN_CALENDAR_LAYOUT]: {
      title: 'Calendars'
    },
    [RouterNameEnum.GUILD_ADMIN_CALENDAR_MAIN]: {
      title: 'Calendar list'
    },
    [RouterNameEnum.GUILD_ADMIN_CALENDAR_CREATE_FORM]: {
      title: 'Create new calendar'
    },
  },
  types: {
    models: {
      auth: {
        user: {
          fields: {
            name: 'Name',
            nickname: 'Nickname',
            email: 'Email',
            auth: 'Position',
          }, // fields end
        }, // user ends
      }, // auth ends
      guilds: {
        role: {
          fields: {
            name: 'Role name',
            color: 'color',
            default: 'Default',
          }, // fields end
        }, // role end
        user: {
          fields: {
            nickname: 'Nickname',
            email: 'Email',
            description: 'Description',
            remark: 'Remark',
            states: {
              ONLINE: 'Online',
              IDLE: 'Idle',
              DO_NOT_DISTURB: 'Do not disturb',
              INVISIBLE: 'Invisible',
              OFFLINE: 'Offline',
            },
          }, // fields end
        }, // user end
      }, // guilds end
    } // model end
  }, // types end
  views: {
    Home: {
      guildListLink: 'Find Guild',
      loginLink: 'Login',
      createGuildBtn: 'Create Guild',
      signUpBtn: 'Sign Up For Free'
    }
  }
}
