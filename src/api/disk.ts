import {AxiosInstance} from "axios";
import camelcaseKeys from "camelcase-keys";

import {File} from './models/disk';

interface FileForm {
  path: string;
  file: any;
}

interface DirForm {
  path: string;
  dirname: string;
}

export class DiskAPI {
  private axios: AxiosInstance;

  constructor(axios: AxiosInstance) {
    this.axios = axios;
  }

  listDirectory(path: string) {
    return this.axios.get(`/disk/list/?path=${path}`)
      .then(resp => {
        return camelcaseKeys(resp.data) as File[];
      });
  }

  downloadFile(path: string) {
    return this.axios.get(
      `/disk/download/?path=${path}`,
      { responseType: 'blob' }
    )
      .then(resp => resp.data);
  }

  uploadFile(form: FileForm) {
    const formData = new FormData();
    formData.append('path', form.path);
    formData.append('file', form.file);

    return this.axios.post(`/disk/upload/`,
      formData,
      {
        headers: {'Content-Type': 'multipart/form-data'}
      });
  }

  createDirectory(form: DirForm) {
    return this.axios.post(`/disk/create-dir/`, form);
  }

  deleteItem(path: string) {
    return this.axios.post(`/disk/delete/`, {
      path
    });
  }
}
