<template>
    <div class="tmpl">
        <div class="btn">
            <!-- {{orderid}} -->
            <span v-text="msg"></span>
            <input type="text" v-model="amount">
            <br>
            <el-button type="success" size="small" @click="pay">支付</el-button>
        </div>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                msg:'你需要交易的金额为:',
                amount: 0,
                orderid: this.$route.params.orderid
            }
        },
        mounted(){
            this.getorderInfo();
        },
        methods: {
            //根据订单id获取订单金额
            getorderInfo(){
                var url = '/site/validate/order/getorderdetial/' + this.orderid;
                this.$ajax.get(url).then(res=>{
                    this.amount = res.data.message.orderinfo.order_amount;
                })
            },
            pay(){
                this.$ajax.get('/site/validate/order/pay/' + this.orderid).then(res=>{
                    // console.log(res.data);
                    if (res.data.status ==1) {
                       this.$message.error("res.data.message");
                    }else{
                        //跳转到成功页面提示用户
                        this.$router.push({name:'paysuccess'})
                    }
                })
            }
        }
    }
</script>
<style scoped>
    .btn {
        width: 200px;
        margin: 100px auto;

    }
</style>