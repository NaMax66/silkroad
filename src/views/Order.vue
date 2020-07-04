<template>
  <div class="container">
    <h1 class="text-danger mb-5" v-if="isOperatorPhoneShown">Свяжитесь с нами по телефону: <br> {{operatorPhone}}</h1>
    <table class="table table-sm table-striped" v-if="getPrice">
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
            <button type="button" style="min-width: 40px" class="btn btn-secondary btn-sm disabled" aria-disabled="true">{{getAmount(product)}}</button>
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
    <!--todo ограничить число символов, сделать проверку-->
    <div>
      <textarea class="mt-2 w-100" placeholder="Комментарии к заказу(не обязательно)" v-model="comment" rows="2"></textarea>
    </div>
    <button class="btn btn-danger" @click="handleActionBtn">Оформить заказ</button>
    <v-modal :is-modal-shown="isModalShown">
          <div class="modal-header">
            <h5 class="modal-title">Ваш заказ подготовлен</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="isModalShown = false">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p>Точно выбрали всё что надо? <br> Если да - введите имя и телефон. Нажмите "Оформить заказ"</p>
            <input type="text" class="form-control" placeholder="Ваше имя" v-model="name">
            <input type="text" class="form-control  mt-2" placeholder="Ваш телефон" v-model="phone">
          </div>
          <div v-if="!isFetching" class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="isModalShown = false">Вернуться</button>
            <button type="button" class="btn btn-danger" @click="sendOrder">Оформить заказ</button>
          </div>
          <div class="text-center p-2">
            <div  v-if="isFetching" class="spinner-border" role="status">
              <span class="sr-only">Подождите...</span>
            </div>
          </div>
    </v-modal>
    <v-modal :is-modal-shown="isModalSuccessShown">
      <div class="modal-body">
        <h3>Ваш заказ отправлен!</h3>
        <h3>Мы вам перезвоним</h3>
      </div>
      <div class="modal-footer">
        <button class="btn btn-danger" @click="makeNewOrder">Оформить новый заказ</button>
      </div>
    </v-modal>
    <v-modal :is-modal-shown="isModalErrorShown">
      <div class="modal-body">
        <h3>Не удалось оформить заказ автоматически</h3>
        <p>Свяжитесь с нами по телефону:</p>
        <!--todo узнать телефон на всякйи случай-->
        <h1>{{operatorPhone}}</h1>
      </div>
      <div class="modal-footer">
        <button class="btn btn-danger" @click="closeModalError">Оформить новый заказ</button>
      </div>
    </v-modal>
  </div>
</template>

<script>
import { getNicePrice } from '@/utils'
import { mapGetters, mapActions } from 'vuex'
import { sendOrder } from '@/actions'
import VModal from '@/components/VModal'

export default {
  components: {
    VModal
  },
  data: () => ({
    isModalShown: false,
    isModalSuccessShown: false,
    isModalErrorShown: false,
    phone: '',
    name: '',
    comment: '',
    isFetching: false,
    isOperatorPhoneShown: false,
    operatorPhone: '555-55-55'
  }),
  filters: {
    getNicePrice (price) {
      return getNicePrice(price)
    }
  },
  computed: {
    ...mapGetters(['getPrice', 'getOrder', 'getTotalOrderSum'])
  },
  async created () {
    await this.initPrice()
  },
  methods: {
    ...mapActions(['initPrice', 'addToOrder', 'clearOrder']),
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
      this.isModalShown = true
    },
    async sendOrder () {
      /* todo возвращать с сервера уникальный номер заказа. Показывать заказчику */
      this.isFetching = true
      const order = {
        newOrder: this.getOrder,
        name: this.name,
        phone: this.phone,
        comment: this.comment.substring(0, 3000),
        total: this.getTotalOrderSum
      }
      let res = {}
      try {
        res = await sendOrder(order)
      } catch (e) {
        console.log(e)
        res.data = 'NO RESPONSE'
      }
      if (res.data === 'OK') {
        this.showModalSuccess()
      } else {
        this.showModalError()
      }
      this.isModalShown = false
      this.isFetching = false
    },
    showModalSuccess () {
      this.isModalSuccessShown = true
    },
    showModalError () {
      this.isModalErrorShown = true
    },
    makeNewOrder () {
      this.isModalSuccessShown = false
      /* очищаем объект заказ */
      this.clearOrder()
    },
    closeModalError () {
      this.isModalErrorShown = false
      this.isOperatorPhoneShown = true
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
