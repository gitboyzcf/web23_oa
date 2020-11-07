let {Product} = require("../../../mongodb/product");
//修改产品模块
module.exports = async (req, res) => {
    console.log(req.query);
    let result = await Product.find({"_id":req.query.id});
    console.log(result);
    if(result){
        res.render("./admin/product/productedit.ejs",{product:result[0]});
    }

}