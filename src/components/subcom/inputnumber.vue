<template>
    <div class="subtmpl">
        <ul>
            <li @click="substract">-</li>
            <li>{{count}}</li>
            <li @click="add">+</li>
        </ul>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                count: 1
            }
        },
        // obj的格式：{gid:商品id,count:当前商品的购买数量}
        props:['obj'],//props-》
        mounted(){
            // console.log(this.obj);
            this.count = this.obj.count ;
        },
        methods: {
            //减
            substract() {
                this.count--;
                if ( this.count <=1) {
                    this.count = 1;
                }
                console.log(this.count);
                // 将最新的数量传递会父组件
                this.$emit('msg',{gid:this.obj.gid,count:this.count});
            },
            //加
            add() {
                this.count++;
                // console.log(this.count);
                // 将最新的数量传递会父组件
                this.$emit('msg',{gid:this.obj.gid,count:this.count});
            },
        }
    }
</script>
<style scoped>
    .subtmpl ul {
        width: 120px;
        text-align: center;
        padding: 30px 0;
        background-color: #f5f5f5;
    }

    .subtmpl li {
        list-style: none;
       display: inline-block;
        width: 30px;
        border: 1px solid #000;
        background-color: #f5f5f5;
        text-align: center;
        cursor: pointer;
    }
</style>