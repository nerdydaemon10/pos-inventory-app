export type SidebarMenu = {
  name: string,
  icon?: string,
  route?: string,
  active?: boolean,
  open?: boolean,
  items?: SidebarMenu[]
}