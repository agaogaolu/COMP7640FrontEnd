<template>
  <div>
    <el-table :data="cartList" style="width: 100%" class="table" border>
      <el-table-column prop="product_name" label="Prodct Name" width="200" align="center">
      </el-table-column>
      <el-table-column prop="price" label="Price" width="200" align="center">
      </el-table-column>
      <el-table-column prop="inventory" label="Inventory" width="200" align="center">
      </el-table-column>
      <el-table-column label="Score" width="200" align="center">
        <div class="block">
          <el-rate :value="3" disabled></el-rate>
        </div>
      </el-table-column>
      <el-table-column prop="buy" label="Add Cart?" width="208" align="center">
        <template v-slot="{ row }">
          <el-button v-if="!row.buy" icon="el-icon-plus" size="small" type="success" @click="handler(row)">加入购物车
          </el-button>
          <el-button v-else size="small" type="danger" @click="handler(row)">取消
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div v-if="true" class="footer">
      <div>此商家总计：（{{ number_count }}）件商品 共 ${{ price_count }} 元</div>
      <el-button type="warning" @click="backVenderList()">Back Vender List</el-button>
    </div>
  </div>
</template>

<script>
import { userGetProduct } from '@/api/user';

export default {
  props: {
    vendorId: {
      type: String,
      required: true
    },
  },
  data() {
    return {
      cartList: [],
      stateCartList: []
    }
  },
  computed: {
    // 计算属性计算价格总和
    price_count() {
      return this.cartList.reduce((sum, obj) => {
        if (obj.buy) {
          sum += obj.price;
        }
        return sum;
      }, 0);
    },
    // 计算属性计算已购买商品的数量
    number_count() {
      return this.cartList.reduce((sum, obj) => {
        if (obj.buy) {
          sum += 1;
        }
        return sum;
      }, 0);
    },
  },
  methods: {
    async getData() {
      this.stateCartList = this.$store.state.cart.cartList
      // console.log("this.stateCartList")
      // console.log(this.stateCartList) 
      if (!this.stateCartList[this.vendorId]) {
        const { product } = await userGetProduct(this.vendorId)
        this.cartList = product.map(e => ({
          ...e,
          buy: false
        }))
      } else {
        const { products } = this.stateCartList[this.vendorId]
        this.cartList = products
      }


    },
    handler(row) {
      row.buy = !row.buy

      // console.log(this.price_count)
    },
    backVenderList() {
      console.log("back")
      this.$store.commit('cart/setCart', { vendorId: this.vendorId, products: this.cartList })
      this.$emit('backVenderList',)
    }
  },
  mounted() {

    this.getData()
  }
}
</script>
<style>
.footer {
  display: flex;
  margin: 5% 20%;
  justify-content: right;
  align-items: center;
}

.footer>* {
  margin: 0 20px;
}
</style>