import _ from "lodash"

export class RouteHelper {
  public static transformUrl(url: string): string {
    return url.replace("/dashboard", "").replace(/^\/*/, '')
  }
}