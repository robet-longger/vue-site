<template>
    <div class="tmpl">
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/login.html">会员登录</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <div class="nav-tit">
                        <a class="selected" href="javascript:;">账户登录</a>
                        <i>|</i>
                        <a href="/register.html">免费注册</a>
                    </div>
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" >
                        <form id="loginform" name="loginform" class="login-box">
                            <div class="input-box">
                                <el-form-item label="账户" prop="user_name">
                                    <el-input v-model="ruleForm.user_name"></el-input>
                                </el-form-item>
                                <!-- <input id="txtUserName" name="txtUserName" type="text" placeholder="用户名/手机/邮箱" maxlength="50"> -->
                            </div>
                            <div class="input-box">
                                <el-form-item label="密码" prop="password">
                                    <el-input type="password" v-model="ruleForm.password" auto-complete="off"></el-input>
                                </el-form-item>
                                <!-- <input id="txtPassword" name="txtPassword" type="password" placeholder="输入登录密码" maxlength="16"> -->
                            </div>
                            <div class="btn-box">
                                <input id="btnSubmit" name="btnSubmit" type="button" @click="submit" value="立即登录">
                            </div>
                            <div id="msgtips" class="tip-box"></div>
                            <input id="turl" name="turl" type="hidden" value="http://localhost:8020/cart.html">
                            <!--记住上一页网址-->
                        </form>
                    </el-form>

                </div>
            </div>
        </div>
    </div>
    </div>
</template>

<script>
    import {vm} from '../kits/bus.js'
    export default {
        data() {
            return {
                ruleForm: {
                    "user_name": "ivanyb1",
                    "password": "123"
                },
                rules: {
                    UserName: { required: true, message: '请输入用户名', trigger: 'blur' },
                    password: { required: true, message: '请输入密码', trigger: 'blur' }
                }
            }
        },
        methods: {
            submit() {
                this.$refs.ruleForm.validate((valid) => {
                    if (valid) {
                        //通过验证
                        var url = '/site/account/login';
                        this.$ajax.post(url, this.ruleForm).then(res => {
                            console.log(res.data);
                            if (res.data.status == 1) {
                                this.$message.error(res.data.message);
                                return;
                            }
                         
                            //跳转回原来页面
                            var currentPath = localStorage.getItem('currentPath');
                        //     console.log(currentPath)
                        //    console.log(123123);
                        //    if(currentPath=='/site/login') currentPath = '/';
                            this.$router.push({path:currentPath});
                            //在localStorage中存储一个logined =true 表示成功登录
                            localStorage.setItem('logined',true);
                            //全局事总线
                            vm.$emit('changelogin',true)

                        })
                    } else {
                        this.$message.error('表单验证失败');
                    }
                })
            }
        }
    }
</script>
<style>
    .tmpl .el-form-item__content {
        margin-left: 20% !important;
    }

    .tmpl .el-form-item__label {
        width: 16% !important;
    }
</style>