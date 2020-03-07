import {action, observable} from "mobx";
import Autobind from 'autobind-decorator';

import RootStore from "./index";

import {gpioAPI} from "../api";
import {Pin} from "../api/models/gpio";
import {PinModeForm, PinPWMForm, PinUpdateType, PinValueForm} from "../api/gpio";

@Autobind
class GPIOStore {
  private rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @observable pins: Pin[] = [];

  @action getPins = () =>
    this.rootStore.decorate(async () => {
    this.pins = await gpioAPI.getPins();
  }, true, null, 'Failed to retrieve pins');

  @action setMode = (pin: number, data: PinModeForm) =>
    this.rootStore.decorate(async () => {
      await gpioAPI.updatePin(pin, PinUpdateType.mode, data);
  }, true, 'Set mode: OK', 'Failed to set mode');

  @action setValue = (pin: number, data: PinValueForm) =>
    this.rootStore.decorate(async () => {
      await gpioAPI.updatePin(pin, PinUpdateType.value, data);
  }, true, 'Set value: OK', 'Failed to set value');

  @action setPWM = (pin: number, data: PinPWMForm) =>
    this.rootStore.decorate(async () => {
      await gpioAPI.updatePin(pin, PinUpdateType.pwm, data);
    }, true, 'Set PWM: OK', 'Failed to set PWM');
}

export default GPIOStore;
