import AuthStore from "./auth";
import SystemStore from "./system";
import DiskStore from "./disk";
import GPIOStore from "./gpio";

export enum StoreType {
  ROOT_STORE = 'rootStore',
  AUTH_STORE = 'authStore',
  SYSTEM_STORE = 'systemStore',
  DISK_STORE = 'diskStore',
  GPIO_STORE = 'gpioStore',
}

export default class RootStore {
  authStore: AuthStore = new AuthStore();
  systemStore: SystemStore = new SystemStore();
  diskStore: DiskStore = new DiskStore();
  gpioStore: GPIOStore = new GPIOStore();
}
