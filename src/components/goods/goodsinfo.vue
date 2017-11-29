<template>
    <div class="tmpl">
        <!-- 导航栏 -->
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/goods.html">购物商城</a>
                <a href="/goods/42/1.html">商品详情</a>

            </div>
        </div>

        <!-- 商品详情 -->
        <div class="section" v-if="info.goodsinfo">
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <!--页面左边-->
                    <div class="left-925">
                        <div class="goods-box clearfix">
                            <!--商品图片-->
                            <div class="pic-box">

                                <div class="magnifier" id="magnifier1">
                                    <div class="magnifier-container">
                                        <div class="images-cover"></div>
                                        <!--当前图片显示容器-->
                                        <div class="move-view"></div>
                                        <!--跟随鼠标移动的盒子-->
                                    </div>
                                    <div class="magnifier-assembly">
                                        <div class="magnifier-btn">
                                            <span class="magnifier-btn-left">&lt;</span>
                                            <span class="magnifier-btn-right">&gt;</span>
                                        </div>
                                        <!--按钮组-->
                                        <div class="magnifier-line">
                                            <ul class="clearfix animation03">
                                                <li v-for="item in info.imglist" :key="item.id">
                                                    <div class="small-img">
                                                        <img :src="item.original_path" />
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                        <!--缩略图-->
                                    </div>
                                    <div class="magnifier-view"></div>
                                    <!--经过放大的图片显示容器-->
                                </div>
                            </div>
                            <!--/商品图片-->

                            <!--商品信息-->
                            <div class="goods-spec">
                                <h1 v-text="info.goodsinfo.title"></h1>
                                <p class="subtitle">{{info.goodsinfo.sub_title}}</p>
                                <div class="spec-box">
                                    <dl>
                                        <dt>货号</dt>
                                        <dd id="commodityGoodsNo">{{info.goodsinfo.goods_no}}</dd>
                                    </dl>
                                    <dl>
                                        <dt>市场价</dt>
                                        <dd>
                                            <s id="commodityMarketPrice">¥{{info.goodsinfo.market_price}}</s>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>销售价</dt>
                                        <dd>
                                            <em class="price" id="commoditySellPrice">¥{{info.goodsinfo.sell_price}}</em>
                                        </dd>
                                    </dl>
                                </div>

                                <div class="spec-box">
                                    <dl>
                                        <dt>购买数量</dt>
                                        <dd>
                                            &nbsp;&nbsp;
                                            <el-input-number v-model="num1" @change="buyCount" :min="1" :max="info.goodsinfo.stock_quantity" label="描述文字"></el-input-number>
                                            <span class="stock-txt">
                                                库存 &nbsp;&nbsp;
                                                <em id="commodityStockNum">{{info.goodsinfo.stock_quantity}}</em>件
                                            </span>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dd>
                                            <div class="btn-buy" id="buyButton">
                                                <button class="buy">立即购买</button>
                                                <button ref="btnAddCar" class="add" @click="addCar">加入购物车</button>
                                            </div>
                                        </dd>
                                    </dl>
                                </div>

                            </div>
                            <!--/商品信息-->
                        </div>

                        <div id="goodsTabs" class="goods-tab bg-wrap">
                            <!--选项卡-->
                            <Affix>
                                <div id="tabHead" class="tab-head" style="position: static; top: 517px; width: 925px;">
                                    <ul>
                                        <li @click="istabShow = true">
                                            <a v-bind="{class:(istabShow?'selected':'')}" href="javascript:;">商品介绍</a>
                                        </li>
                                        <li @click="istabShow = false">
                                            <a v-bind="{class:(!istabShow?'selected':'')}" href="javascript:;" class="">商品评论</a>
                                        </li>
                                    </ul>
                                </div>
                            </Affix>
                            <!--/选项卡-->

                            <!--选项内容-->
                            <div class="tab-content entry" v-show="istabShow">
                                <div style="padding:5px" v-html="info.goodsinfo.content"></div>
                            </div>
                            <!--选项内容-->
                            <div class="tab-content" v-show="!istabShow">
                                <!--网友评论-->
                                <div class="comment-box">
                                    <!--取得评论总数-->
                                    <form id="commentForm" name="commentForm" class="form-box" url="/tools/submit_ajax.ashx?action=comment_add&amp;channel_id=2&amp;article_id=98">
                                        <div class="avatar-box">
                                            <i class="iconfont icon-user-full"></i>
                                        </div>
                                        <div class="conn-box">
                                            <div class="editor">
                                                <textarea id="txtContent" name="txtContent" sucmsg=" " v-model="commenttxt" datatype="*10-1000" nullmsg="请填写评论内容！"></textarea>
                                                <span class="Validform_checktip"></span>
                                            </div>
                                            <div class="subcon">
                                                <input id="btnSubmit" name="submit" type="button" @click="btnCommenttxt" value="提交评论" class="submit">
                                                <span class="Validform_checktip"></span>
                                            </div>
                                        </div>
                                    </form>
                                    <ul id="commentList" class="list-box">
                                        <p v-if="commentList.length<0" style="margin:5px 0 15px 69px;line-height:42px;text-align:center;border:1px solid #f7f7f7;">暂无评论，快来抢沙发吧！</p>
                                        <li v-for="item in commentList" :key="item.id">
                                            <div class="avatar-box">
                                                <i class="iconfont icon-user-full"></i>
                                            </div>
                                            <div class="inner-box">
                                                <div class="info">
                                                    <span>{{item.user_name}}</span>
                                                    <span>{{item.reply_time | datefmt('YYYY-MM-DD HH:mm:ss')}}</span>
                                                </div>
                                                <p>{{item.content}}</p>
                                            </div>
                                        </li>
                                    </ul>
                                    <!--放置页码-->
                                    <div class="page-box" style="margin:5px 0 0 62px">
                                        <el-pagination @size-change="sizeChange" @current-change="pageChange" :current-page="pageIndex" :page-sizes="[2, 5, 10]"
                                            :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalcount">
                                        </el-pagination>
                                    </div>
                                    <!--/放置页码-->
                                </div>

                                <!--/网友评论-->
                            </div>

                        </div>

                    </div>
                    <!--/页面左边-->

                    <!--页面右边-->
                    <div class="left-220">
                        <div class="bg-wrap nobg">
                            <div class="sidebar-box">
                                <h4>推荐商品</h4>
                                <ul class="side-img-list">

                                    <li v-for="item in info.hotgoodslist" :key="item.id">
                                        <div class="img-box">
                                            <router-link v-bind="{to:'/site/goodsinfo/'+item.id}">
                                                <img :src="item.img_url">
                                            </router-link>
                                        </div>
                                        <div class="txt-box">
                                            <router-link v-bind="{to:'/site/goodsinfo/'+item.id}">
                                                {{item.title}}
                                            </router-link>
                                            <span>{{item.add_time | datefmt}}</span>
                                        </div>
                                    </li>

                                </ul>
                            </div>
                        </div>
                    </div>
                    <!--/页面右边-->
                </div>
            </div>
        </div>
        <!-- 用来定义图片飞动到购物车 -->
        <transition @before-enter="benter" @enter="enter" @after-enter="aenter">
            <div v-if="info.imglist" class="img" ref="img" v-show="isshow">
                <img width="50" height="50" :src="info.imglist[0].thumb_path" alt="">
            </div>
        </transition>

    </div>
</template>

<script>
    import '../../../statics/jqplugins/jQueryMagnifier/js/magnifier.js';
    import { KEY, vm } from '../kits/bus.js'
    import { setItem } from '../kits/localStorageHelp.js'
    export default {
        data() {
            return {
                isshow:false,//默认隐藏图片
                offsetObj: {},//加入购物车按钮位置信息
                layoutbuycarObj: {},//购物车图标位置信息
                currentBuyCount: 1,//定义计数器里面商品数量默认为1
                commenttxt: "",//评论内容
                commentList: [],
                totalcount: 0,
                pageIndex: 1,//当前显示页
                pageSize: 2,//默认显示2条数据
                istabShow: true,//默认显示商品的详情
                num1: 1,
                info: {}
            }
        },
        mounted() {
            this.getgoodsinfo();
            this.getcommentList();
            // 利用jq获取这个对象的offset
            setTimeout(() => {
                //获取当前页面加入购物车的按钮位置
                var offsetObj = $(this.$refs.btnAddCar).offset();
                // console.log(offsetObj);
                this.offsetObj = offsetObj;
                //把位置赋值给图片
                $(this.$refs.img).css("left", offsetObj.left).css("top", offsetObj.top);
                // 获取layout.vue组件中购物车的位置
                var layoutbuycarObj = $("#layoutbuycar").offset();
                this.layoutbuycarObj = layoutbuycarObj;
            }, 200);
        },
        //7-点击热推荐切换相应内容---watch 监听
        watch: {
            '$route': function () {
                this.getgoodsinfo();
            }
        },

        methods: {
            // 定义钩子enter加入购物车动画
            benter(el) {
                //定义开始动画
                el.style.left = this.offsetObj.left + "px";
                el.style.top = this.offsetObj.top + "px";
            },
            enter(el, done) { 
                // 动画结束位置
                el.offsetWidth;
                el.style.left = this.layoutbuycarObj.left + "px";
                el.style.top = this.layoutbuycarObj.top + "px";
                done();//调用，让下面的函数执行相应的逻辑
            },
            aenter(el) {
              //到达位置图片隐藏
                this.isshow = false;
             },
            // 6-定义点击购物车实现数量添加
            addCar() {
                //利用vm.$emit()触发事件，将购买的数量传给layout.vue组件
                // vm.$emit(KEY, this.currentBuyCount);
                //将得到的this.currentBuyCount存到localStorage中
                var goodsObj = { gid: this.$route.params.goodsid, count: this.currentBuyCount };
                // console.log(goodsObj);
                // setItem(goodsObj);
                this.$store.dispatch('changeCount',goodsObj)
                //点击购物按钮显示图片
                this.isshow = true;

            },
            //5-评论提交操作
            btnCommenttxt() {
                var url = `/site/validate/comment/post/goods/${this.$route.params.goodsid}`;
                this.$ajax.post(url, { commenttxt: this.commenttxt }).then(res => {
                    if (res.data.status == 1) {
                        this.$message.error(res.data.message);
                    } else {
                        // 处理成功之后重新异步刷新
                        this.getcommentList();
                        // 清空文本框
                        this.commenttxt = "";
                    }
                })
            },
            //4-定义两个分页的方法
            sizeChange(size) {
                this.pageSize = size;
                this.getcommentList();
            },
            pageChange(index) {
                this.pageIndex = index;
                this.getcommentList();
            },
            // 3 - 获取分页评论
            getcommentList() {
                var url = `/site/comment/getbypage/goods/${this.$route.params.goodsid}?pageIndex=${this.pageIndex}&pageSize=${this.pageSize}`
                this.$ajax.get(url).then(res => {
                    // console.log(res.data.message);
                    this.commentList = res.data.message;
                    // 获取评论中条数
                    this.totalcount = res.data.totalcount;
                })
            },
            // 2.0计数器--value就是里面的数量
            buyCount(value) {
                // console.log(value);
                this.currentBuyCount = value;
            },
            // 1.0 定义方法去根据url传入的商品id获取到商品的详情数据
            getgoodsinfo() {
                var url = "/site/goods/getgoodsinfo/" + this.$route.params.goodsid;
                this.$ajax.get(url).then(res => {
                    this.info = res.data.message;
                    if (!this.info.goodsinfo) {
                        this.$message.error('传入的商品id非法');
                    }
                    setTimeout(function () {
                        $('#magnifier1').imgzoon({ magnifier: '#magnifier1' });
                    }, 200);
                })
            }
        }
    }
</script>
<style scoped>
    @import url('../../../statics/site/js/jqplugins/imgzoom/css/magnifier.css');
    .img {
        border: 1px solid red;
        width: 50px;
        height: 50px;
        position: absolute;
        top: 0;
        left: 0;
        transition: all 1s;
    }
</style>