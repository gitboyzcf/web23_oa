const { User } = require("../../../mongodb/user")
const md5 = require("md5")
module.exports = async (req, res) => {
    console.log(req.body);
    let userInfo = {
        username: req.body.username,
        password: md5(req.body.password)
    }

    let isUser = await User.findOne({
        "username": req.body.username
    })
    let isPass = await User.findOne({
        "password": md5(req.body.password)
    })
    if (!isUser) {
        res.send('<script>alert("该用户不存在"); location.href = "/admin/login"</script>')
    } else if (!isPass) {
        res.send('<script>alert("密码错误"); location.href = "/admin/login"</script>')
    } else {
        let isLogin = await User.findOne(userInfo)
        if (isLogin) {
            req.app.locals.username = req.body.username
            req.session.username = req.body.username
            res.redirect("/admin/userlist")
        }

    }


}