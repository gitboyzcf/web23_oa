// 引入集合
let {Product} = require("../../../mongodb/product");
module.exports = async (req,res)=>{
    req.app.locals.p_searchCon = req.query;
    console.log(req.query);
    //接收前端传递过来的页数，代表前端请求的那一页数据
    let page = Number(req.query.page) || 1;
    // size表示每页显示多少条数据
    let size = Number(req.query.size) || 4;

    // 为价格设置默认值
    let min = req.query.priceMin || 0;
    let max = req.query.priceMax || 10000000;

    // 查询商品数据库中有多少数据，并根据条件统计
    let total = await Product.countDocuments({
        title:new RegExp(req.query.title,"gi"),
        price:{$gt:min, $lt:max}
    });
    let startpage = (page - 1)*size;

    // 计算总的页数
    let totalPage = Math.ceil(total / size);

    // 查询数据
    let result = await Product.find({
        title: new RegExp(req.query.title,"gi"),
        price:{$gt:min, $lt:max}
    }).limit(size).skip(startpage);

    res.render("./admin/product/productsearch.ejs", {
        total: total,
        page: page,
        size: size,
        totalPage: totalPage,
        productListDatas: result
    })
}