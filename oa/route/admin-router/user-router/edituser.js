//修改用户
const { User } = require("../../../mongodb/user")
module.exports = async (req, res) => {
    console.log(req.query);  //{ id: '5f9a7d0020284a4784cab100' }
    let result = await User.findOne({ "_id": req.query.id })
    res.render("./admin/edituser.ejs", {
        editData: result
    })
}