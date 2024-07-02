import { HttpStatusCode } from "@angular/common/http";
import { LoginResult } from "./login-result.model";

export interface LoginResponse {
  errorMessages: string[],
  isSuccess: boolean,
  result: LoginResult,
  statusCode: HttpStatusCode;
}