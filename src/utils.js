const isValid = (price) => {
  if (!price) {
    console.log('price is invalid. Value = ', price)
  }
  return !!price
}

export const getNicePrice = (price) => {
  if (!isValid(price)) {
    price = 0
  }
  return price.toLocaleString() + ' руб'
}

export const validatePrice = (price) => {
  if (price.list) {
    price.list.forEach(el => {
      el.price = +el.price
      el.packageAmount = +el.packageAmount
    })
  }
  return price
}

export const validateOrders = (orders) => {
  return orders
}

export const getUrl = () => {
  let url = 'https://silkroad.na4u.ru/'
  if (process.env.NODE_ENV === 'development') {
    url = 'http://localhost:8000/'
  }
  return url
}
