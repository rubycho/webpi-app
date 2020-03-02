import axios from 'axios';

import {AuthAPI} from './auth';
import {DiskAPI} from "./disk";
import {GPIOAPI} from "./gpio";
import {SystemAPI} from "./system";
import {TerminalAPI} from "./terminal";


const instance = axios.create({
  baseURL: process.env.REACT_APP_API_HOST,
});

export const authAPI = new AuthAPI(instance);
export const diskAPI = new DiskAPI(instance);
export const gpioAPI = new GPIOAPI(instance);
export const systemAPI = new SystemAPI(instance);
export const terminalAPI = new TerminalAPI(instance);
