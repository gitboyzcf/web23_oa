const { User } = require("../../../mongodb/user")
module.exports = async (req, res) => {
    // console.log(req.body);
    // 当前用户为管理员时才能删除
    if(req.app.locals.username == "admin"){
        let result = await User.findOneAndDelete({ "_id": req.body.id })
        if (result) {
            res.redirect("/admin/userlist")
        }
    }else{
        res.send('<script>alert("您当前不是管理员，请误操作"); location.href = "/admin/userlist"</script>')

    }
}