<template>
    <div>
        <div class="header">
            已发货订单
        </div>
        <div class="body">
            <el-table :data="tableData" style="width: 100%" class="table" border>
                <el-table-column prop="shop_name" label="店铺" width="100" align="center">
                </el-table-column>
                <el-table-column prop="order_money" label="订单价格" width="80" align="center">
                </el-table-column>
                <el-table-column prop="order_way" label="订餐方式" width="100" align="center">
                </el-table-column>
                <el-table-column prop="cons_name" label="订餐人姓名" width="100" align="center">
                </el-table-column>
                <el-table-column prop="cons_addre" label="取餐地址" width="150" align="center">
                </el-table-column>
                <el-table-column prop="disp_id" label="送餐员编号" width="120" align="center">
                </el-table-column>
                <el-table-column prop="disp_phone" label="送餐员电话" width="120" align="center">
                </el-table-column>
                <el-table-column prop="deliver_time" label="预计送餐时间" width="116" align="center">
                </el-table-column>
            </el-table>


        </div>
    </div>
</template>

<script>
import { userSendingGet } from '@/api/user'

export default {
    created() {
        this.getdata()
    },
    data() {
        return {
            tableData: [],
        }
    },
    methods: {
        async getdata() {
            const { tabledata } = await userSendingGet()
            this.tableData = tabledata

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

    width: 68%;
    margin: auto;
    margin-top: 30px;
}
</style>