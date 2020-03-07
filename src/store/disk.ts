import {action, observable} from "mobx";
import Autobind from 'autobind-decorator';

import FileSaver from 'file-saver';
import Path from 'path';

import RootStore from "./index";

import {File} from "../api/models/disk";
import {diskAPI} from "../api";

const compareFile = (f1: File, f2: File) => {
  if (f1.isDir === f2.isDir) return f1.name.localeCompare(f2.name);
  else return f1.isDir ? -1 : 1;
};

@Autobind
class DiskStore {
  private rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @observable path: string = '/home/pi/';
  @observable files: File[] = [];

  @action listDirectory = (path?: string, append?: boolean) =>
    this.rootStore.decorate(async () => {
      let tmpPath = this.path;
      if (path)
        if (append) tmpPath = Path.join(this.path, path);
        else tmpPath = path;

      this.files = await diskAPI.listDirectory(tmpPath);
      this.files = this.files.slice().sort(compareFile);
      this.path = tmpPath;
    }, true, null, 'Failed to retrieve directory items');

  @action downloadFile = (filename: string) =>
    this.rootStore.decorate(async () => {
      const data = await diskAPI.downloadFile(
        Path.join(this.path, filename)
      );
      FileSaver.saveAs(new Blob([data]), filename);
    }, true, 'Download: OK', 'Failed to download file');

  @action createDirectory = (dirname: string) =>
    this.rootStore.decorate(async () => {
      await diskAPI.createDirectory({path: this.path, dirname});
    }, true, 'Directory Creation: OK', 'Failed to create directory');

  @action uploadFile = (file: FileList) =>
    this.rootStore.decorate(async () => {
      await diskAPI.uploadFile({path: this.path, file: file[0]});
    }, true, 'Upload: OK', 'Failed to upload file');

  @action deleteItem = (filename: string) =>
    this.rootStore.decorate(async () => {
      await diskAPI.deleteItem(Path.join(this.path, filename));
      }, true, 'Deletion: OK', 'Failed to delete item');
}

export default DiskStore;
