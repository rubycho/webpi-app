import AuthStore from "./auth";

export enum StoreType {
  ROOT_STORE = 'rootStore',
  AUTH_STORE = 'authStore',
}

export default class RootStore {
  authStore: AuthStore = new AuthStore();
}
