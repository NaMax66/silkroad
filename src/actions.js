import axios from 'axios'

function getUrl (action) {
  let url = 'https://silkroad.na4u.ru/api/'

  if (process.env.NODE_ENV === 'development') {
    url = 'http://localhost:5000/api/'
  }
  return url + action
}

export const sendOrder = (order) => {
  return axios.post(getUrl('new_order'), order)
}

export const changePrice = (newPrice) => {
  return axios.post(getUrl('change_price'), newPrice)
}

export const getPrice = () => {
  return axios.get(getUrl('get_price'))
}
