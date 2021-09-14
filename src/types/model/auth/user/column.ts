import { ColDef, ValueFormatterParams } from 'ag-grid-community/dist/lib/entities/colDef'
import { CustomDate } from '@/types/systems/date'
import dayjs from 'dayjs'
import { GuildUser, GuildUserInfo } from '@/types/model/auth/user/user'

export const UserColumn: Array<ColDef> = [
  {
    field: 'nickname',
    headerName: 'Nickname'
  },
  {
    field: 'role',
    headerName: 'Role name',
    cellRendererFramework: 'RoleColumnBadge',
  },
]

export const UserColumnAtAdminUser: Array<ColDef> = [
  {
    field: 'avatar',
    headerName: 'Avatar',
    cellRendererFramework: 'UserAvatarColumn',
    width: 100,
    filter: false,
    sortable: false,
  },
  {
    field: 'nickname',
    headerName: 'Nickname',
    flex: 1,
  },
  {
    field: 'createdAt',
    headerName: 'Join',
    filter: 'agDateColumnFilter',
    // // add extra parameters for the date filter
    filterParams: {
      // provide comparator function
      comparator: (filterLocalDateAtMidnight: CustomDate, cellValue: CustomDate) => {
        const dayjsFilterLocalDateAtMidnight = dayjs(filterLocalDateAtMidnight).set('h', 0).set('m', 0).set('s', 0).set('ms', 0)
        const dayjsCellValue = dayjs(cellValue).set('h', 0).set('m', 0).set('s', 0).set('ms', 0)

        console.log(dayjsCellValue.isSame(dayjsFilterLocalDateAtMidnight))
        console.log(dayjsFilterLocalDateAtMidnight)
        console.log(dayjsCellValue)

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
    flex: 1,
  },
  {
    field: 'role.name',
    headerName: 'Role name',
    cellRendererFramework: 'RoleColumnBadge',
  },
  {
    field: 'actions',
    headerName: 'actions',
    cellRendererFramework: 'MainUserGuildAdminColumnActions',
    width: 100,
    flex: 0,
    filter: false,
    sortable: false,
  },
]
