<template>
    <div class="tmpl">
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="javascript:;">支付中心</a>
            </div>
        </div>

        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <div class="nav-tit pay">
                        <a href="javascript:;" class="selected">支付中心</a>
                    </div>
                    <div class="form-box payment">
                        <div class="el-row">
                            <div class="el-col el-col-16">
                                <div class="el-row">
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>订 单 号：</dt>
                                            <dd>{{orderinfo.order_no}}</dd>
                                        </dl>
                                    </div>
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>收货人姓名：</dt>
                                            <dd>{{orderinfo.accept_name}}</dd>
                                        </dl>
                                    </div>
                                </div>
                                <div class="el-row">
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>送货地址：</dt>
                                            <dd>{{orderinfo.area}}
                                            </dd>
                                        </dl>
                                    </div>
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>手机号码：</dt>
                                            <dd>{{orderinfo.mobile}}</dd>
                                        </dl>
                                    </div>
                                </div>
                                <div class="el-row">
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>支付金额：</dt>
                                            <dd>{{orderinfo.order_amount}} 元</dd>
                                        </dl>
                                    </div>
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>支付方式：</dt>
                                            <dd>在线支付</dd>
                                        </dl>
                                    </div>
                                </div>
                                <div class="message">
                                    <span>备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注：</span>
                                    <span>{{orderinfo.message}}</span>
                                </div>
                            </div>
                            <div class="el-col el-col-8">
                                <div id="container">
                                    <!-- 文字logo -->
                                    <canvas width="400" height="400"></canvas>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
    </div>
</template>

<script>
    //导入二维码插件
    import erweima from '../../../statics/jqplugins/erweima/erweima.js'
    export default {
        data() {
            return {
                intervalObj: null,//定义一个定时器对象
                orderid: this.$route.params.orderid,
                orderinfo: {}
            }
        },
        mounted() {
            //二维码生成方法
            $("#container").erweima({
                label: '扫码支付',
                text: 'http://103.44.145.245:30727/index.html#/payamount/' + this.orderid //改成支付的页面
            });
            // // 进入页面的时候开启定期去服务器查找当前订单的状态，如果为2则跳转到支付成功页面
            this.intervalObj = setInterval(() => {
                //手机端支付成功，跳转成功页面，同时 status为2 与此同时，pc端页面也要同步跳转
                // ajax请求 /site/validate/order/getorderdetial/:orderid获取到里面的status如果为2则表示已经支付完成
                // 就应该跳转到支付成功页面
                this.$ajax.get('/site/validate/order/getorderdetial/' + this.orderid).
                    then(res => {
                        console.log(1111);
                        if (res.data.message.orderinfo.status == 2) {
                            //关闭定时器
                            if (this.intervalObj) {
                                //判断不为空--执行清除定时器
                                clearInterval(this.intervalObj);
                            }
                            // 利用编程式导航跳转到支付成功页面, 路由规则的名称： paysuccess
                            this.$router.push({ name: 'pcpaysuccess' });
                        }
                    })
            }, 3000)
            this.getorderinfo();
        },
        // 表示当准备销毁组件的时候被触发执行(离开这个组件页面就会执行)
        beforeDestroy() {
            clearInterval(this.intervalObj);
        },
        methods: {
            getorderinfo() {
                var url = '/site/validate/order/getorder/' + this.orderid;
                this.$ajax.get(url).then(res => {
                    this.orderinfo = res.data.message[0];

                })
            }
        }
    }
</script>
<style scoped>
</style>