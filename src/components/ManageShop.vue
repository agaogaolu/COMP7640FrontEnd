<template>
    <div>
        <div class="header">
            Vendor Management
        </div>
        <div class="body">
            <el-table :data="tableData" style="width: 100%" class="table"  align="center">
                <el-table-column prop="product_name" label="Name" width="200" align="center">
                </el-table-column>
                <el-table-column prop="product_id" label="ProductID" width="200" align="center">
                </el-table-column>
                <el-table-column prop="price" label="Price" width="200" align="center">
                </el-table-column>
                <el-table-column prop="inventory" label="Inventory" width="200" align="center">
                </el-table-column>
                <el-table-column prop="operate" label="操作" width="200" align="center">
                    <template slot-scope="scope">
                        <el-button size="small" type="warning" @click="showdia_chg(scope.row)">Edit
                        </el-button>

                        <el-button size="small" type="danger" @click="showdia_dlt(scope.row)">Delete
                        </el-button>
                    </template>
                </el-table-column>
                <el-table-column width="120" align="center">
                    <template slot="header">
                        <el-button icon="el-icon-plus" size="small" type="success" @click="showdia_add()">Add Product
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>

            <el-dialog title="Add product" :visible.sync="dia_add" width="30%">
                <el-form ref="add_form" :model="add_form" label-width="100px" :rules="add_form_rules">
                    <el-form-item label="Name: " prop="product_name">
                        <el-input v-model="add_form.product_name"></el-input>
                    </el-form-item>
                    <el-form-item label="Price: " prop="price_pd">
                        <el-input v-model="add_form.price_pd"></el-input>
                    </el-form-item>
                    <el-form-item label="Inventory: " prop="inventory">
                        <el-input v-model="add_form.inventory"></el-input>
                    </el-form-item>
                </el-form>
                <div style="text-align: center;">
                    <el-button type="primary" @click="addProduct()">
                        Confirm Add
                    </el-button>
                </div>
            </el-dialog>

            <el-dialog title="Edit Product" :visible.sync="dia_chg" width="30%">
                <el-form ref="form" :model="chg_form" label-width="100px">
                    <el-form-item label="Name: ">
                        <el-input v-model="chg_form.new_product_name"></el-input>
                    </el-form-item>
                    <el-form-item label="Price: ">
                        <el-input v-model="chg_form.new_price_pd"></el-input>
                    </el-form-item>
                    <el-form-item label="Inventory">
                        <el-input v-model="chg_form.new_inventory"></el-input>
                    </el-form-item>
                </el-form>
                <div style="text-align: center;">
                    <el-button type="primary" @click="changeshop()">
                       Confitm Edit
                    </el-button>
                </div>
            </el-dialog>
            <el-dialog title="Delete Product" :visible.sync="dia_dlt" width="30%">
                <div>
                    Confirm Delete?
                </div>
                <div style="text-align: center;">
                    <el-button type="primary" @click="deleteshop()">
                        Yes
                    </el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import { vendorGetProduct,vendorAddProduct,vendorModifyProduct,vendorDelProduct } from '@/api/manage'

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
            dia_add: false,
            dia_chg: false,
            dia_dlt: false,
            add_form: {
                product_name: '',
                vendor_id: '',
                price_pd: '',
                inventory: ''
            },
            chg_form: {
                new_product_name: '',
                new_price_pd: '',
                new_inventory: '',
                product_id: '',
            },
            want_delete: '',
            add_form_rules: {
                product_name: [{ required: true, message: 'Required', trigger: 'blur' }],
                price_pd: [{ required: true, message: 'Required', trigger: 'blur' }],
                inventory: [{ required: true, message: 'Required', trigger: 'blur' }]

            }
        }
    },
    methods: {
        async getdata() {
            const { product } = await vendorGetProduct(this.userInfo.vendorId)
            // console.log(res)
            this.tableData = product

            console.log(this.tableData)
        },
        showdia_add() {
            this.dia_add = true;
        },
        async addProduct() {
            this.add_form.vendor_id = this.userInfo.vendorId
            const res = await vendorAddProduct(this.add_form)
            console.log(res)
            if(res.status === 200){
                this.dia_add = false;
                this.$message({
                    message:res.msg,
                    type:"success"
                })
                this.getdata()
            }
        },
        showdia_chg(row) {
            console.log(row)
            this.chg_form.new_product_name = row.product_name;
            this.chg_form.new_price_pd = row.price;
            this.chg_form.new_inventory = row.inventory;
            this.chg_form.product_id = row.product_id;
            this.dia_chg = true;
        },
        async changeshop() {
            const res = await vendorModifyProduct(this.chg_form)
            if(res.status === 200){
                this.dia_chg = false;
                this.$message({
                    message:res.msg,
                    type:"success"
                })
                this.getdata()
            }
        },
        showdia_dlt(row) {
            this.want_delete = row.product_id;
            this.dia_dlt = true;
        },
        async deleteshop() {
            const res = await vendorDelProduct(this.want_delete)
            if(res.status === 200){
                this.dia_dlt = false;
                this.$message({
                    message:res.msg,
                    type:"success"
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

    width: 80%;
    margin: auto;
    margin-top: 30px;
}
</style>