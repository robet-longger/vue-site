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
                                <li class="active">
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
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                        <div class="cart-box">
                            <h2 class="slide-tit">
                                <span>1、收货地址</span>
                            </h2>
                            <form id="orderForm" name="orderForm" url="/tools/submit_ajax.ashx?action=order_save&amp;site_id=1">
                                <div class="form-box address-info">
                                    <dl class="form-group">
                                        <el-form-item label="收货人姓名：" prop="accept_name">
                                            <el-row>
                                                <el-col :span="12">
                                                    <el-input v-model="ruleForm.accept_name"></el-input>
                                                </el-col>
                                            </el-row>
                                        </el-form-item>
                                    </dl>
                                    <dl class="form-group">
                                        <!-- 利用vue组件 v-distpicker进行填充 -->
                                        <el-form-item label="所属地区：" prop="address">
                                            <el-row>
                                                <el-col :span="12">
                                                    <v-distpicker @selected="onSelected"></v-distpicker>
                                                </el-col>
                                            </el-row>
                                        </el-form-item>

                                    </dl>
                                    <dl class="form-group">
                                        <el-form-item label="详细地址：" prop="address">
                                            <el-row>
                                                <el-col :span="12">
                                                    <el-input v-model="ruleForm.address"></el-input>
                                                </el-col>
                                            </el-row>
                                        </el-form-item>
                                    </dl>
                                    <dl class="form-group">
                                        <el-form-item label="手机号码：" prop="mobile">
                                            <el-row>
                                                <el-col :span="12">
                                                    <el-input v-model="ruleForm.mobile"></el-input>
                                                </el-col>
                                            </el-row>
                                        </el-form-item>
                                    </dl>
                                    <dl class="form-group">
                                        <el-form-item label="电子邮箱：" prop="email">
                                            <el-row>
                                                <el-col :span="12">
                                                    <el-input v-model="ruleForm.email"></el-input>
                                                </el-col>
                                            </el-row>
                                        </el-form-item>
                                    </dl>
                                    <dl class="form-group">
                                        <el-form-item label="邮政编码：" prop="post_code">
                                            <el-row>
                                                <el-col :span="12">
                                                    <el-input v-model="ruleForm.post_code"></el-input>
                                                </el-col>
                                            </el-row>
                                        </el-form-item>
                                    </dl>
                                </div>
                                <h2 class="slide-tit">
                                    <span>2、支付方式</span>
                                </h2>
                                <ul class="item-box clearfix">
                                    <!--取得一个DataTable-->
                                    <li>
                                        <el-radio class="radio" v-model="ruleForm.payment_id" label="6">在线支付</el-radio>
                                    </li>
                                </ul>
                                <h2 class="slide-tit">
                                    <span>3、配送方式</span>
                                </h2>
                                <ul class="item-box clearfix">
                                    <!--取得一个DataTable-->
                                    <li>
                                        <el-radio-group v-model="ruleForm.express_id" @change="expressChange">
                                            <el-radio :label="1">顺丰(运费20)</el-radio>
                                            <el-radio :label="2">圆通(运费10)</el-radio>
                                            <el-radio :label="3">韵达(运费8)</el-radio>
                                        </el-radio-group>
                                    </li>
                                </ul>
                                <h2 class="slide-tit">
                                    <span>4、商品清单</span>
                                </h2>
                                <div class="line15"></div>
                                <table width="100%" border="0" align="center" cellpadding="8" cellspacing="0" class="cart-table">
                                    <tbody>
                                        <tr>
                                            <th colspan="2" align="left">商品信息</th>
                                            <th width="84" align="left">单价</th>
                                            <th width="84" align="center">购买数量</th>
                                            <th width="104" align="left">金额(元)</th>
                                        </tr>
                                        <tr v-for="item in goodslist" :key="item.id">
                                            <td width="68">
                                                <a target="_blank" href="/goods/show-89.html">
                                                    <img :src="item.img_url" class="img">
                                                </a>
                                            </td>
                                            <td>
                                                <a target="_blank" href="/goods/show-89.html">{{item.title}}</a>
                                            </td>
                                            <td>
                                                <span class="red">
                                                    ￥{{item.sell_price}}
                                                </span>
                                            </td>
                                            <td align="center">{{item.buycount}}</td>
                                            <td>
                                                <span class="red">
                                                    ￥{{item.sell_price * item.buycount}}
                                                </span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div class="line15"></div>
                                <h2 class="slide-tit">
                                    <span>5、结算信息</span>
                                </h2>
                                <div class="buy-foot clearfix">
                                    <div class="left-box">
                                        <dl>
                                            <dt>订单备注(100字符以内)</dt>
                                            <dd>
                                                <textarea name="message" v-model="ruleForm.message" class="input" style="height:35px;"></textarea>
                                            </dd>
                                        </dl>
                                    </div>
                                    <div class="right-box">
                                        <p>
                                            商品
                                            <label class="price">{{goodslist.length}}</label> 件&nbsp;&nbsp;&nbsp;&nbsp; 商品金额：￥
                                            <label id="goodsAmount" class="price">{{ruleForm.goodsAmount}}</label> 元&nbsp;&nbsp;&nbsp;&nbsp;
                                        </p>
                                        <p>
                                            运费：￥
                                            <label id="expressFee" class="price">{{ruleForm.expressMoment}}</label> 元
                                        </p>
                                        <p class="txt-box">
                                            应付总金额：￥
                                            <label id="totalAmount" class="price">{{TatalMomey}}</label>
                                        </p>
                                        <p class="btn-box">
                                            <a class="btn button" href="/cart.html">返回购物车</a>
                                            <input id="btnSubmit" name="btnSubmit" type="button" @click="submitvalidate" value="确认提交" class="btn submit">
                                        </p>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </el-form>
                </div>
            </div>
        </div>
    </div>
    </div>
</template>

<script>
    import { getItem } from '../kits/localStorageHelp.js'
    // 导入联动组件
    import VDistpicker from 'v-distpicker';
    export default {
        components: { VDistpicker },
        data() {

            // 定义手机号码的验证规则
            // rule :代表规则对象, 
            // value:这条规则应用的from1对象中的mobile属性的值
            //  callback：回调函数，  return callback(new Error('手机号码不合法')); 代表验证不合法
            // callback();代表验证合法的
            // 这个方法的作用是验证手机号码的正确性，使用正则表达式验证即可
            var checkmobile = (rule, value, callback) => {
                // 1.0 定义一个手机号码的正则表达式
                var reg = /(^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$)|(^0{0,1}1[3|4|5|6|7|8|9][0-9]{9}$)/;
                var regObj = new RegExp(reg);
                if (regObj.test(value) == false) {
                    callback(new Error('手机号码不合法'));
                } else {
                    callback();
                }
            }
            return {
                expressMoney: {
                    "1": 20,
                    "2": 10,
                    "3": 8
                },

                goodslist: [],
                ruleForm: {
                    "goodsAmount": 0
                    , "expressMoment": 20
                    , "accept_name": "骁骁"
                    , "area": {
                        "province": { "code": "140000", "value": "山西省" }
                        , "city": { "code": "140100", "value": "太原市" }
                        , "area": { "code": "140106", "value": "迎泽区" }
                    }
                    , "address": "城区"
                    , "mobile": "18667654355"
                    , "email": "ivanyb@qq.com"
                    , "post_code": "516000"
                    , "payment_id": "6"
                    , "express_id": 1
                    , "message": "4K,白色"
                    , "goodsids": "97,102"
                    , "cargoodsobj": {}
                },
                rules: {
                    accept_name: [
                        { required: true, message: '请输入姓名', trigger: 'blur' },
                    ],
                    address: [
                        { required: true, message: '请输入收获地址', trigger: 'blur' },
                    ],
                    mobile: [
                        // 自定义验证规则,指向checkmobile这个方法，而这个方法必须在data()的return之前定义好
                        { required: true, validator: checkmobile, trigger: 'blur' }
                    ],
                    email: [
                        { required: true, message: '请输入邮箱', trigger: 'blur' },
                    ]
                }
            }
        },
        mounted() {
            this.getgoodslist();
        },
        computed: {
            TatalMomey() {
                // 计算公式：  商品总价格 + 当前的运费
                return this.ruleForm.goodsAmount + this.ruleForm.expressMoment;
            }
        },
        methods: {
            //对整个表单进行校验
            submitvalidate() {
                this.$refs.ruleForm.validate((valid) => {
                    if (valid) {
                        // 表单元素都合法则提交表单
                        this.submit();
                    } else {
                        console.log('表单验证失败');
                        return false;
                    }
                });
            },
            //提交数据的方法
            submit() {
                // 补全goodsid和cargoodsobj
                this.ruleForm.goodsids = this.$route.params.ids;
                // console.log(this.ruleForm.cargoodsobj);
                var url = '/site/validate/order/setorder';
                this.$ajax.post(url, this.ruleForm).then(res => {
                    if (res.data.status == 1) {
                        this.$message.error('res.data.message');
                    } else {
                        this.$message({
                            message: '下单成功',
                            duration:1000,
                            type: 'success',
                            onClose:()=>{
                            // 跳转到支付页面
                            this.$router.push({name:'pay',params:{orderid:res.data.message.orderid}});
                            }
                        });
                    }

                })

            },
            expressChange(labelValue) {
                console.log(labelValue);
                // 根据labelvalue从this.ruleForm.expressMoment对象中获取具体的运费价格即可
                this.ruleForm.expressMoment = this.expressMoney[labelValue];
            },
            // 省级联动的值
            onSelected(data) {
                // console.log(data)
                this.ruleForm.area = data;
            },
            getgoodslist() {
                var url = '/site/validate/order/getgoodslist/' + this.$route.params.ids;
                this.$ajax.get(url).then(res => {

                    this.goodslist = res.data.message;
                    //获取localStorage 中的值，同步商品数量
                    var obj = getItem();
                    var newObj = {};
                    // console.log(obj);{90: 6, 92: 1, 93: 14, 94: 9, 98: 3}
                    this.goodslist.forEach((item, index) => {
                        // console.log(item);
                        item.buycount = obj[item.id];
                        // this.ruleForm.cargoodsobj[item.id] = obj[item.id]
                        newObj[item.id] = obj[item.id]

                        this.ruleForm.goodsAmount += (item.buycount * item.sell_price);
                    });
                    this.ruleForm.cargoodsobj = JSON.stringify(newObj);
                })
            }
        }
    }
</script>
<style>
    .el-form-item__label {
        width: 13% !important;
    }

    .el-form-item__content {
        margin-left: 13% !important;
    }
</style>