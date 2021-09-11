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
  },
  standardResult: {
    saved: '저장에 성공했습니다.',
    created: '생성에 성공했습니다.',
    updated: '수정에 성공했습니다.',
    removed: '삭제에 성공했습니다.',
    failed: '저장에 실패했습니다. 새로고침 후 다시 시도해주세요.',
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
  },
  views: {
    Home: {
      guildListLink: '길드 찾기',
      loginLink: '로그인',
      createGuildBtn: '길드 만들기',
      signUpBtn: '무료로 시작하기'
    }
  }
}
