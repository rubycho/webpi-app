import camelcaseKeys from "camelcase-keys";

export type Pin = {
  pin: number;
  type: string;
  mode: number;
  value: number;
  pwm: boolean;
  pwmFreq: number;
  pwmDutycycle: number;
}

export const pin = (data?: object) => {
  if (data)
    return camelcaseKeys(data) as Pin;

  return {
    pin: 0,
    type: 'GENERAL',
    mode: 0,
    value: 0,
    pwm: false,
    pwmFreq: 0,
    pwmDutycycle: 0,
  } as Pin;
};
