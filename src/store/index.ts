import AuthStore from "./auth";
import SystemStore from "./system";
import DiskStore from "./disk";

export enum StoreType {
  ROOT_STORE = 'rootStore',
  AUTH_STORE = 'authStore',
  SYSTEM_STORE = 'systemStore',
  DISK_STORE = 'diskStore',
}

export default class RootStore {
  authStore: AuthStore = new AuthStore();
  systemStore: SystemStore = new SystemStore();
  diskStore: DiskStore = new DiskStore();
}
