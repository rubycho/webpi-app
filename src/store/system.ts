import {action, observable} from "mobx";
import Autobind from 'autobind-decorator';

import RootStore from "./index";

import {Process, SystemInfo, systemInfo, SystemStatus, systemStatus} from "../api/models/system";
import {systemAPI} from "../api";

@Autobind
class SystemStore {
  private rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @observable _systemInfo: SystemInfo = systemInfo();
  @observable _systemStatus: SystemStatus = systemStatus();
  @observable _procCPU: Process[] = [];
  @observable _procMem: Process[] = [];

  @action getSystemInfo = () =>
    this.rootStore.decorate(async () => {
      this._systemInfo = await systemAPI.getSystemInfo();
    }, false, null, 'Failed to retrieve system info.');

  @action getSystemStatus = () =>
    this.rootStore.decorate(async () => {
      this._systemStatus = await systemAPI.getSystemStatus();
    }, false, null, 'Failed to retrieve system status.');

  @action getProcCPU = () =>
    this.rootStore.decorate(async () => {
      this._procCPU = await systemAPI.getProcCPU()
    }, false, null, 'Failed to retrieve process info.');

  @action getProcMem = () =>
    this.rootStore.decorate(async () => {
      this._procMem = await systemAPI.getProcMem();
    }, false, null, 'Failed to retrieve process info.');
}

export default SystemStore;
