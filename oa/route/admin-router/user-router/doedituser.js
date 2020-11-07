const user = require("../../../mongodb/user")
const { User } = require("../../../mongodb/user")
module.exports = async (req, res) => {

    // 判断是否为当前用户
    let u_name = await User.findOne({"_id":req.query.id});
    if(u_name.username == req.app.locals.username){
        let result = await User.updateOne({ "_id": req.query.id }, {
            username: req.body.username,
            age: req.body.age,
            sex: req.body.sex,
            address: req.body.address
        })
    
        if (result) {
            res.redirect("/admin/userlist")
        }
    }else{
        res.send("<script>alert('您修改的不是当前用户，请勿操作！'); location.href='/admin/userlist';</script>")
    }
}