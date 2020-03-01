import {AxiosInstance} from 'axios';

interface credentials {
  username: string;
  password: string;
}

interface tokenResponse {
  token: string;
}

export class AuthAPI {
  private axios: AxiosInstance;

  constructor(axios: AxiosInstance) {
    this.axios = axios;
  }

  token(cr: credentials) {
    return this.axios.post('/auth/', cr)
      .then(resp => {
        const data = resp.data as tokenResponse;
        this.axios.defaults.headers.common['Authorization'] = `Token ${data.token}`;

        return resp;
      });
  }
}
