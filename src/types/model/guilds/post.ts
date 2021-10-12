import { FirebaseAttributes } from '@/types/model/attributes'
import { Guild } from '@/types/model/guilds/index'
import { GuildUser, GuildUserInfo } from '@/types/model/auth/user/user'
import { FileAttachment } from '@/types/systems/attachment'
import { ColDef, ValueFormatterParams } from 'ag-grid-community/dist/lib/entities/colDef'
import { CustomDate } from '@/types/systems/date'
import dayjs from 'dayjs'

export interface GuildPostBoardGroup extends FirebaseAttributes {
  guildId: string
  name: string
  description?: string
}

export interface GuildPostBoardConfig {
  isAllowComment: boolean
  isPrivate: boolean
  allowUserIds?: Array<string> // If it's private post board
  operatorIds: Array<string> // It should have at least one
}

export interface GuildPostBoard extends FirebaseAttributes {
  guildId: string
  postBoardGroupId: string
  name: string
  description?: string
  isGuild: boolean
  setting: GuildPostBoardConfig
}

export interface GuildPost extends FirebaseAttributes {
  guildId: string
  postBoardId: string
  title: string
  content: string
  isNotice: boolean
  creatorId: string
  attachments?: Array<FileAttachment>
}

export interface GuildPostComment extends FirebaseAttributes {
  guildId: string
  postId: string
  content: string
  creatorId: string
}

export interface GuildPostBoardGroupWithBoards extends GuildPostBoardGroup {
  PostBoards: Array<GuildPostBoard>
}

export type GuildPostBoardGroupCreateForm = Pick<GuildPostBoardGroup, 'guildId' | 'name' | 'description'> & {
  postBoards: Array<Pick<GuildPostBoard, 'guildId' | 'name'>>
}

export type GuildPostBoardGroupUpdateForm = Pick<GuildPostBoardGroup, 'id' | 'guildId' | 'name' | 'description'> & {
  postBoards: Array<Pick<GuildPostBoard, 'id' | 'guildId' | 'name'>>
}

export interface GuildPostBoardConfigInfo extends GuildPostBoardConfig {
  AllowUsers?: Array<GuildUser>
  Operators: Array<GuildUser>
}

export interface GuildPostBoardInfo extends GuildPostBoard {
  PostBoardGroup: GuildPostBoardGroup
  setting: GuildPostBoardConfigInfo
}

export type GuildPostBoardCreateForm = Pick<GuildPostBoard, 'guildId' | 'postBoardGroupId' | 'name' | 'description'>
& Pick<GuildPostBoardConfig, 'isPrivate' | 'operatorIds' | 'allowUserIds' | 'isAllowComment'>

export type GuildPostBoardUpdateForm = Pick<GuildPostBoard, 'id' | 'guildId' | 'postBoardGroupId' | 'name' | 'description'>
& Pick<GuildPostBoardConfig, 'isPrivate' | 'operatorIds' | 'allowUserIds' | 'isAllowComment'>

export interface GuildPostInfo extends GuildPost {
  PostBoard: GuildPostBoard
  Comments: Array<GuildPostComment>
  Creator: GuildUser
}
export type GuildPostCreateForm = Pick<GuildPost, 'guildId' | 'postBoardId' | 'title' | 'isNotice' | 'content'>

export type GuildPostUpdateForm = Pick<GuildPost, 'id'| 'guildId' | 'postBoardId' | 'title' | 'isNotice' | 'content'>

export interface GuildPostInfoAtMain extends GuildPostInfo {
  PostBoard: GuildPostBoardInfo
}

export const postInfoColumn: Array<ColDef> = [
  {
    field: 'index',
    headerName: '#',
    width: 100,
    filter: false,
  },
  {
    field: 'title',
    headerName: 'title',
    flex: 1,
    minWidth: 500,
  },
  {
    field: 'createdAt',
    headerName: 'Updated',
    width: 300,
    filter: 'agDateColumnFilter',
    // // add extra parameters for the date filter
    filterParams: {
      // provide comparator function
      comparator: (filterLocalDateAtMidnight: CustomDate, cellValue: CustomDate) => {
        const dayjsFilterLocalDateAtMidnight = dayjs(filterLocalDateAtMidnight).set('h', 0).set('m', 0).set('s', 0).set('ms', 0)
        const dayjsCellValue = dayjs(cellValue).set('h', 0).set('m', 0).set('s', 0).set('ms', 0)

        if (dayjsFilterLocalDateAtMidnight.isAfter(dayjsCellValue))
          return -1
        else if (dayjsFilterLocalDateAtMidnight.isBefore(dayjsCellValue))
          return 1
        else
          return 0
      },
    },
    valueFormatter: (params: ValueFormatterParams) => {
      const value = params.value as GuildUserInfo
      return dayjs(value.createdAt).format('llll')
    },
  },
  {
    field: 'Creator.nickname',
    headerName: 'Creator',
    minWidth: 100,
  },
]
