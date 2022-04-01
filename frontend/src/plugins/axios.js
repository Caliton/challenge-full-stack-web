import axios from 'axios'

export default async ({ Vue }) => {
  const axiosInstance = axios.create({
    baseURL: process.env.VUE_APP_API || ' http://localhost:3000/',
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
        message: 'Something bad happened:('
      }

      if (error.response) {
        // eslint-disable-next-line no-unused-vars
        const { status, data } = error.response
        const message = 'Problema interno no servidor'

        notification.message = (Array.isArray(data.message) ? data.message[0] : data.message) ||
          message

        // EventBus.$emit('showNotify', notification)
        // console.log('notification: ', notification)

        return Promise.reject(error)
      }
    }
  )

  Vue.prototype.$axios = axiosInstance
}
