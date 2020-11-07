let {Product} = require("../../../mongodb/product");
module.exports = async (req,res)=>{
    console.log(req.query);
    let result = await Product.findOne({"_id":req.query.id});
    if(result){
        res.render("./admin/pro-classify/classifyinfo.ejs",{productInfo:result});
    }
}