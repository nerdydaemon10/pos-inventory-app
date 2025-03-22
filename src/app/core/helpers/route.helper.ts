import _ from "lodash"

export class RouteHelper {
  public static sanitize(url: string): string {
    return url.replace("/dashboard", "").replace(/^\/*/, "")
  }
  
  public static last(route?: string): string | undefined {
    if (_.isNil(route)) {
      return undefined
    }

    return _.last(route.split('/'))
  }
  public static includes(routeA: string, routeB?: string): boolean {
    const routes = routeA.split("/")
    
    for (let i = 0; i < routes.length; i++) {
      if (routes[i] === routeB) {
        return true
      }
    }

    return false
  }
}