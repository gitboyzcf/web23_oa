let {Product} = require("../../../mongodb/product");
module.exports = async (req,res)=>{
    let result = await Product.find({});
    let countObj = {
        menswear:[],
        womenswear:[],
        childrenswear:[]
    };
    for(let i = 0; i < result.length; i++){
        switch(result[i].cate_id){
            case "1":
                // console.log("男装");
                countObj.menswear.push(result[i]);
                break;
            case "2":
                // console.log("女装");
                countObj.womenswear.push(result[i]);
                break;
            case "3":
                // console.log("童装");
                countObj.childrenswear.push(result[i]);
                break;
        }
    }
    res.render("./admin/pro-classify/classifylist",{productClass:countObj});

}