import { RouterNameEnum } from '@/types/systems/routers/keys'

export const koreanDictionary = {
  message: {
    hello: '세계야 반가워!'
  },
  standardRules: {
    required: '필수 값 {field} 입력해주세요.',
    maxLength: '{length}자를 넘을 수 없습니다.'
  },
  standardBtnLabels: {
    save: '저장',
    edit: '수정',
    cancel: '취소',
    delete: '삭제',
  },
  standardResult: {
    saved: '저장에 성공했습니다.',
    created: '생성에 성공했습니다.',
    updated: '수정에 성공했습니다.',
    removed: '삭제에 성공했습니다.',
    failed: '저장에 실패했습니다. 새로고침 후 다시 시도해주세요.',
    failRedirect: '페이지 이동에 문제가 발생했습니다.',
  },
  standardToastTitle: {
    saved: '저장 성공',
    failed: '실패',
  },
  router: {
    GuildBaseLayout: {
      title: '길드 레이아웃'
    },
    GeneralLayout: {
      title: '길드 레이아웃'
    },
    Guild_Home: {
      title: '길드 홈'
    },
    GuildAdminLayout: {
      title: '길드 어드민 레이아웃'
    },
    [RouterNameEnum.GUILD_ADMIN_MAIN_GUILD]: {
      title: '길드 메인화면'
    },
    GuildAdminInformationLayout: {
      title: '길드 정보 레이아웃'
    },
    [RouterNameEnum.GUILD_ADMIN_INFORMATION_MAIN]: {
      title: '길드 정보'
    },
    [RouterNameEnum.GUILD_ADMIN_INFORMATION_QUESTION]: {
      title: '가입 질문'
    },
    [RouterNameEnum.GUILD_ADMIN_INFORMATION_IMPORTANCE]: {
      title: 'Danger zone'
    },
    [RouterNameEnum.GUILD_ADMIN_USER_MAIN]: {
      title: '유저 리스트'
    },
    [RouterNameEnum.GUILD_ADMIN_USER_JOINS]: {
      title: '가입 신고 목록'
    },
    [RouterNameEnum.GUILD_ADMIN_USER_BLACK_LIST]: {
      title: '블랙리스트'
    },
    [RouterNameEnum.GUILD_ADMIN_ROLE_MAIN]: {
      title: '권한 및 역할'
    },
  },
  types: {
    models: {
      auth: {
        user: {
          fields: {
            name: '이름',
            nickname: '닉네임',
            email: '이메일',
            auth: '내부 역할',
          }, // fields end
        }, // user ends
      }, // auth ends
      guilds: {
        role: {
          fields: {
            name: '역할명',
            color: '색상',
            default: '기본',
          }, // fields end
        }, // role end
        user: {
          fields: {
            nickname: '닉네임',
            email: '이메일',
            description: '소개',
            remark: '비고',
          }, // fields end
        }, // user end
      }, // guilds end
    }, // model end
  }, // types end
  views: {
    Home: {
      guildListLink: '길드 찾기',
      loginLink: '로그인',
      createGuildBtn: '길드 만들기',
      signUpBtn: '무료로 시작하기'
    }
  }
}
