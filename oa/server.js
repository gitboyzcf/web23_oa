const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const session = require("express-session")
const app = new express();


//配置ejs模板引擎
app.set("view engine", "ejs");
//配置ejs模板文件所在路径
app.set("views", __dirname + "/views");
//配置静态资源路径
app.use(express.static("public"));

//使用body-parser
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())
//配置session
app.use(session({
    secret: 'abcdefg',  //任意传一个字符串，生成session的签名
    resave: false, //强制保存session,默认是true不保存，设置成false强制保存
    saveUninitialized: true,  //强制将未初始化的session保存
    cookie: {
        // secure: true  指的是https协议
        maxAge: 30 * 60 * 1000   //设置过期时间
    },
    rolling: true  //强制将cookie的过期时间重置
}))


// 解决跨域
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});


//引入自定义模块
const admin = require("./route/admin.js")
app.use("/admin", admin)

app.listen(3000, () => {
    console.log("3000running...,请访问http://192.172.1.33:3000/admin");
})