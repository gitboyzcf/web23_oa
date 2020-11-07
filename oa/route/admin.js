const { query } = require("express");
let express = require("express");
const md5 = require("md5");
//创建一个express路由对象
let router = express.Router()
let {User} = require("../mongodb/user");

//配置路由
router.get("/",(req,res)=>{
    res.redirect("/admin/login");
})
// 该接口共ajax使用---
router.get("/getUser",async (req,res)=>{
    // console.log(111);
    // console.log(req.query.username);
    let result = await User.find({"username":req.query.username});
    if(result){
        res.status(200).send(result);
    }
})

//登录页面
router.get("/login", require("./admin-router/user-router/login"))
//点击登录按钮提交表单请求数据
router.post("/dologin", require("./admin-router/user-router/dologin"))
// 注册提交
router.post("/user_register",async (req,res)=>{
    console.log(req.body);
    let result = await User.create({
        username:req.body.username,
        password:md5(req.body.password),
        sex:req.body.sex,
        age:req.body.age,
        address:req.body.address
    });
    if(result){
        console.log("注册成功")
        res.redirect("/admin");
    } else{
        console.log("注册失败")
    }
})
// 拦截------------
router.use(function(req,res,next){
    let userName = req.app.locals.username;
    if(!userName){
        res.redirect("/admin/login");
    }else{
        next();
    }
});

//用户列表
router.get("/userlist", require("./admin-router/user-router/userlist"))
//添加用户
router.get("/adduser", require("./admin-router/user-router/adduser.js"))
//添加用户提交数据的地址
router.post("/doadduser", require("./admin-router/user-router/doadduser.js"))

//删除用户
router.post("/deleteuser", require("./admin-router/user-router/deleteuser.js"))

//修改用户
router.get("/edituser", require("./admin-router/user-router/edituser.js"))
//点击确定修改按钮提交数据，更新数据库接口
router.post("/doedituser", require("./admin-router/user-router/doedituser.js"))
//用户搜索路由
router.get("/searchuser", require("./admin-router/user-router/searchuser.js"))

router.get("/logout", (req, res) => {
    req.app.locals.username = null;
    req.session.destroy()  //销毁session
    res.redirect("/admin/login")
})


//商品列表
router.get("/productlist", require("./admin-router/product-router/productlist.js"))
//添加产品-页面
router.get("/productadd", require("./admin-router/product-router/productadd.js"))
//添加产品-提交数据
router.post("/doproductadd", require("./admin-router/product-router/doproductadd.js"))

//修改产品
router.get("/productedit", require("./admin-router/product-router/productedit.js"));
// 修改提交产品
router.post("/doproductedit",require("./admin-router/product-router/doproductedit.js"));
// 删除商品
router.post("/deleteproduct",require("./admin-router/product-router/deleteproduct.js"));

// 搜索商品
router.get("/productsearch",require("./admin-router/product-router/productsearch.js"));


//商品分类列表
router.get("/classifylist",require("./admin-router/product-router/classifylist.js"))
// 查看此商品信息
router.get("/classifyinfo",require("./admin-router/product-router/classifyinfo.js"));

// 增加商品分类
router.get("/addclassify",(req,res)=>{
    res.render("./admin/pro-classify/addclassify.ejs");
})

//暴露
module.exports = router