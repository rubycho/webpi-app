import camelcaseKeys from "camelcase-keys";

export type File = {
  name: string;
  size: number;
  isDir: boolean;
  created: string;
  modified: string;
}

export const file = (data?: object) => {
  if (data)
    return camelcaseKeys(data) as File;

  return {
    name: 'fake.fake',
    size: 0,
    isDir: false,
    created: 'unknown',
    modified: 'unknown',
  } as File;
};
