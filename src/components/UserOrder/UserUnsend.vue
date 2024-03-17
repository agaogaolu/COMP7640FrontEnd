<template>
    <div>
        <div class="header">
            未发货订单
        </div>
        <div class="body">
            <el-table :data="tabledata" style="width: 100%" class="table" border>
                <el-table-column prop="shop_name" label="店铺" width="200" align="center">
                </el-table-column>
                <el-table-column prop="price" label="订单价格" width="100" align="center">
                </el-table-column>
                <el-table-column prop="create_time" label="下单时间" width="200" align="center">
                </el-table-column>
                <el-table-column prop="orderway" label="订餐方式" width="100" align="center">
                </el-table-column>
                <el-table-column prop="cons_name" label="订餐人姓名" width="100" align="center">
                </el-table-column>
                <el-table-column prop="cons_addre" label="取餐地址" width="200" align="center">
                </el-table-column>
                <el-table-column prop="operate" label="操作" width="208" align="center">
                    <template slot-scope="scope">
                        <el-button size="small" type="success" @click="showdia_ch(scope.row)">修改订单
                        </el-button>

                        <el-button size="small" type="danger" @click="showdia_dl(scope.row)">取消订单
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-dialog title="修改订单" :visible.sync="dialog_chnage" width="30%">
                <el-form ref="form" :model="form_change" label-width="100px">
                    <el-form-item label="订餐人姓名：">
                        <el-input v-model="form_change.cons_name"></el-input>
                    </el-form-item>
                    <el-form-item label="取餐地址：">
                        <el-input v-model="form_change.cons_addre"></el-input>
                    </el-form-item>
                </el-form>
                <div style="text-align: center;">
                    <el-button type="primary" @click="change">
                        确认修改
                    </el-button>
                </div>
            </el-dialog>

            <el-dialog title="取消订单" :visible.sync="dialog_delete" width="30%">
                <div>
                    确定取消此订单吗？
                </div>
                <div style="text-align: center;">
                    <el-button type="primary" @click="order_delete">
                        确定
                    </el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import { userUnsendChange, userUnsendDel, userUnsendgGet } from '@/api/user';

export default {
    created() {
        this.getdata()
    },
    data() {
        return {
            tabledata: [],
            dialog_chnage: false,
            dialog_delete: false,
            form_change: {
                order_id: '',
                cons_addre: '',
                cons_name: '',
            },
            delete_id: '',
        }
    },
    methods: {
        async getdata() {

            const { tabledata } = await userUnsendgGet()
            this.tabledata = tabledata
        },
        showdia_ch(row) {
            this.form_change.order_id = row.order_id;
            this.form_change.cons_name = row.cons_name;
            this.form_change.cons_addre = row.cons_addre;
            this.dialog_chnage = true;
        },
        async change() {
            console.log(this.form_change)
            const res = await userUnsendChange(this.form_change)
            console.log(res)
            if (res.status == 200) {
                this.$message({
                    message: res.message,
                    type: "success"
                })
            } else {
                this.getdata();
                this.dialog = false;
            }
        },
        showdia_dl(row) {
            this.delete_id = row.order_id;
            this.dialog_delete = true;
        },
        async order_delete() {
            const res = await userUnsendDel(this.delete_id)
            console.log(res)
            if (res.status == 200) {
                this.$message({
                    message: res.msg,
                    type: "success"
                })
                this.getdata()
                this.dialog_delete = false;
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
    width: 85%;
    margin: auto;
    margin-top: 30px;
}

.table {
    /* margin-left: 50px; */
}
</style>