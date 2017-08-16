import axios from 'axios'

const apiUrl = process.env.APP_API_URL

// allow use http client without Vue instance
export const http = axios.create({
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'application/json'
  }
})

// receive store and data by options
// https://vuejs.org/v2/guide/plugins.html
export default function install (Vue, { store, router }) {
  Object.defineProperty(Vue.prototype, '$http', {
    get () {
      return http
    }
  })
}
