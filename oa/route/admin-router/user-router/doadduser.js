//点击添加用户提交表单
//按需引入db暴露的模块
const { User } = require("../../../mongodb/user")
const md5 = require("md5")
module.exports = async (req, res) => {
    // console.log(req.body);
    let userInfo = {
        username: req.body.username,
        password: md5(req.body.password),
        age: req.body.age,
        sex: req.body.sex,
        address: req.body.address
    }
    // console.log(userInfo);
    let result = await User.create(userInfo)
    console.log(result);
    if (result) {
        res.redirect("/admin/userlist")
    }

}