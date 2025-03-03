export class RouteHelper {
  public static toRoutes(url: string): string[] {
    const routes = url.split("/")
    const excludes = ["", "dashboard"]
    return routes.filter(route => !excludes.includes(route))
  }
}