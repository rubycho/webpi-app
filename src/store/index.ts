import AuthStore from "./auth";
import SystemStore from "./system";
import DiskStore from "./disk";
import GPIOStore from "./gpio";
import TerminalStore from "./terminal";
import PromiseStore from "./promise";

export enum StoreType {
  ROOT_STORE = 'rootStore',
  AUTH_STORE = 'authStore',
  SYSTEM_STORE = 'systemStore',
  DISK_STORE = 'diskStore',
  GPIO_STORE = 'gpioStore',
  TERMINAL_STORE = 'terminalStore',
}

export default class RootStore extends PromiseStore {
  authStore: AuthStore = new AuthStore(this);
  systemStore: SystemStore = new SystemStore(this);
  diskStore: DiskStore = new DiskStore(this);
  gpioStore: GPIOStore = new GPIOStore(this);
  terminalStore: TerminalStore = new TerminalStore(this);
}
