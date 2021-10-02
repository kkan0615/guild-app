export interface CBBreadcrumb {
  name: string
  routerName: string
  active?: boolean // undefined or false means it's not active
}
