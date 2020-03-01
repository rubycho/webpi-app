import {AxiosInstance} from "axios";
import camelcaseKeys from "camelcase-keys";

import {Process, systemInfo, systemStatus} from "./models/system";

export class SystemAPI {
  private axios: AxiosInstance;

  constructor(axios: AxiosInstance) {
    this.axios = axios;
  }

  getSystemInfo() {
    return this.axios.get(`/sys/pi-info/`)
      .then(resp => {
        return systemInfo(resp.data);
      });
  }

  getSystemStatus() {
    return this.axios.get(`/sys/pi-status/`)
      .then(resp => {
        return systemStatus(resp.data);
      });
  }

  getProcCPU() {
    return this.axios.get(`/sys/proc-cpu/`)
      .then(resp => {
        return camelcaseKeys(resp.data) as Process[];
      });
  }

  getProcMem() {
    return this.axios.get(`/sys/proc-mem/`)
      .then(resp => {
        return camelcaseKeys(resp.data) as Process[];
      });
  }
}
