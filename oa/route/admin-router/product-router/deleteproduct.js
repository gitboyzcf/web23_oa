let {Product} = require("../../../mongodb/product");
module.exports = async (req,res)=>{
    let result = await Product.findOneAndDelete({"_id":req.body.id});
    if(result){
        res.redirect("/admin/productlist");
    }else{
        console.log("删除失败");
    }
}