import {AxiosInstance} from "axios";
import camelcaseKeys from "camelcase-keys";

import {terminal, Terminal} from "./models/terminal";

export enum TerminalUpdateType {
  stdin='stdin',
  stdout='stdout',
}

interface TerminalSTDINForm {
  password: string;
  input: string;
}

interface TerminalSTDOUTForm {
  password: string;
}

export class TerminalAPI {
  private axios: AxiosInstance;

  constructor(axios: AxiosInstance) {
    this.axios = axios;
  }

  getTerminals() {
    return this.axios.get(`/term/`)
      .then(resp => {
        return camelcaseKeys(resp.data) as Terminal[];
      });
  }

  getTerminal(termId: string) {
    return this.axios.get(`/term/${termId}/`)
      .then(resp => {
        return terminal(resp.data);
      });
  }

  createTerminal() {
    return this.axios.post(`/term/`)
      .then(resp => {
        return terminal(resp.data);
      });
  }

  updateTerminal(termId: string,
                 type: TerminalUpdateType, form: TerminalSTDINForm | TerminalSTDOUTForm) {
    const body = form as any;
    body.type = type;

    return this.axios.put(`/term/${termId}/`, body)
      .then(resp => {
        return resp.data;
      });
  }

  destroyTerminal(termId: string) {
    return this.axios.delete(`/term/${termId}/`);
  }
}
