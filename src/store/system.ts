import {action, observable} from "mobx";

import {Process, SystemInfo, systemInfo, SystemStatus, systemStatus} from "../api/models/system";
import {systemAPI} from "../api";

export default class SystemStore {
  @observable _systemInfo: SystemInfo = systemInfo();
  @observable _systemStatus: SystemStatus = systemStatus();
  @observable _procCPU: Process[] = [];
  @observable _procMem: Process[] = [];

  @action
  async getSystemInfo() {
    try {
      this._systemInfo = await systemAPI.getSystemInfo();
    } catch {
      //
    }
  }

  @action
  async getSystemStatus() {
    try {
      this._systemStatus = await systemAPI.getSystemStatus();
    } catch {
      //
    }
  }

  @action
  async getProcCPU() {
    try {
      this._procCPU = await systemAPI.getProcCPU()
    } catch {
      //
    }
  }

  @action
  async getProcMem() {
    try {
      this._procMem = await systemAPI.getProcMem();
    } catch {
      //
    }
  }
}
