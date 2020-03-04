import {action, observable} from "mobx";

import FileSaver from 'file-saver';
import Path from 'path';

import {File} from "../api/models/disk";
import {diskAPI} from "../api";

const compareFile = (f1: File, f2: File) => {
  if (f1.isDir === f2.isDir) return f1.name.localeCompare(f2.name);
  else return f1.isDir ? -1 : 1;
};

export default class DiskStore {
  @observable path: string = '/home/pi/';
  @observable files: File[] = [];

  @action
  async listDirectory(path?: string, append?: boolean) {
    let tmpPath = this.path;
    if (path)
      if (append) tmpPath = Path.join(this.path, path);
      else tmpPath = path;

    try {
      this.files = await diskAPI.listDirectory(tmpPath);
      this.files = this.files.slice().sort(compareFile);
      this.path = tmpPath;
    } catch {
      //
    }
  }

  @action
  async downloadFile(filename: string) {
    try {
      const data = await diskAPI.downloadFile(
        Path.join(this.path, filename)
      );
      FileSaver.saveAs(new Blob([data]), filename);
    } catch {
      //
    }
  }

  @action
  async createDirectory(dirname: string) {
    try {
      await diskAPI.createDirectory({path: this.path, dirname});
    } catch {
      //
    }
  }

  @action
  async uploadFile(file: FileList) {
    try {
      await diskAPI.uploadFile({path: this.path, file: file[0]});
    } catch {
      //
    }
  }

  @action
  async deleteItem(filename: string) {
    try {
      await diskAPI.deleteItem(
        Path.join(this.path, filename)
      );
    } catch {
      //
    }
  }
}
