const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/hg-admin", { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log("数据连接成功");
}).catch(err => {
    console.log(err);
    console.log("数据库连接失败");
})