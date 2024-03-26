<template>
    <div>
        <div class="header">
            未发货订单
        </div>
        <div class="body">
            <el-table :data="tableData" style="width: 100%" class="table" border align="center">
                <el-table-column prop="orderid" label="Order" width="80" align="center">
                </el-table-column>
                <el-table-column prop="product_name" label="Product Name" width="100" align="center">
                </el-table-column>
                <el-table-column prop="price_pd" label="Price" width="80" align="center">
                </el-table-column>
                <el-table-column prop="date" label="Date" width="200" align="center">
                </el-table-column>
                <el-table-column prop="customer_id" label="Customer ID" width="100" align="center">
                </el-table-column>
                <el-table-column prop="status" label="Status" width="200" align="center">
                </el-table-column>
                <el-table-column prop="operate" label="Edit Status" width="127" align="center">
                    <template slot-scope="scope">
                        <el-button size="small" type="success" @click="show_dialog(scope.row)">Edit Status
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>

            <el-dialog title="Edit Order Status" :visible.sync="dialog" width="30%">
                <el-form ref="form" :model="form" label-width="120px">

                    <el-form-item label="Choose Status:" prop="">
                        <el-select v-model="form.dispatcher_status" placeholder="Plz choose status">

                            <el-option v-for="( item, index)  in disp_range" :key="index" :label="item.label"
                                :value="item.label"></el-option>
                        </el-select>

                    </el-form-item>
                    <!-- <el-form-item label="预计送货时间：">
                        <el-input v-model="form.deliver_time"></el-input>
                    </el-form-item> -->
                </el-form>
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
import { vendorOrder, vendorOrderUpdate } from '@/api/manage.js'
export default {
    created() {
        this.userInfo = this.$store.getters.userInfo
        console.log(this.userInfo)
        this.getdata()
    },
    data() {
        return {
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
            const { total_order } = await vendorOrder(this.userInfo.vendorId)
            this.tableData = total_order
            console.log(this.tableData)
        },
        show_dialog(row) {
            console.log(row)
            this.form.order_id = row.orderid;
            this.dialog = true;
        },
        async update() {
            const res = await vendorOrderUpdate(this.form)
            if (res.status === 200) {
                this.dialog = false;
                this.$message({
                    message: res.msg,
                    type: "success"
                })
                this.getdata()
            }

        }
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