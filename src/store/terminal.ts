import {action, observable} from "mobx";

import {terminal, Terminal} from "../api/models/terminal";

import {terminalAPI} from "../api";
import {TerminalUpdateType} from "../api/terminal";

export default class TerminalStore {
  @observable lastSuccessful = false;
  @observable _terminal: Terminal = terminal();
  @observable terminals: Terminal[] = [];

  @observable stdout = '[waiting for connection...]\r\n';
  @observable offset = '';

  setOutput(data: string) {
    if (data === "") return;

    const _data = data.replace(/\n/g, '\n\r');

    this.offset = _data;
    this.stdout += _data;
  }

  @action
  async getTerminals() {
    try {
      this.terminals = await terminalAPI.getTerminals();
    } catch {
      //
    }
  }

  @action
  async setTerminal(term: Terminal) {
    try {
      const stdout = await terminalAPI.updateTerminal(
        term.id,
        TerminalUpdateType.stdout,
        {password: term.password}
      );
      this.setOutput("\n[connected successfully]\n" + stdout);

      this._terminal = term;
      this.lastSuccessful = true;
    } catch {
      //
    }
  }

  @action
  async createTerminal() {
    try {
      this._terminal = await terminalAPI.createTerminal();
      this.lastSuccessful = true;
    } catch {
      //
    }
  }

  @action
  async tryStdin(input: string) {
    if (!this.lastSuccessful) return;

    let _input = input
      .replace(/\\n/g, '\n')
      .replace(/\\t/g, '\t')
      .replace(/\\N/g, '\\n')
      .replace(/\\t/g, '\\t');

    try {
      await terminalAPI.updateTerminal(
        this._terminal.id,
        TerminalUpdateType.stdin,
        {
        password: this._terminal.password,
        input: _input,
      });
    } catch {
      this.lastSuccessful = false;
    }
  }

  @action
  async tryStdout() {
    if (!this.lastSuccessful) return;

    try {
      const stdout = await terminalAPI.updateTerminal(
        this._terminal.id,
        TerminalUpdateType.stdout,
        {password: this._terminal.password}
      );
      this.setOutput(stdout);
    } catch {
      this.lastSuccessful = false;
    }
  }

  @action
  async destroyTerminal(term: Terminal) {
    try {
      await terminalAPI.destroyTerminal(term.id);
    } catch {
      //
    }
  }
}
