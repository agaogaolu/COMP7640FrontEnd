<template>
    <div>
        <div class="header">
            &nbsp;&nbsp; Online Shopping system--Backend
        </div>
        <div class="body">
            <div class="liner">
                <el-menu default-active="1" class="el-menu-vertical-demo" background-color="#545c64" text-color="#fff"
                    active-text-color="#ffd04b" @select="handleselect">

                    <el-menu-item index="1">
                        <i class="el-icon-s-shop"></i>
                        <span slot="title">Product Management</span>
                    </el-menu-item>

                    


                    <el-menu-item index="8">
                        <i class="el-icon-s-shop"></i>
                        <span slot="title">Order Management</span>
                    </el-menu-item>

                </el-menu>
            </div>
            <div class="main">
                <div id="manageshop" v-show="active == 1">
                    <manageshop></manageshop>
                </div>


                <div id="manageorder" v-show="active == 8">
                    <manageorder></manageorder>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import manageshop from '@/components/ManageShop.vue'
import manageorder from '@/components/ManageOrder/ManageOrder.vue'
export default {
    components: {
        manageshop: manageshop,
        manageorder:manageorder
    },
    data() {
        return {
            active: 1,
        }
    },
    methods: {
        handleselect(index) {
            this.active = index;
        }
    },
}
</script>

<style scoped>
.header {
    width: 100%;
    height: 10vh;
    /* text-align: center; */
    line-height: 10vh;
    font-size: 25px;
    font-weight: 800;
    background-color: #e3e3e3;
    /* padding-left: 100px; */
}

.body {
    width: 100%;
    height: 648px;
    display: flex;
    justify-content: space-around;
}

.liner {
    width: 15%;
    height: 100vmax;
    background-color: #545c64;
}

.main {
    width: 85%;
}
</style>