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
