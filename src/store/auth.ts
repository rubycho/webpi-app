import {observable, action} from "mobx";

import {authAPI} from "../api";
import {credentials} from "../api/auth";

export default class AuthStore {
  @observable passedLogin = false;

  @action
  async tryLogin(cr: credentials) {
    try {
      const resp = await authAPI.token(cr);
      this.passedLogin = true;
      return resp;
    } catch {
      //
    }
  }
}
