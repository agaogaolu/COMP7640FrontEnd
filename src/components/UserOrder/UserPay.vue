<template>
    <div>
        <el-table :data="cartList" style="width: 100%" class="table" align="center" border>
            <el-table-column prop="product_name" label="Prodct Name" width="200" align="center">
            </el-table-column>
            <el-table-column prop="price" label="Price" width="200" align="center">
            </el-table-column>
            <el-table-column prop="inventory" label="Inventory" width="100" align="center">
            </el-table-column>
            <el-table-column prop="vendorId" label="Shop_Id" width="100" align="center">
            </el-table-column>
            <el-table-column prop="purchase_count" label="Count" width="100" align="center">
            </el-table-column>
            <el-table-column prop="buy" label="Add Cart?" width="208" align="center">
                <template v-slot="{ row }">
                    <el-button v-if="!row.buy" icon="el-icon-plus" size="small" type="success"
                        @click="handler(row)">加入购物车
                    </el-button>
                    <el-button v-else size="small" type="danger" @click="handler(row)">取消
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <div v-if="true" class="footer">
            <div>总计：（{{ price_count.totalNum }}）件商品 共{{ price_count.totalPrice }}元</div>
            <el-button type="warning" @click="backVenderList()">Back Vender List</el-button>
            <el-button type="primary" @click="payForAll()">Pay For All</el-button>
        </div>
    </div>
</template>


<script>
import { userAddOrder } from '@/api/user'
import { bus } from '@/utils/bus.js'
export default {

    data() {
        return {
            stateCartList: [],
            cartList: [],
            userInfo: '',

        }
    },
    methods: {
        backVenderList() {
            this.$emit('backVenderList',)
        },
        async payForAll() {
            const orderlist = this.cartList.map(e => {
                return {
                    "product_id": e.product_id,
                    "vendor_id": Number(e.vendorId),
                    "purchase_count": e.purchase_count
                }
            })
            let data = {
                'customer_id': this.userInfo.customerId,
                'orderlist': orderlist
            }
            console.log(data)
            const res = await userAddOrder(data)
            if (res.status === 200) {
                this.dialog = false;
                bus.$emit('orderSubmit','')
                this.backVenderList()
                this.$message({
                    message: res.msg,
                    type: "success"
                })
            }
        },
        handler(    ) {
            // row.buy = !row.buy
            // this.stateCartList = this.cartList
            // console.log(this.price_count)
        },
    },
    created() {

        this.stateCartList = this.$store.state.cart.cartList

    },
    computed: {
        price_count() {
            let totalPrice = 0
            let totalNum = 0
            Object.keys(this.stateCartList).forEach(vendorId => {
                const vendor = this.stateCartList[vendorId];
                vendor.products.forEach(product => {
                    if (product.buy) {
                        this.cartList.push({
                            ...product,
                            vendorId: vendorId
                        })
                        totalPrice += product.price * product.purchase_count;
                        totalNum += product.purchase_count
                    }
                });
            });
            console.log(this.cartList)
            return { totalPrice, totalNum }
        },

    },
    mounted() {
        this.userInfo = this.$store.getters.userInfo
        console.log(this.userInfo)
    },
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
