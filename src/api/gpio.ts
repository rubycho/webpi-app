import {AxiosInstance} from "axios";
import camelcaseKeys from "camelcase-keys";

import {pin, Pin} from "./models/gpio";

export enum PinUpdateType {
  mode = 'mode',
  value = 'value',
  pwm = 'pwm',
}

export interface PinModeForm {
  mode: number;
}

export interface PinValueForm {
  value: number;
}

export interface PinPWMForm {
  freq: number;
  dutycycle: number;
}

export class GPIOAPI {
  private axios: AxiosInstance;

  constructor(axios: AxiosInstance) {
    this.axios = axios;
  }

  getPins() {
    return this.axios.get(`/gpio/`)
      .then(resp => {
        return camelcaseKeys(resp.data) as Pin[];
      });
  }

  getPin(_pin: number) {
    return this.axios.get(`/gpio/${_pin}/`)
      .then(resp => {
        return pin(resp.data);
      });
  }

  updatePin(pin: number,
            type: PinUpdateType, form: PinModeForm | PinValueForm | PinPWMForm) {
    const body = form as any;
    body.type = type;

    return this.axios.put(`/gpio/${pin}/`, body);
  }
}
