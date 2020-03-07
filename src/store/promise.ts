import {observable} from "mobx";


export default class PromiseStore {
  @observable promisePending = false;

  @observable snackSuccessOpen = false;
  @observable snackSuccessMessage = 'successful :)';

  @observable snackFailureOpen = false;
  @observable snackFailureMessage = 'unknown error occured :(';

  async decorate(
    f: Function,
    enableDrop: boolean,
    successMessage: string | null,
    failureMessage: string | null
  ) {
    if (enableDrop) this.setPromisePending(true);

    try {
      const result = await f();

      if (successMessage)
        this.setSnackSuccess(true, successMessage);
      return result;
    } catch {
      if (failureMessage)
        this.setSnackFailure(true, failureMessage);
    } finally {
      if (enableDrop) this.setPromisePending(false);
    }
  }

  setPromisePending(v: boolean) {
    this.promisePending = v;
  }

  setSnackSuccess(open: boolean, message?: string) {
    this.snackSuccessOpen = open;

    if (message)
      this.snackSuccessMessage = message;
  }

  setSnackFailure(open: boolean, message?: string) {
    this.snackFailureOpen = open;

    if (message)
      this.snackFailureMessage = message;
  }
}
