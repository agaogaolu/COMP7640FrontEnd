<template>
  <div>
    <div  style="margin-bottom: 20px;">
      <el-select style="margin: 5px;" v-model="selectedFilters.colour" placeholder="Select colour">
        <el-option v-for="colour in tagList.colour" :key="colour" :label="colour" :value="colour"></el-option>
      </el-select>
      <el-select style="margin: 5px;"  v-model="selectedFilters.thickness" placeholder="Select thickness">
        <el-option v-for="thickness in tagList.thickness" :key="thickness" :label="thickness"
          :value="thickness"></el-option>
      </el-select>
      <el-select style="margin: 5px;"  v-model="selectedFilters.size" placeholder="Select size">
        <el-option v-for="size in tagList.size" :key="size" :label="size" :value="size"></el-option>
      </el-select>
      <el-button @click="applyFilter">Apply Filter</el-button>
      <el-button @click="resetFilter">Reset Filter</el-button>
    </div>



    <el-table :data="cartList" style="width: 100%" class="table" align="center" border>
      <el-table-column prop="product_name" label="Prodct Name" width="100" align="center">
      </el-table-column>
      <el-table-column prop="price" label="Price" width="100" align="center">
      </el-table-column>
      <el-table-column prop="inventory" label="Inventory" width="100" align="center">
      </el-table-column>
      <el-table-column label="Score" width="200" align="center">
        <div class="block">
          <el-rate :value="3" disabled></el-rate>
        </div>
      </el-table-column>

      <el-table-column label="Tag" width="250" align="center">
        <template v-slot="{ row }">
          <el-tag style="margin: 5px;">{{ row.colour }}</el-tag>
          <el-tag style="margin: 5px;">{{ row.thickness }}</el-tag>
          <el-tag style="margin: 5px;">{{ row.size }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column label="Quantity" width="200" align="center">
        <template v-slot="{ row }">
          <el-input-number size="mini" v-model="row.purchase_count" :min="1" :disabled="!row.buy"></el-input-number>
        </template>
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

import { userGetProduct, userFilter } from '@/api/user';

export default {
  props: {
    vendorId: {
      type: Number,
      required: true
    },
  },
  data() {
    return {
      filterStatus:false,
      cartList: [],
      stateCartList: [],
      userInfo: '',
      tagList: {
        colour: ["black", "blue", "white"],
        size: ["small-size", "over-size"],
        thickness: ["thick", "thin"],
      },
      selectedFilters: {
        colour: '',
        thickness: '',
        size: '',
      },
    }
  },
  computed: {
    // 计算属性计算价格总和
    price_count() {
      return this.cartList.reduce((sum, obj) => {
        if (obj.buy) {
          sum += obj.price * obj.purchase_count;
        }
        return sum;
      }, 0);
    },
    // 计算属性计算已购买商品的数量
    number_count() {
      return this.cartList.reduce((sum, obj) => {
        if (obj.buy) {
          sum += obj.purchase_count;
        }
        return sum;
      }, 0);
    },
  },

  watch: {
    'selectedFilters': {
      handler(newFilters) {
        console.log('Filters updated:', newFilters);
        // Apply filtering logic here
      },
      deep: true
    }
  },

  methods: {
    async getData() {
      this.stateCartList = this.$store.state.cart.cartList
      if (!this.stateCartList[this.vendorId] || !this.filterStatus) {
        const { product } = await userGetProduct(this.vendorId)
        this.cartList = product.map(e => ({
          ...e,
          ...(e.purchase_count ? { purchase_count: e.purchase_count } : { purchase_count: 1 }),
          buy: false
        }))
      } else {
        const { products } = this.stateCartList[this.vendorId]
        this.cartList = products
      }
      console.log(this.cartList)

    },
    handler(row) {
      row.buy = !row.buy

      // console.log(this.price_count)
    },
    backVenderList() {
      console.log("back")
      this.$store.commit('cart/setCart', { vendorId: this.vendorId, products: this.cartList })
      this.$emit('backVenderList',)
    },
    async applyFilter() {
      this.filterStatus = true
      this.selectedFilters.vendor_id = this.vendorId;
      const { product } = await userFilter(this.selectedFilters);
      if (product && Array.isArray(product) && product.length > 0) {
        this.cartList = product.map(e => ({
          ...e,
          purchase_count: e.purchase_count ? e.purchase_count : 1,
          buy: false
        }));
        console.log(this.cartList)
      } else {
        this.cartList = [];
      }
    },
    async resetFilter(){
      this.filterStatus = false
      this.getData()
    }

  },
  mounted() {
    this.userInfo = this.$store.getters.userInfo
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