import axios from 'axios'

export default async ({ Vue }) => {
  const axiosInstance = axios.create({
    baseURL: process.env.API || ' http://192.168.0.3:3000/',
    withCredentials: false,
    crossdomain: true,
    headers: {
      'Content-Type': 'application/json'
    }
  })

  axiosInstance.interceptors.response.use(
    response => {
      return response
    },

    error => {
      const notification = {
        color: 'red',
        textColor: 'white',
        icon: 'error_outline',
        message: 'Alguma coisa aconteceu de ruim :('
      }

      if (error.response) {
        const { status, data } = error.response
        const message = 'Problema interno no servidor'

        console.log(status)

        notification.message = (Array.isArray(data.message) ? data.message[0] : data.message) ||
          message

        // EventBus.$emit('showNotify', notification)
        console.log('notification: ', notification)

        return Promise.reject(error)
      }
    }
  )

  Vue.prototype.$axios = axiosInstance
}
