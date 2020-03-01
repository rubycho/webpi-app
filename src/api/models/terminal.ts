import camelcaseKeys from "camelcase-keys";

export type Terminal = {
  id: string;
  password: string;
  created: string;
  updated: string;
}

export const terminal = (data?: object) => {
  if (data)
    return camelcaseKeys(data) as Terminal;

  return {
    id: 'unknown',
    password: '********',
    created: 'unknown',
    updated: 'unknown',
  } as Terminal;
};
