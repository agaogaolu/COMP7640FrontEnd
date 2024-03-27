<template>
    <div>
        <div class="header">
            Welcome!
        </div>
        <div class="body">
            <el-table v-if="showVendorPage === 1" :data="vendorData" style="width: 100%" class="table" align="center" border>
                <el-table-column label="Shop Name" width="200" align="center">
                    <template slot-scope="scope">
                    
                        <div @click="showshowVendorPage(scope.row)" style="cursor: pointer;">
                            {{ scope.row.vendor_name }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="score" width="200" align="center">
                    <template slot-scope="scope">
                        <div class="block">
                            <el-rate :value="Number(scope.row.score)" disabled></el-rate>
                        </div>
                    </template>

                </el-table-column>
                <el-table-column prop="buy" label="operation" width="208" align="center">
                    <template v-slot="{ row }">
                        <el-button v-if="!row.buy" icon="el-icon-plus" size="small" type="success"
                            @click="handler(row)">Welcome to Buy
                        </el-button>
                        <el-button v-else size="small" type="danger" @click="handler(row)">Cancell
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>

            <UserCart v-if="showVendorPage === 2" :vendorId="vendorId" @backVenderList="backVenderList"></UserCart>
            
            <UserPay v-if="showVendorPage === 3" :vendorId="vendorId" @backVenderList="backVenderList"></UserPay>



            <el-dialog title="Order table" :visible.sync="dialog" class="dialog" width="40%">
                <div>
                    <el-form ref="form" :model="form" label-width="100px">
                        <el-form-item label="Vendor">
                            <span>{{ form.shop_name }}</span>
                            <!-- <el-input v-model="form.shop_name"></el-input> -->
                        </el-form-item>

                        <el-form-item label="Product unit price:">
                            <span>{{ form.order_money }}</span>
                            <!-- <el-input v-model="form.order_money"></el-input> -->
                        </el-form-item>


                        <el-form-item label="Customer Name:">
                            <el-input v-model="form.cons_name"></el-input>
                        </el-form-item>

                        <el-form-item label="Address:">
                            <el-input v-model="form.cons_addre"></el-input>
                        </el-form-item>

                    </el-form>
                    <div style="text-align: center;">
                        <el-button type="primary" @click="add">
                            Submitted
                        </el-button>
                    </div>
                </div>
            </el-dialog>
        </div>
        <div v-if="showVendorPage === 1" class="footer">
            <div>Total：（{{ price_count.totalNum }}）item {{ price_count.totalPrice }}dollar</div>
            <el-button type="warning" @click="checkOut">Pay All</el-button>
        </div>

    </div>
</template>

<script>
import { userAddData, userGetVendor } from '@/api/user'
import UserCart from '@/components/UserOrder/UserCart.vue'
import UserPay from '@/components/UserOrder/UserPay.vue'
export default {
    components: { UserCart,UserPay },
    created() {
        this.getdata();

    },
    data() {
        return {
            stateCartList: [],
            vendorData: [],
            vendorId: null,
            dialog: false,
            showVendorPage: 1,
            form: {
                shop_name: '',
                order_money: '',
                order_way: '',
                // cons_phone: '',
                cons_name: '',
                cons_addre: '',
            },
    
        }
    },
    methods: {
        async getdata() {
            const { vendor } = await userGetVendor()
            this.vendorData = vendor

            console.log(this.vendorData)
        },
        showdia(row) {
            this.form.shop_name = row.shop_name;
            this.form.order_money = row.price;
            this.dialog = true;
        },
        async add() {
            console.log(this.form)
            const res = await userAddData(this.form)
            if (res.status == 200) {
                this.$message({
                    message: "Successful!",
                    type: "success"
                })
            } else {
                this.dialog = false;
                this.getdata();
            }
            console.log(res)
        },
        handler(obj) {
            obj.buy = !obj.buy
            // console.log(obj)
            // data.buy= !data.buy
        },
        checkOut() {
            
            this.showVendorPage = 3
        },

        showshowVendorPage(row) {
            this.showVendorPage = 2
            this.vendorId = row.vendor_id
            console.log(this.vendorId)
        },
        backVenderList() {
            this.showVendorPage = 1
            this.stateCartList = this.$store.state.cart.cartList
        },

    },
    computed: {
        price_count() {
            let totalPrice = 0
            let totalNum = 0
            Object.keys(this.stateCartList).forEach(vendorId => {
                const vendor = this.stateCartList[vendorId];
                vendor.products.forEach(product => {
                    if (product.buy) {
                        totalPrice += product.price*product.purchase_count;
                        totalNum += product.purchase_count
                    }
                });
            });
            return { totalPrice, totalNum }
        },
    },
    watch: {
        tableData: {
            deep: true,
            handler() {
                // console.log(newVal)
            }

        }
    },
}
</script>

<style scoped>
.header {
    width: 100%;
    height: 10%;
    text-align: center;
    line-height: 64px;
    font-size: 20px;
    font-weight: 800;
    border-bottom: 1px solid #e3e3e3;
}

.body {
    width: 80%;
    margin: auto;
    margin-top: 30px;
}

.table {
    margin: 0 auto;
    
}

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