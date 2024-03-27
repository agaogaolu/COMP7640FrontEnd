<template>
    <div>
        <div class="header">
            Orders
        </div>
        <div class="body">
            <template>
                <el-table :data="tableData" style="width: 100%" row-key="ordernum" align="center">
                    <el-table-column prop="ordernum" label="Order Number" width="180"></el-table-column>
                    <el-table-column prop="date" label="Date" width="180"></el-table-column>
                    <el-table-column prop="vendor_name" label="Vendor" width="180"></el-table-column>
                    <el-table-column prop="status" label="Status" width="180"></el-table-column>
                    <el-table-column prop="operate" label="Edit Status" width="127" align="center">
                        <template slot-scope="scope">
                            <el-button size="small" type="danger" @click="show_dialog(scope.row)">Delete
                            </el-button>
                        </template>
                    </el-table-column>
                    <el-table-column type="expand">
                        <template slot-scope="props">
                            <el-table :data="props.row.products" style="width: 100%">
                                <el-table-column prop="product_name" label="Product Name"></el-table-column>
                                <el-table-column prop="price_pd" label="Price"></el-table-column>
                                <el-table-column prop="purchase_count" label="Quantity"></el-table-column>

                            </el-table>
                        </template>
                    </el-table-column>
                </el-table>
            </template>

            <el-dialog title="Delete Order" :visible.sync="dialog" width="30%">
                <div>Confirm delete this order?</div>
                <div style="text-align: center;">
                    <el-button type="primary" @click="update()">
                        Confirm
                    </el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>




<script>
import { userOrders, userDelOrder } from '@/api/user.js'

import { bus } from '@/utils/bus.js'
export default {
    data() {
        return {
            showOrderDetail: true,
            userInfo: null,
            tableData: [],
            dialog: false,
            form: {
                dispatcher_status: '',
                order_id: '',
                deliver_time: '',
            },
            disp_range: [
                { disp_id: 1, label: "Order confirmed" },
                { disp_id: 2, label: "Shipped Order" },
                { disp_id: 3, label: "Completed" }
            ],
        }
    },
    methods: {
        async getdata() {
            const { total_order } = await userOrders(this.userInfo.customerId)
            // this.tableData = total_order
            let cacheData = []
            total_order.map(e => {
                // console.log(e.ordernum)
                if (!cacheData[e.ordernum]) {
                    cacheData[e.ordernum] = {
                        ...e,
                        products: []
                    }
                }
                cacheData[e.ordernum].products.push(e)
            })
            this.tableData = Object.values(cacheData)

        },
        show_dialog(row) {
            this.form.order_id = row.ordernum;
            console.log(row)
            this.dialog = true;
        },
        async update() {
            console.log(this.form.order_id)
            const res = await userDelOrder(this.form.order_id)
            console.log(res)
            if (res.status === 200) {
                this.dialog = false;
                this.$message({
                    message: res.msg,
                    type: "success"
                })
                this.getdata()
            }
        }
    },
    mounted() {
        this.userInfo = this.$store.getters.userInfo
        this.getdata()
    },
    created() {

        bus.$on('orderSubmit', () => {
            this.getdata()
        })
    },
    destroyed() {
        bus.$off('orderSubmit', {})
    }

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

    width: 91%;
    margin: auto;
    margin-top: 30px;
}
</style>