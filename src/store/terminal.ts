import {action, observable} from "mobx";
import Autobind from 'autobind-decorator';

import RootStore from "./index";

import {terminal, Terminal} from "../api/models/terminal";

import {terminalAPI} from "../api";
import {TerminalUpdateType} from "../api/terminal";

@Autobind
class TerminalStore {
  private rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

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

  @action getTerminals = () =>
    this.rootStore.decorate(async () => {
      this.terminals = await terminalAPI.getTerminals();
    }, true, null, 'Failed to retrieve terminals');

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
    } catch { /* empty */ }
  }

  @action createTerminal = () =>
    this.rootStore.decorate(async () => {
      this._terminal = await terminalAPI.createTerminal();
      this.lastSuccessful = true;
    }, true, 'You\'re now connected to newly created terminal', 'Failed to create terminal');

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
    } catch { this.lastSuccessful = false; }
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
    } catch { this.lastSuccessful = false; }
  }

  @action destroyTerminal = (term: Terminal) =>
    this.rootStore.decorate(async () => {
      await terminalAPI.destroyTerminal(term.id);
    }, true, 'Destroy Terminal: OK', 'Failed to destroy terminal');
}

export default TerminalStore;
