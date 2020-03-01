import camelcaseKeys from "camelcase-keys";

export type Process = {
  pid: number;
  name: string;
  cpuPercent: number;
  vms: number;
}

export const process = (data?: object) => {
  if (data)
    return camelcaseKeys(data) as Process;

  return {
    pid: 0,
    name: 'unknown',
    cpuPercent: 0.0,
    vms: 0,
  } as Process;
};

export type SystemInfo = {
  rpi: string;
  cpu: string;
  totalMem: number;
  dist: string;
}

export const systemInfo = (data?: object) => {
  if (data)
    return camelcaseKeys(data) as SystemInfo;

  return {
    rpi: 'RPI',
    cpu: 'ARM',
    totalMem: 0,
    dist: 'Raspbian',
  } as SystemInfo;
};

export type SystemStatus = {
  usingMem: number;
  numProc: number;
  temperature: [number];
  currentTime: string;
}

export const systemStatus = (data?: object) => {
  if (data)
    return camelcaseKeys(data) as SystemStatus;

  return {
    usingMem: 0,
    numProc: 0,
    temperature: [0],
    currentTime: 'unknown',
  } as SystemStatus;
};
