//商品模块
const { Product } = require("../../../mongodb/product.js")
module.exports = async (req, res) => {


    //http://localhost:9527/admin/productlist?page=1&size=10   
    //page代表请求的页数   size可以代表每页显示多少条数据
    //接收前端传递过来的页数,代表前端请求那一页的数据
    let page = Number(req.query.page) || 1

    //size可以代表每页显示多少条数据
    let size = Number(req.query.size) || 4

    //查询数据库中User集合中总共有多少条数据
    let total = await Product.countDocuments({})

    // console.log(total);
    let startpage = (page - 1) * size

    // 计算总的页数
    let totalPage = Math.ceil(total / size)

    //查询数据
    const result = await Product.find({}).limit(size).skip(startpage)
    // console.log(result);

    res.render("./admin/product/productlist.ejs", {
        total: total,
        page: page,
        size: size,
        totalPage: totalPage,
        productListDatas: result
    })
}