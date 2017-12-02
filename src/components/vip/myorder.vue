<template>
    <div class="tmpl">
        <div class="center">
            <div class="el-row">
                <div class="el-col el-col-24">
                    <div class="comp">
                        <div class="tmpl routeanimate">
                            <div class="section">
                                <div class="location">
                                    <span>当前位置：</span>
                                    <a href="/index.html">首页</a> &gt;
                                    <a href="#/site/member/center" class="">会员中心</a>&gt;
                                    <a href="#/site/member/orderlist" class="router-link-exact-active ">我的订单</a>
                                </div>
                            </div>
                            <div class="section clearfix">
                                <div class="left-260">
                                    <div class="bg-wrap">
                                        <div class="avatar-box">
                                            <a href="/user/center/avatar.html" class="img-box">
                                                <i class="iconfont icon-user-full"></i>
                                            </a>
                                            <h3>
                                                ivanyb
                                            </h3>
                                            <p>
                                                <b>注册会员</b>
                                            </p>
                                        </div>
                                        <div class="center-nav">
                                            <ul>
                                                <li>
                                                    <h2>
                                                        <i class="iconfont icon-order"></i>
                                                        <span>订单管理</span>
                                                    </h2>
                                                    <div class="list">
                                                        <p>
                                                            <a href="#/site/member/orderlist" class="router-link-exact-active ">
                                                                <i class="iconfont icon-arrow-right"></i>交易订单</a>
                                                        </p>
                                                    </div>
                                                </li>
                                                <li>
                                                    <h2>
                                                        <i class="iconfont icon-user"></i>
                                                        <span>账户管理</span>
                                                    </h2>
                                                    <div class="list">
                                                        <p>
                                                            <a href="#/site/member/center" class="">
                                                                <i class="iconfont icon-arrow-right"></i>账户资料</a>
                                                        </p>
                                                        <p>
                                                            <a href="#/site/member/center" class="">
                                                                <i clrouter-linkss="iconfont icon-router-linkrrow-right"></i>头像设置</a>
                                                        </p>
                                                        <p>
                                                            <a href="#/site/member/center" class="">
                                                                <i class="iconfont icon-arrow-right"></i>修改密码</a>
                                                        </p>
                                                        <p>
                                                            <a href="javascript:void(0)">
                                                                <i class="iconfont icon-arrow-right"></i>退出登录</a>
                                                        </p>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div class="right-auto">
                                    <div class="bg-wrap" style="min-height: 765px;">
                                        <div class="sub-tit">
                                            <ul>
                                                <li class="selected">
                                                    <a href="/user/order-list.html">交易订单</a>
                                                </li>
                                            </ul>
                                        </div>
                                        <div class="table-wrap">
                                            <table width="100%" border="0" cellspacing="0" cellpadding="0" class="ftable">
                                                <tbody>
                                                    <tr>
                                                        <th width="16%" align="left">订单号</th>
                                                        <th width="10%">姓名</th>
                                                        <th width="12%">订单金额</th>
                                                        <th width="11%">下单时间</th>
                                                        <th width="10%">状态</th>
                                                        <th width="12%">操作</th>
                                                    </tr>
                                                    <tr v-for="item in order" :key="item.id">
                                                        <td>{{item.order_no}}</td>
                                                        <td align="left">{{item.accept_name}}</td>
                                                        <td align="left">
                                                            <strong style="color: red;">￥{{item.order_amount}}</strong>
                                                            <br> 在线支付
                                                        </td>
                                                        <td align="left">{{item.add_time | datefmt('YYYY-MM-DD HH:mm:ss')}}</td>
                                                        <td align="left">
                                                            {{item.statusName}}
                                                        </td>
                                                        <td align="left">
                                                            <router-link v-bind="{to:'/site/orderinfo' +item.id}">查看订单</router-link>
                                                            <br>
                                                            <router-link v-bind="{to:'/site/pay/'+ item.id}">|去付款</router-link>
                                                            <br>
                                                            <a v-show="item.status==1" href="javascript:void(0)" @click="cancelConfirm(item.id)">|取消</a>
                                                            <br>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <!-- 分页 -->
                                            <div class="page-foot">
                                                <el-pagination @size-change="sizeChange" @current-change="currentChange" :current-page="pageIndex" :page-sizes="[1,5,10]"
                                                    :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalcount">
                                                </el-pagination>
                                            </div>
                                        </div>
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
    export default {
        data() {
            return {
                totalcount: 0,
                pageIndex: 1,
                pageSize: 1,
                order: []
            }
        },
        mounted() {
            this.getorderInfo();
        },
        methods: {
            //取消订单
            cancelConfirm(orderid) {
                this.$confirm('你是否取消订单?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.cancelOrder(orderid);
                }).catch(() => {

                });


            },
            //封装取消订单的方法
            cancelOrder(orderid) {
                var url = '/site/validate/order/cancelorder/' + orderid;
                this.$ajax.get(url).then(res => {
                    if (res.data.status == 0) {
                        this.getorderInfo();
                    } else {
                        this.$message.error(res.data.message)
                    }
                })
            },

            // 定义分页的方法
            sizeChange(size) {
                //改变页容量的方法
                this.pageSize = size;
                this.getorderInfo();
            },
            currentChange(index) {
                //改变当前页面的方法
                this.pageIndex = index;
                this.getorderInfo();
            },//
            getorderInfo() {
                var url = `/site/validate/order/userorderlist?pageIndex=${this.pageIndex}&pageSize=${this.pageSize}`;
                this.$ajax.get(url).then(res => {
                    this.totalcount = res.data.totalcount;
                    this.order = res.data.message;
                })
            }
        }
    }
</script>
<style scoped>
</style>