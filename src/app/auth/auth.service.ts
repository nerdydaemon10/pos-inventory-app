import { Observable } from "rxjs"
import { LoginDto } from "./login/login.dto"
import { ApiResponse } from "../core/types/api-response.type"
import { ObjectHelper } from "../core/helpers/object.helper"
import { HttpClient } from "@angular/common/http"
import { Inject, Injectable } from "@angular/core"
import { ApiService } from "../core/services/api.service"
import { User } from "../users/user.type"
import { BASE_URL } from "../core/constants.provider"

@Injectable({
  providedIn: 'root'
})
export class AuthService extends ApiService {
  constructor(http: HttpClient, @Inject(BASE_URL) baseUrl: string) {
    super(http, baseUrl);
  }

  public login(login: LoginDto): Observable<ApiResponse<User>> {
    const data = ObjectHelper.keysToSnakeCase(login)
    return this.post("auth/login/", data)
  }
}