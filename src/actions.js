import axios from 'axios'

export const sendOrder = (order) => {
  let url = 'https://silkroad.na4u.ru/api/new_order'

  if (process.env.NODE_ENV === 'development') {
    url = 'http://localhost:5000/api/new_order'
  }
  return axios.post(url, order)
}
