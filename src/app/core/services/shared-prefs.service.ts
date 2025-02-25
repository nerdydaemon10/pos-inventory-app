import _ from 'lodash'

export class SharedPrefsService {
  static set(key: string, value: any): void {
    if (_.isObject(value)) {
      localStorage.setItem(key, JSON.stringify(value))
      return
    }
    localStorage.setItem(key, value)
  }
  static get<T = any>(key: string): T | any {
    const data = localStorage.getItem(key)

    if (_.isNil(data)) {
      return undefined
    }

    const obj = JSON.parse(data) as T

    if (_.isObject(obj)) {
      return obj
    }

    return data
  }
  static clear(): void {
    localStorage.clear()
  }
}