import {action, observable} from "mobx";

import {gpioAPI} from "../api";
import {Pin} from "../api/models/gpio";
import {PinModeForm, PinPWMForm, PinUpdateType, PinValueForm} from "../api/gpio";

export default class GPIOStore {
  @observable pins: Pin[] = [];

  @action
  async getPins() {
    try {
      this.pins = await gpioAPI.getPins();
    } catch {
      //
    }
  }

  @action
  async setMode(pin: number, data: PinModeForm) {
    try {
      await gpioAPI.updatePin(pin, PinUpdateType.mode, data);
    } catch {
      //
    }
  }

  @action
  async setValue(pin: number, data: PinValueForm) {
    try {
      await gpioAPI.updatePin(pin, PinUpdateType.value, data);
    } catch {
      //
    }
  }

  @action
  async setPWM(pin: number, data: PinPWMForm) {
    try {
      await gpioAPI.updatePin(pin, PinUpdateType.pwm, data);
    } catch {
      //
    }
  }
}
