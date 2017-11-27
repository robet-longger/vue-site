
// localStorage.setItem(“key”,”value”);//以“key”为名称存储一个值“value” 
// eg: localStorage.setItem(“realName”,”韩梅梅”);

// localStorage.getItem(“key”);//获取名称为“key”的值
// removeItem(“key”) 删除key 
// localStorage.removeItem(“realName”);
// clear() 清除所有内容 
// localStorage.clear();​//清空localStorage中所有信息。 
// 定义全局键---KEY
const KEY = 'buyGoods';
// 设置从localStorage中获取数据
export function getItem() {
    var jsonString = localStorage.getItem(KEY);
    if (!jsonString) {
        // 没有值
        return {};
    }
    // 将字符串转化为对象返回
    return JSON.parse(jsonString);
}
// 设置从localStorage中设置数据
//注意：要以对象的形式传参---gobj={gid:99,count:1}
export function setItem(gobj){
    // 从localStorage获取购买商品的数量  ---obj
    var obj = getItem();
     // 2.0 判断gobj.gid=>对应的商品的值在obj中是否存在，
    // 如果存在将gobj.count的值叠加上去即可
    if (obj[gobj.gid]) {
        obj[gobj.gid] =  obj[gobj.gid]+ gobj.count;
    }else{
        //如果添加的商品不存在
        obj[gobj.gid] = gobj.count;
    }

    // 将obj 存储在localStorage中
    localStorage.setItem(KEY,JSON.stringify(obj));
}

