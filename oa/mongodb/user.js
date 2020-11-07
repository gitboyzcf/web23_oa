const mongoose = require("mongoose");
require("./db")
//创建一个用户集合规则
const UserSchema = new mongoose.Schema({
    username: {
        type: String,   //类型
        required: [true, "用户名不能为空"],  //开启验证
        minlength: 4,  //最小长度
        maxlength: 18, //最大长度
        trim: true   //去除空格
    },
    password: {
        type: String,
        required: [true, "密码不能为空"],
        minlength: 4,  //最小长度
        maxlength: 100, //最大长度
        trim: true   //去除空格
    },
    sex: {
        type: String,
        require: [true, "性别不能为空"],
        enum: {
            values: ["男", "女", "保密"]
        },
        message: "选择正确的性别"
    },
    age: {
        type: Number,
        min: 12,
        max: 80
    },
    address: {
        type: String
    }
})

//使用集合规则创建集合
const User = mongoose.model('User', UserSchema);

//暴露
module.exports = {User};