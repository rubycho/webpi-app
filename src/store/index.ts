import AuthStore from "./auth";
import SystemStore from "./system";
import DiskStore from "./disk";
import GPIOStore from "./gpio";
import TerminalStore from "./terminal";

export enum StoreType {
  ROOT_STORE = 'rootStore',
  AUTH_STORE = 'authStore',
  SYSTEM_STORE = 'systemStore',
  DISK_STORE = 'diskStore',
  GPIO_STORE = 'gpioStore',
  TERMINAL_STORE = 'terminalStore',
}

export default class RootStore {
  authStore: AuthStore = new AuthStore();
  systemStore: SystemStore = new SystemStore();
  diskStore: DiskStore = new DiskStore();
  gpioStore: GPIOStore = new GPIOStore();
  terminalStore: TerminalStore = new TerminalStore();
}
