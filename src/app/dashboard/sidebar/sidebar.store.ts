import _ from "lodash"
import { produce } from "immer"
import { patchState, signalStore, withMethods, withState } from "@ngrx/signals"
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
        },
        {
          name: "POS/Checkout",
          icon: "cart-add",
          route: "checkout"
        }
      ]
    },
    {
      name: "Main Menu",
      items: [
        {
          name: "Reports & Analytics",
          icon: "bar-chart-alt-2",
          items: [
            {
              name: "Sales Reports",
              route: "sales"
            },
            {
              name: "Inventory Reports",
              route: "inventory"
            },
            {
              name: "Supplier Reports",
              route: "suppliers"
            }
          ]
        },
        {
          name: "Inventory Management",
          icon: "grid-alt",
          items: [
            {
              name: "Products",
              route: "products"
            },
            {
              name: "Categories",
              route: "categories"
            },
            {
              name: "Brands",
              route: "brands"
            },
            {
              name: "Locations",
              route: "locations"
            },
            {
              name: "Batches",
              route: "batches"
            },
            {
              name: "Stocks Adjustments",
              route: "stocks-adjustment"
            },
            {
              name: "Stock Movements",
              route: "stock-movement"
            }
          ]
        },
        {
          name: "Supplier Management",
          icon: "package",
          route: "damage",
          items: [
            {
              name: "Suppliers",
              route: "suppliers",
            },
            {
              name: "Purchased Orders",
              route: "purchased-orders"
            },
            {
              name: "Re-order Alerts",
              route: "re-order-alerts"
            }
          ]
        },
        {
          name: "User Management",
          icon: "cog",
          items: [
            {
              name: "Users",
              route: "users"
            },
            {
              name: "Roles",
              route: "roles"
            },
            {
              name: "Permissions",
              route: "permissions"
            }
          ]
        },
        // {
        //   name: "Sales Management",
        //   icon: "credit-card",
        //   route: "",
        //   items: [
        //     {
        //       name: "Biling & Checkout",
        //       route: "",
        //       active: false,
        //     },
        //     {
        //       name: "Transactions History",
        //       route: "",
        //       active: false,
        //     },
        //     {
        //       name: "Sales Report",
        //       route: "",
        //       active: false,
        //     }
        //   ]
        // },
        // {
        //   name: "Inventory Management",
        //   icon: "grid-alt",
        //   route: "",
        //   active: false,
        //   items: [
        //     {
        //       name: "Stocks Overview",
        //       route: "",
        //       active: false,
        //     },
        //     {
        //       name: "Stock Movements",
        //       route: "",
        //       active: false,
        //     },
        //     {
        //       name: "Stock Adjustments",
        //       route: "",
        //       active: false,
        //     },
        //     {
        //       name: "Warehouse Managem.",
        //       route: "",
        //       active: false,
        //     },
        //     {
        //       name: "Re-Order Alerts",
        //       route: "",
        //       active: false,
        //       items: [
        //         {
        //           name: "Stock Adjustments",
        //           route: "",
        //           active: false,
        //         },
        //         {
        //           name: "Warehouse Managem.",
        //           route: "",
        //           active: false,
        //         },
        //       ]
        //     }
        //   ]
        // },
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
      draft.active = !draft.active
    })

    return clone
  })
}

export const SidebarStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store) => ({
    init: (url: string): void => {
      let routes = url.split("/").map(route => route == "dashboard" ? "" : route)
      let route = _.last(routes)

      if (_.isNil(route)) {
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