// 1.0 导入vue.js  <script src="vue.js">
// import vue from 'vue'
// var vue  = require('vue');  //查找node_modules中的vue这个包
import Vue from 'vue';

// 2.0 导入app.vue组件对象
import App from './App.vue';   //当前目录下面查找app.vue这个组件


// 3.0 导入vue-router这个路由模块进行整个系统的路由控制
// 3.0.1 导入vue-router这个包
import VueRouter from 'vue-router';

// 3.0.0 将VueRouter对象通过Vue.use()使用一下
Vue.use(VueRouter);

// 3.0.2 导入组件对象
import layout from './components/layout.vue';
import goodslist from './components/goods/goodslist.vue';
import goodsinfo from './components/goods/goodsinfo.vue';
import goodscar from './components/goods/goodscar.vue';
import shopping from './components/goods/shopping.vue';
import pay from './components/goods/pay.vue';
import login from './components/account/login.vue';

// 3.0.2 实例化对象并且定义路由规则
var router = new VueRouter({
    routes: [
        // 默认跳转的路由规则
        { name: 'default', path: '/', redirect: '/site/goodslist' },
        // 布局
        {
            name: "layout", path: "/site", component: layout,
            children: [
                // 商品列表
                { name: "goodslist", path: "goodslist", component: goodslist },
                { name: "goodsinfo", path: "goodsinfo/:goodsid", component: goodsinfo },
                // 购物车下单
                { name: "goodscar", path: "goodscar", component: goodscar },
                //下单
                { name: "shopping", path: "shopping/:ids", component: shopping },
                //支付页面
                { name: "pay", path: "pay/:orderid", component: pay },
                //登录
                { name: "login", path: "login", component: login }
            ]
        }
    ]
});


// 4.0 导入vue的一个组件库:element-ui
import elementUI from 'element-ui';
// 导入默认样式(由于咱们自己修改了样式所以要替换默认样式)
import '../statics/elementUICSS/index.css';

// 导入自己编写的全局样式
import '../statics/site/css/style.css';

// 按需引入iview 组件
import { Affix } from 'iview';
Vue.component('Affix', Affix);

// 绑定到vue中
Vue.use(elementUI);

// 5.0 导入axios
import axios from 'axios';

// 5.0.1 设定axios的默认请求域名，将来在真正调用get,post方法的时候传入的url中就不需要带域名的
axios.defaults.baseURL = 'http://127.0.0.1:8899';

// 5.0.2 配置axios在请求数据服务接口的时候，允许带cookie(凭证)
axios.defaults.withCredentials = true;

// 5.0.2 将axios对象绑定到Vue的原型属性 $ajax上，将来在任何组件中均可以通过this.$ajax中的get(),post() 就可以发出ajax请求了
Vue.prototype.$ajax = axios;

// 6.0 定义一个全局过滤器
Vue.filter('datefmt', (input, fmtstring) => {
    var date = new Date(input);
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    var d = date.getDate();
    var h = date.getHours();
    var mm = date.getMinutes();
    var ss = date.getSeconds();

    if (fmtstring == 'YYYY-MM-DD HH:mm:ss') {
        return y + "-" + m + "-" + d + " " + h + ":" + mm + ":" + ss;
    }
    return y + "-" + m + "-" + d;

})
//vuex定义和集成
import vuex from 'vuex';
Vue.use(vuex);
//定义四个核心对象
var state = {
    buyCount: 0
}
import { setItem, getItem } from "./components/kits/localStorageHelp.js";
var mutations = {
    // 定义一个changeCount方法来改变state中的buyCount值
    // 参数state:代表的是上面定义好的state对象
    // 参数parmsbuyCount:就是从程序员在调用的时候传入的（带业务才知道具体的参数有哪些）
    changeCount(state, goodsobj) {
        state.buyCount += goodsobj.count;

        //将这个值存储在localStorage中
        setItem(goodsobj);
    }
}
var actions = {//在 外部写this.$store.dispatch('action定义好的方法名称'，传入的参数)
    //定义一个changeCount方法来触发mutations中的某个方法
    changeCount({ commit }, goodsobj) {
        // commit中的第一个参数就是mutations 中的某个方法名称
        commit('changeCount', goodsobj)
    }
}
var getters = {//对state 中的某个属性进行封装处理（按业务逻辑处理）
    getBuyCount(state) {//在任何视图上使用的代码如下： this.$store.getters.getBuyCount
        if (state.buyCount > 0) {//state.buyCount > 0直接返回
            return state.buyCount;
        } else {
            var obj = getItem();
            var tcount = 0;
            for (var key in obj) {
                tcount += obj[key];
            }
            state.buyCount = tcount;
            return tcount;
        }
    }

}
//实例化上述四个对象
const store = new vuex.Store({
    state, mutations, actions, getters
})

// 3.0 实例化vue对象
new Vue({
    el: '#app',
    router,  //绑定路由对象使它生效
    store,//在vue中注入store
    // render:function(create){create(App)}
    // 将app组件编译将这个组件中的内容填充到 el:指向的app这个div中
    render: create => create(App)
});
