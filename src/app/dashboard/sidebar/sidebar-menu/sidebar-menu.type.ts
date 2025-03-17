export type SidebarMenu = {
  name: string,
  icon?: string,
  route?: string,
  active?: boolean,
  open?: boolean,
  touched?: boolean,
  items?: SidebarMenu[]
}