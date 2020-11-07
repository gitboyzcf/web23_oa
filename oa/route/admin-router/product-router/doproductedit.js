// 引入第三方模块
let formidable = require("formidable");
// 内置path模块
let path = require("path");
let {Product} = require("../../../mongodb/product");
module.exports = (req,res)=>{
    console.log(req.body);
    // 创建表单解析对象
    let form = new formidable.IncomingForm();
    // 配置图片存放位置,放置在public下的uploads中
    form.uploadDir = path.join(__dirname,"../","../","../","/public/uploads");
    // 保存上传文件的后缀
    form.keepExtensions = true;
    form.parse(req,async (err,fields,files)=>{
        // 根据files.pic.name判断是否修改了图片
        if(files.pic.name){
            var result = await Product.updateOne({"_id":req.query.id},{
                title:fields.title,
                pic:files.pic.path.split("public")[1],
                price:fields.price,
                postage:fields.postage,
                content:fields.content
            });
        }else{
            var result = await Product.updateOne({"_id":req.query.id},{
                title:fields.title,
                price:fields.price,
                postage:fields.postage,
                content:fields.content
            });
        }
        if(result){
            res.redirect("/admin/productlist");
        }else{
            console.log("修改失败");
        }
    })
}