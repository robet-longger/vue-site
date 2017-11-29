<template>
    <div class="tmpl">
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/cart.html">购物车</a>
            </div>
        </div>

        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <!--购物车头部-->
                    <div class="cart-head clearfix">
                        <h2>
                            <i class="iconfont icon-cart"></i>我的购物车</h2>
                        <div class="cart-setp">
                            <ul>
                                <li class="first active">
                                    <div class="progress">
                                        <span>1</span>
                                        放进购物车
                                    </div>
                                </li>
                                <li>
                                    <div class="progress">
                                        <span>2</span>
                                        填写订单信息
                                    </div>
                                </li>
                                <li class="last">
                                    <div class="progress">
                                        <span>3</span>
                                        支付/确认订单
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!--购物车头部-->
                    <!--商品列表-->
                    <!-- {{values}} -->
                    <div class="cart-box">
                        <input id="jsondata" name="jsondata" type="hidden">
                        <table width="100%" align="center" class="cart-table" border="0" cellspacing="0" cellpadding="8">
                            <tbody>
                                <tr>
                                    <th width="48" align="center">
                                        <el-button size="small" type="success" @click="selectAll">{{contentTxt}}</el-button>
                                    </th>
                                    <th align="left" colspan="2">商品信息</th>
                                    <th width="84" align="left">单价</th>
                                    <th width="104" align="center">数量</th>
                                    <th width="104" align="left">金额(元)</th>
                                    <th width="54" align="center">操作</th>
                                </tr>
                                <tr v-show="goodslist.length<0">
                                    <td colspan="10">
                                        <div class="msg-tips">
                                            <div class="icon warning">
                                                <i class="iconfont icon-tip"></i>
                                            </div>
                                            <div class="info">
                                                <strong>购物车没有商品！</strong>
                                                <p>您的购物车为空，
                                                    <a href="/index.html">马上去购物</a>吧！</p>
                                            </div>
                                        </div>
                                    </td>
                                </tr>

                                <tr v-for="(item,index) in goodslist" :key="item.id">
                                    <th width="48" align="center">
                                        <el-switch v-model="values[index]" on-text="已选" off-text="未选" on-color="#13ce66" off-color="#ff4949">
                                        </el-switch>
                                    </th>
                                    <th align="left" colspan="2">
                                        <img width="50" height="50" :src="item.img_url" :alt="item.title"> {{item.title}}
                                    </th>
                                    <th width="84" align="left">{{item.sell_price}}</th>
                                    <!-- <th width="104" align="center">{{item.buycount}}</th> -->
                                    <!-- 自定义子组件-计数器 inputnumber-->
                                    <!-- :obj="{gid:item.id,count:item.buycount}父传子 -->
                                    <!--  @msg="getinputnumber" 子传父 -->
                                    <inputnumber :obj="{gid:item.id,count:item.buycount}" @msg="getinputnumber"></inputnumber>
                                    <th width="104" align="left">
                                        {{item.buycount*item.sell_price}}
                                    </th>
                                    <th width="54" align="center">删除</th>
                                </tr>

                                <tr>
                                    <th align="right" colspan="8">
                                        已选择商品
                                        <b class="red" id="totalQuantity">{{selectCount}}</b> 件 &nbsp;&nbsp;&nbsp; 商品总金额（不含运费）：
                                        <span class="red">￥</span>
                                        <b class="red" id="totalAmount">{{getTotalMoney}}</b>元
                                    </th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <!--/商品列表-->
                    <!--购物车底部-->
                    <div class="cart-foot clearfix">
                        <div class="right-box">
                            <button class="button" onclick="javascript:location.href='/index.html';">继续购物</button>
                            <button class="submit" @click="shopping">立即结算</button>
                        </div>
                    </div>
                    <!--购物车底部-->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    // 导入localStorage文件
    import { getItem } from "../kits/localStorageHelp.js";
    // 导入自己编写好的inputnumber.vue组件
    import inputnumber from '../subcom/inputnumber.vue'

    export default {
        // 注册子组件
        components: {
            inputnumber
        },
        data() {
            return {
               
                selectCount: 0,//总件数
                contentTxt: "全选",
                values: [],// 控制每行数据的选择状态的true显示,false隐藏--》关联到了isselected
                goodslist: [],
                isselected: false,//
            }
        },
        mounted() {
            this.getshopcargoods();
        },
        computed: {
            getTotalMoney() {
                //计算当前选中的商品数
                //注意：计算属性依赖this.values数组中的值（true , false）发生改变时候自动重新执行
                // var tureArr = this.values.filter(function(item){
                //     return item;
                // });
                // var trueArr =  this.values.filter(item=>item);
                // console.log(trueArr);
                // this.selectCount = trueArr.length;

                // 2.0 统计选中商品的总金额
                this.selectCount = 0;
                var totalMoney = 0;
                // 计算选中的某个商品的总价格： 商品单价 * 购买数量
                // 计算所有选中的商品总价格 = this.values中的所有的true的索引位置在this.goodslist这个数组中的对象
                // 重新遍历this.values这个是数组，找到所有true的索引
                this.values.forEach((status, index) => {
                    //判断是true才统计
                    // console.log(status, index)

                    if (status) {
                        totalMoney += (this.goodslist[index].buycount * this.goodslist[index].sell_price);
                        this.selectCount += (this.goodslist[index].buycount);
                    }

                });

                return totalMoney;
            }
        },
        methods: {
            //跳转定单页面
            shopping(){
                //获取当前goodscar.vue中的选择的商品id
                var goodsids = [];
                //获取this.values中true所在的索引
                this.values.forEach((item,index)=>{
                    // console.log(item,index);
                    if (item==true) {
                        goodsids.push(this.goodslist[index].id);
                    }
                });
                // console.log(goodsids);
                //判断用户是否至少选择一个商品
                if (goodsids.length<=0) {
                    this.$message.error('请至少选择一个需要购买的商品');
                    return;
                }
                //跳转到shopping.vue组件同时将商品id传入
                var ids = goodsids.join(",");
                // console.log(ids);//94,98
                this.$router.push({name:'shopping',params:{ids:ids}});

            },
            //获取子组件inputnumber传过来的值
            getinputnumber(obj) {
                var index = this.goodslist.findIndex(function (item) { return item.id == obj.gid });//根据对应的条件找到索引匹配
                //    子组件inputnumber传过来的值的数量赋值给 this.goodslist[index].buycount
                this.goodslist[index].buycount = obj.count;
            },

            // 实现全选
            selectAll() {
                this.isselected = !this.isselected;
                if (this.isselected) {
                    this.contentTxt = "反选"
                    
                } else {
                    this.contentTxt = "全选"
                }
                for (let i = 0; i < this.values.length; i++) {
                    this.values[i] = this.isselected;
                }
                this.values.push(false);
                this.values.pop();
            },
            getshopcargoods() {// 从localStorage获取数据
                var goodsobj = getItem();
                //遍历对象 得到id
                var idArr = [];
                for (const key in goodsobj) {
                    idArr.push(key)
                }
                // console.log(idArr);["90", "92", "93", "94", "98"]
                var ids = idArr.join(",");//逗号分割
                // console.log(ids);90,92,93,94,98
                var url = '/site/comment/getshopcargoods/' + ids;
                this.$ajax.get(url).then(res => {
                    res.data.message.forEach((item, index) => {
                        item.buycount = goodsobj[item.id]
                        //初始化values
                        this.values[index] = false;
                    });
                    this.goodslist = res.data.message;
                })

            }
        }
    }
</script>
<style scoped>
</style>