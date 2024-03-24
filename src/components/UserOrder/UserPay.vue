<template>
    <div>
        <el-table :data="cartList" style="width: 100%" class="table" align="center" border>
            <el-table-column prop="product_name" label="Prodct Name" width="200" align="center">
            </el-table-column>
            <el-table-column prop="price" label="Price" width="200" align="center">
            </el-table-column>
            <el-table-column prop="inventory" label="Inventory" width="200" align="center">
            </el-table-column>
            <el-table-column prop="vendorId" label="Shop_Id" width="200" align="center" >
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
            <el-button type="primary" @click="backVenderList()">Pay For All</el-button>
        </div>
    </div>
</template>


<script>
export default {
    data() {
        return {
            stateCartList: [],
            cartList:[]
        }
    },
    methods: {
        backVenderList() {

            this.$emit('backVenderList',)
        }
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
                        vendorId:vendorId
                    })
                        totalPrice += product.price;
                        totalNum += 1
                    }
                });
            });
            console.log(this.cartList)
            return { totalPrice, totalNum }
        },
    },
    mounted(){
        
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
