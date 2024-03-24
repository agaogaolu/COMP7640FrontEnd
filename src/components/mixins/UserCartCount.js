export default{
    data(){
        return{
            stateCartList:[]
        }
    },
    create(){
        this.stateCartList = this.$store.state.cart.cartList
    },
    computed:{
        price_count() {
            let totalPrice = 0
            let totalNum = 0
            Object.keys(this.stateCartList).forEach(vendorId => {
                const vendor = this.stateCartList[vendorId];
                vendor.products.forEach(product => {
                    if (product.buy) {
                        totalPrice += product.price;
                        totalNum += 1
                    }
                });
            });
            return { totalPrice, totalNum }
        },
    }
}