<template>
  <div class="container">
    <table class="table table-sm table-striped">
      <thead>
      <tr>
        <th scope="col">№</th>
        <th scope="col">Название</th>
        <th scope="col">Цена, шт.</th>
        <th scope="col">Мин. кол-во</th>
        <th scope="col">В заказе, шт</th>
        <th scope="col">Сумма</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(product, index) in getPrice.list" :key="product.id">
        <td scope="row">{{ index }}</td>
        <td>{{product.name}}</td>
        <td>{{product.price | getNicePrice}}</td>
        <td>{{product.packageAmount}} шт.</td>
        <th scope="col">
          <div class="btn-group" role="group" aria-label="Basic example">
            <button type="button" class="btn btn-secondary btn-sm" @click="addAmount('minus', product.id)">-</button>
            <button type="button" class="btn btn-secondary btn-sm disabled" aria-disabled="true">{{getAmount(product)}}</button>
            <button type="button" class="btn btn-secondary btn-sm" @click="addAmount('plus', product.id)">+</button>
          </div>
        </th>
        <td>{{getProductPrice(product)}}</td>
      </tr>
      <tr>
        <td colspan="5" class="text-right">Итого на сумму:</td>
        <td>{{getTotalOrderSum | getNicePrice}}</td>
      </tr>
      </tbody>
    </table>
    <button class="btn btn-danger" @click="handleActionBtn">Оформить заказ</button>
    <div :class="{modalBackground: showModal}">
      <div class="modal" :class="{'d-block' : showModal}" tabindex="-1" role="dialog">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Ваш заказ подготовлен</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="showModal = false">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <p>Точно выбрали всё что надо? <br> Если да - введите ваш телефон, имя и нажмите "Оформить заказ"</p>
              <input type="text" class="form-control" placeholder="Ваш телефон" v-model="phone">
              <input type="text" class="form-control mt-2" placeholder="Ваше имя" v-model="name">
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="showModal = false">Вернуться</button>
              <button type="button" class="btn btn-danger" @click="sendOrder">Оформить заказ</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getNicePrice } from '@/utils'
import { mapGetters, mapMutations } from 'vuex'
import { sendOrder } from '@/actions'

export default {
  data: () => ({
    showModal: true,
    phone: '',
    name: ''
  }),
  filters: {
    getNicePrice (price) {
      return getNicePrice(price)
    }
  },
  computed: {
    ...mapGetters(['getPrice', 'getOrder', 'getTotalOrderSum'])
  },
  created () {
    this.initPrice()
  },
  methods: {
    ...mapMutations(['initPrice', 'addToOrder']),
    getProductPrice (product) {
      const productInOrder = this.getOrder.find(el => el.id === product.id)
      let total = getNicePrice(0)
      if (productInOrder) {
        total = getNicePrice(productInOrder.price * productInOrder.amount)
      }
      return total
    },
    getAmount (product) {
      const productInOrder = this.getOrder.find(el => el.id === product.id)
      return productInOrder && productInOrder.amount ? productInOrder.amount : 0
    },
    addAmount (operator, id) {
      this.addToOrder({ operator, id })
    },
    handleActionBtn () {
      this.showModal = true
    },
    async sendOrder () {
      const res = await sendOrder(this.getOrder)
      if (res.data === 'OK') {
        this.showModal = false
      }
    }
  }
}
</script>

<style scoped>
.modalBackground {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.62);
}
</style>
