import axios from 'axios'

axios.defaults.baseURL = process.env.API_BASE_URL

class API {
    get = (url: string, params: { [key: string]: any } = {}, config: { [key: string]: any } = {}) => {
        return axios.get(url, { params, ...config})
    }

    post = (url: string, data: { [key: string]: any }, config: { [key: string]: any } = {}) => {
      return axios.post(url, data, config);
    }
}

const api = new API()

export default api
