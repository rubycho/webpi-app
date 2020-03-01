import camelcaseKeys from "camelcase-keys";

export type File = {
  name: string;
  isDir: boolean;
  created: string;
  modified: string;
}

export const file = (data?: object) => {
  if (data)
    return camelcaseKeys(data) as File;

  return {
    name: 'fake.fake',
    isDir: false,
    created: 'unknown',
    modified: 'unknown',
  } as File;
};
