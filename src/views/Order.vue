<template>
  <div class="container">
    <h1 class="text-danger mb-5" v-if="isOperatorPhoneShown">{{$t('warnings.connectToUsMsg')}} <br> {{operatorPhone}}</h1>
    <div class="overflow-auto">
      <table class="table table-sm table-striped" v-if="getPrice">
        <thead>
        <tr>
          <th scope="col">{{ $t('table.num') }}</th>
          <th scope="col">{{ $t('table.unitName') }}</th>
          <th scope="col">{{ $t('table.price') }}</th>
          <th scope="col">{{ $t('table.minAmount') }}</th>
          <th scope="col">{{ $t('table.inOrder') }}</th>
          <th scope="col">{{ $t('table.total') }}</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(product, index) in getPrice.list" :key="product.id">
          <td scope="row">{{ index }}</td>
          <td>{{product.name}}</td>
          <td>{{getNicePrice(product.price) }}</td>
          <td>{{product.packageAmount}} <span>{{$t('units.piece')}}</span></td>
          <th scope="col" style="min-width: 110px;">
            <div class="btn-group" role="group" aria-label="Basic example">
              <button type="button" class="btn btn-secondary btn-sm" @click="addAmount('minus', product.id)">-</button>
              <button type="button" style="min-width: 40px" class="btn btn-secondary btn-sm disabled" aria-disabled="true">{{getAmount(product)}}</button>
              <button type="button" class="btn btn-secondary btn-sm" @click="addAmount('plus', product.id)">+</button>
            </div>
          </th>
          <td style="min-width: 95px">{{getProductPrice(product)}}</td>
        </tr>
        <tr>
          <td colspan="5" class="text-right font-weight-bold">{{$t('table.superTotal')}}</td>
          <td>{{getNicePrice(getTotalOrderSum)}}</td>
        </tr>
        </tbody>
      </table>
    </div>
    <div>
      <textarea class="mt-2 w-100" :placeholder="$t('commentPlaceholder')" v-model="comment" rows="2"></textarea>
    </div>
    <button class="btn btn-danger" @click="handleActionBtn">{{$t('makeOrder')}}</button>
    <v-modal :is-modal-shown="isModalShown">
          <div class="modal-header">
            <h5 class="modal-title">{{$t('newOrderModal.header')}}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="isModalShown = false">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p class="mb-2">{{$t('newOrderModal.msg')}}</p>
            <input type="text" class="form-control" :placeholder="$t('namePlaceholder')" v-model="name">
            <input type="tel" pattern="[0-9]*" novalidate class="form-control  mt-2" :placeholder="$t('phonePlaceholder')" v-model="phone">
            <input type="text" novalidate class="form-control  mt-2" :placeholder="$t('address')" v-model="address">
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="isModalShown = false">{{$t('goBack')}}</button>
            <button type="button" class="btn btn-danger" @click="sendOrder">{{$t('makeOrder')}}</button>
          </div>
    </v-modal>
    <!-- todo add validator -->
    <v-modal :is-modal-shown="isModalSuccessShown">
      <div class="modal-body">
        <h3 v-html="$t('newOrderModal.successMsg')"></h3>
      </div>
      <div class="modal-footer">
        <button class="btn btn-danger" @click="closeModalSuccess">OK</button>
      </div>
    </v-modal>
    <v-modal :is-modal-shown="isModalErrorShown">
      <div class="modal-body">
        <h3>{{$t('warnings.errorMsg')}}</h3>
        <p>{{$t('warnings.connectToUsMsg')}}</p>
        <h1>{{operatorPhone}}</h1>
      </div>
      <div class="modal-footer">
        <button class="btn btn-danger" @click="closeModalError">OK</button>
      </div>
    </v-modal>
  </div>
</template>

<script>
import { getNicePrice } from '@/utils'
import { mapGetters, mapActions } from 'vuex'
import VModal from '@/components/VModal'
import { v4 as uuidv4 } from 'uuid'

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
    address: '',
    comment: '',
    isOperatorPhoneShown: false,
    operatorPhone: '8-928-047-11-00'
  }),
  computed: {
    ...mapGetters(['getPrice', 'getOrder', 'getTotalOrderSum'])
  },
  created () {
    this.$socket.emit('getPrice', null, (data) => {
      this.setPrice(data)
    })
  },
  methods: {
    ...mapActions(['addToOrder', 'clearOrder', 'setPrice']),
    getNicePrice (price) {
      return getNicePrice(price, this.$t('currency'))
    },
    getProductPrice (product) {
      const productInOrder = this.getOrder.find(el => el.id === product.id)
      let total = this.getNicePrice(0)
      if (productInOrder) {
        total = this.getNicePrice(productInOrder.price * productInOrder.amount)
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
      /* todo add the unique order number from server */
      const order = {
        id: uuidv4(),
        newOrder: this.getOrder,
        name: this.name,
        phone: this.phone,
        address: this.address,
        comment: this.comment.substring(0, 3000),
        total: this.getTotalOrderSum,
        time: new Date().toLocaleString()
      }
      this.$socket.emit('newOrderFromClient', order, (msg) => {
        if (msg === 'ok') {
          this.showModalSuccess()
        } else {
          this.showModalError()
        }
      })
      this.isModalShown = false
    },
    showModalSuccess () {
      this.isModalSuccessShown = true
    },
    showModalError () {
      this.isModalErrorShown = true
    },
    closeModalSuccess () {
      this.isModalSuccessShown = false
      this.clearOrder()
      this.comment = ''
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
  position: fixed;
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.62);
}
</style>
