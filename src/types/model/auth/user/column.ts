import { ColDef } from 'ag-grid-community/dist/lib/entities/colDef'

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
    width: 80,
    flex: 0,
    filter: false,
    sortable: false,
  },
  {
    field: 'nickname',
    headerName: 'Nickname'
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
