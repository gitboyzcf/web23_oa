const mongoose = require("mongoose");
require("./db")
//创建一个用户集合规则
const ProductSchema = new mongoose.Schema({
    title: {  //标题
        type: String,   //类型
        required: [true, "用户名不能为空"],  //开启验证
        trim: true   //去除空格
    },
    pic: {  //缩略图
        type: String
    },
    postage: {  //邮费
        type: String
    },
    cate_id: { //分类id
        type: String
    },
    price: {  //价格
        type: Number
    },
    content: { //详情内容
        type: String
    }
})

//使用集合规则创建集合
const Product = mongoose.model('Product', ProductSchema);

//暴露
module.exports = {
    Product
}