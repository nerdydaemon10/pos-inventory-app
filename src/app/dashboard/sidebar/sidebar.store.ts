import _ from "lodash"
import { produce } from "immer"
import { patchState, signalStore, withMethods, withState } from "@ngrx/signals"

import { SidebarMenu } from "./sidebar-menu/sidebar-menu.type"
import { RouteHelper } from "../../core/helpers/route.helper"

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
          open: false,
          touched: false
        },
        {
          name: "POS/Checkout",
          icon: "cart-add",
          route: "checkout",
          active: false,
          open: false,
          touched: false
        },
        {
          name: "Sales History",
          icon: "credit-card",
          route: "checkout",
          active: false,
          open: false,
          touched: false
        }
      ]
    },
    {
      name: "Main Menu",
      active: false,
      open: false,
      touched: false,
      items: [
        {
          name: "Reports & Analytics",
          icon: "bar-chart-alt-2",
          active: false,
          open: false,
          touched: false,
          items: [
            {
              name: "Sales Reports",
              route: "sales",
              active: false,
              open: false,
              touched: false
            },
            {
              name: "Inventory Reports",
              route: "inventory",
              active: false,
              open: false,
              touched: false
            },
            {
              name: "Supplier Reports",
              route: "suppliers",
              active: false,
              open: false,
              touched: false
            }
          ]
        },
        {
          name: "Inventory Management",
          icon: "grid-alt",
          active: false,
          open: false,
          touched: false,
          items: [
            {
              name: "Products",
              route: "inventory/products",
              active: false,
              open: false,
              touched: false
            },
            {
              name: "Categories",
              route: "categories",
              active: false,
              open: false,
              touched: false
            },
            {
              name: "Brands",
              route: "brands",
              active: false,
              open: false,
              touched: false
            },
            {
              name: "Locations",
              route: "locations",
              active: false,
              open: false,
              touched: false
            },
            {
              name: "Batches",
              route: "batches",
              active: false,
              open: false,
              touched: false
            },
            {
              name: "Stocks",
              route: "stocks",
              active: false,
              open: false,
              touched: false
            },
            {
              name: "Stock Movements",
              route: "stock-movement",
              active: false,
              open: false,
              touched: false
            }
          ]
        },
        {
          name: "Supplier Management",
          icon: "package",
          route: "damage",
          active: false,
          open: false,
          touched: false,
          items: [
            {
              name: "Suppliers",
              route: "suppliers",
              active: false,
              open: false,
              touched: false
            },
            {
              name: "Purchased Orders",
              route: "purchased-orders",
              active: false,
              open: false,
              touched: false
            },
            {
              name: "Re-order Alerts",
              route: "re-order-alerts",
              active: false,
              open: false,
              touched: false
            }
          ]
        },
        {
          name: "User Management",
          icon: "cog",
          active: false,
          open: false,
          touched: false,
          items: [
            {
              name: "Users",
              route: "users",
              active: false,
              open: false,
              touched: false
            },
            {
              name: "Roles",
              route: "roles",
              active: false,
              open: false,
              touched: false
            },
            {
              name: "Permissions",
              route: "permissions",
              active: false,
              open: false,
              touched: false
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
    submenu.active = submenu.route === route
    submenu = activateMenuItemsRecursively(submenu, route)

    if (submenu.active === true) {
      hasActiveItem = submenu.active
    }

    return submenu
  })

  menu.active = menu.active || hasActiveItem

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
      if (!draft.touched && draft.active) {
        draft.open = draft.active
      }
      
      draft.open = !draft.open // enabled toggle when sidebar item is clicked
      draft.touched = true
    })

    return clone
  })
}

export const SidebarStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store) => ({
    activate: (url: string): void => {
      let route = RouteHelper.transformUrl(url);

      if (_.isNil(url)) {
        return
      }
      
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