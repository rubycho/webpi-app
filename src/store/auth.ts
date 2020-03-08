import {observable, action} from "mobx";
import Autobind from 'autobind-decorator';

import RootStore from "./index";

import {instance, authAPI} from "../api";
import {credentials} from "../api/auth";

@Autobind
class AuthStore {
  private rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @observable passedLogin = false;

  @action tryLogin = (host: string, cr: credentials) =>
    this.rootStore.decorate(
      async () => {
        instance.defaults.baseURL = host;

        const resp = await authAPI.token(cr);
        this.passedLogin = true;
        return resp;
      }, true, `Hello, ${cr.username}!`, 'Failed to login :( Check your credentials');
}

export default AuthStore;
