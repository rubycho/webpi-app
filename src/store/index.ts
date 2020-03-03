import AuthStore from "./auth";
import SystemStore from "./system";

export enum StoreType {
  ROOT_STORE = 'rootStore',
  AUTH_STORE = 'authStore',
  SYSTEM_STORE = 'systemStore',
}

export default class RootStore {
  authStore: AuthStore = new AuthStore();
  systemStore: SystemStore = new SystemStore();
}
