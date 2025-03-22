import _ from "lodash"
import { produce } from "immer"
import { patchState, signalStore, withMethods, withState } from "@ngrx/signals"

import { RouteHelper } from "../../core/helpers/route.helper"
import { SidebarMenu } from "./sidebar-menu/sidebar-menu.type"

export type SidebarType = {
  menus: SidebarMenu[]
}

const initialState: SidebarType = {
  menus: [
    {
      name: "Dashboard",
      items: [
        {
          name: "Overview",
          icon: "tachometer",
          route: "",
          active: false,
          open: false
        },
        {
          name: "POS/Checkout",
          icon: "cart-add",
          route: "checkout",
          active: false,
          open: false
        },
        {
          name: "Sales History",
          icon: "credit-card",
          route: "sales-history",
          active: false,
          open: false
        }
      ]
    },
    {
      name: "Main Menu",
      active: false,
      open: false,
      items: [
        {
          name: "Reports & Analytics",
          icon: "bar-chart-alt-2",
          active: false,
          open: false,
          items: [
            {
              name: "Sales Reports",
              route: "reports/sales",
              active: false,
              open: false
            },
            {
              name: "Inventory Reports",
              route: "reports/inventory-reports",
              active: false,
              open: false
            },
            {
              name: "Supplier Reports",
              route: "reports/suppliers",
              active: false,
              open: false
            }
          ]
        },
        {
          name: "Inventory Management",
          icon: "grid-alt",
          active: false,
          open: false,
          items: [
            {
              name: "Products",
              route: "inventory/products",
              active: false,
              open: false
            },
            {
              name: "Categories",
              route: "inventory/categories",
              active: false,
              open: false
            },
            {
              name: "Brands",
              route: "inventory/brands",
              active: false,
              open: false
            },
            {
              name: "Locations",
              route: "inventory/locations",
              active: false,
              open: false
            },
            {
              name: "Batches",
              route: "inventory/batches",
              active: false,
              open: false
            },
            {
              name: "Stocks",
              route: "inventory/stocks",
              active: false,
              open: false
            },
            {
              name: "Stock Movements",
              route: "inventory/stock-movements",
              active: false,
              open: false
            }
          ]
        },
        {
          name: "Supplier Management",
          icon: "package",
          active: false,
          open: false,
          items: [
            {
              name: "Suppliers",
              route: "suppliers/suppliers",
              active: false,
              open: false
            },
            {
              name: "Purchased Orders",
              route: "suppliers/purchased-orders",
              active: false,
              open: false
            },
            {
              name: "Re-order Alerts",
              route: "re-order-alerts",
              active: false,
              open: false
            }
          ]
        },
        {
          name: "User Management",
          icon: "cog",
          active: false,
          open: false,
          items: [
            {
              name: "Users",
              route: "users",
              active: false,
              open: false,
            },
            {
              name: "Roles",
              route: "users/roles",
              active: false,
              open: false
            },
            {
              name: "Permissions",
              route: "users/permissions",
              active: false,
              open: false
            }
          ]
        }
      ]
    }
  ]
}

const activateMenuItemsRecursively = (
  menu: SidebarMenu, 
  route: string
): SidebarMenu => {
  let hasActiveItem = false
  
  if (_.isEmpty(menu.items)) {
    return menu
  }
  
  menu.items = menu.items!.map(submenu => {
    const last = RouteHelper.last(submenu.route)

    submenu.active = RouteHelper.includes(route, last)
    submenu = activateMenuItemsRecursively(submenu, route)

    if (submenu.active === true) {  
      hasActiveItem = submenu.active
    }

    return submenu
  })

  menu.active = menu.active || hasActiveItem
  menu.open = menu.active

  return menu
}

const toggleMenuItemsRecursively = (menus: SidebarMenu[], menu: SidebarMenu): SidebarMenu[] => {
  return _.cloneDeepWith(menus, (clone) => {
    if (_.isArray(clone)) {
      return undefined
    }
    if (!_.isObject(clone)) {
      return
    }

    clone = clone as SidebarMenu

    if (!_.isEqual(clone, menu)) {
      return undefined
    }
    
    clone = produce(clone, (draft: SidebarMenu) => {
      draft.open = !draft.open // enabled toggle when sidebar item is clicked
    })

    return clone
  })
}

export const SidebarStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store) => ({
    activate: (url: string): void => {
      let route = RouteHelper.sanitize(url);

      patchState(store, (state) => {
        return produce(state, (draft) => {
          draft.menus = _.map(draft.menus, (menu) => activateMenuItemsRecursively(menu, route))
        })
      })
    },
    toggle: (menu: SidebarMenu): void => {
      patchState(store, (state) => {
        return produce(state, (draft) => {
          draft.menus = toggleMenuItemsRecursively(draft.menus, menu)
        })
      })
    }
  }))
)