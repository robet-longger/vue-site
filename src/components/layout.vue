<template>
    <div class="tmpl">
        <div id="header" class="header">
            <div class="head-top">
                <div class="section">
                    <div class="left-box">
                        <span>vue2.0单页应用</span>
                        <a target="_blank" href="#"></a>
                        <a target="_blank" href="#"></a>
                    </div>
                    <div id="menu" class="right-box">
                        <router-link v-if="!islogin" to="/site/login">登录</router-link>
                        <a v-if="!islogin" href="/register.html">注册</a>
                        <strong>|</strong>
                        <router-link to="/site/vipcenter" v-if="islogin">会员中心</router-link>
                        <a v-if="islogin" @click='logout' href="javascript:void(0);">退出</a>
                        <!-- <a href="/content/contact.html"><i class="iconfont icon-phone"></i>联系我们</a> -->
                        <!-- <a id="layoutbuycar" href="/cart.html"> -->
                        <router-link id="layoutbuycar" to="/site/goodscar">
                            <i class="iconfont icon-cart"></i>
                            购物车(
                            <span id="shoppingCartCount">{{this.$store.getters.getBuyCount}}</span>)
                        </router-link>
                        <!-- </a> -->
                    </div>
                </div>
            </div>
            <div class="head-nav">
                <div class="section">
                    <!-- <div class="logo">
                                           <a href="/index.html"><img width="230px" height="70px" src="/templates/main/images/logo.png" /></a>
                                       </div>-->
                    <div id="menu2" class="nav-box menuhd">
                        <ul>
                            <li class="index">
                                <a href="/index.html">
                                    首页
                                </a>
                            </li>
                            <li class="news">
                                <a href="/news.html">
                                    学员问题汇总
                                </a>
                            </li>
                            <li class="photo">
                                <a href="/photo.html">
                                    重难点专区
                                </a>
                            </li>
                            <!--<li class="goods"><a href="">就业阶段</a></li>-->
                            <li class="video">
                                <a href="/video.html">
                                    前端常用功能
                                </a>
                            </li>
                            <li class="down">
                                <a href="/down.html">
                                    资源下载
                                </a>
                            </li>
                            <li>
                                <a target="_blank" href="/admin/index.aspx">
                                    问题提交
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div class="search-box">
                        <div class="input-box">
                            <input id="keywords" name="keywords" type="text" onkeydown="if(event.keyCode==13){SiteSearch('/search.html', '#keywords');return false};"
                                placeholder="输入关健字" x-webkit-speech="">
                        </div>
                        <a href="javascript:;" onclick="SiteSearch('/search.html', '#keywords');">
                            <i class="iconfont icon-search"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <!-- 路由的占位 -->
        <router-view></router-view>
    </div>
</template>

<script>
    // 按需导入bus.js vm 对象
    import { vm, KEY } from './kits/bus.js'

    export default {
        data() {
            return {
                islogin: false
                // 定义用户购买的商品总数--用于显示到购物车图标中
                // buyTotalCount: 0
            }
        },
        mounted() {
            // 1-头部
            $("#menu2 li a").wrapInner('<span class="out"></span>');
            $("#menu2 li a").each(function () {
                $('<span class="over">' + $(this).text() + '</span>').appendTo(this);
            });

            $("#menu2 li a").hover(function () {
                $(".out", this).stop().animate({ 'top': '48px' }, 300); // move down - hide
                $(".over", this).stop().animate({ 'top': '0px' }, 300); // move down - show

            }, function () {
                $(".out", this).stop().animate({ 'top': '0px' }, 300); // move up - show
                $(".over", this).stop().animate({ 'top': '-48px' }, 300); // move up - hide
            });
            this.changelogin();
            vm.$on('changelogin', (val) => {
                this.changelogin();
            })
        },
        methods: {
            //注销
            logout() {
                this.$ajax.get('/site/account/logout').then(res => {
                    if (res.data.status == 0) {
                        localStorage.setItem('logined', false);
                        //跳转到商品页面
                        this.$router.push({ name: 'goodslist' });
                        this.islogin = false;
                    }
                })
            },
            changelogin() {
                var res = localStorage.getItem("logined");
                if (res == 'true') {
                    //已经登录
                    this.islogin = true;
                } else {
                    //未登录
                    this.islogin = false;
                }
            }
        }
    }
</script>
<style scoped>
    /* 导入样式 */

    @import url('../../statics/jqplugins/jqhovernav/jqhoverNav.css');
</style>