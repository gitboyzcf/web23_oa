// 监听用户输入
var uInput = document.querySelector(".reg_username");
// 提示信息
var tips = document.querySelector(".tips");
// 注册按钮
var regSubmit = document.querySelector(".reg_submit");

// console.log(uInput);
uInput.oninput = function(){
    // console.log(1);
    // ajax请求
    var xhr = new XMLHttpRequest();
    xhr.open("GET","http://192.172.1.33:3000/admin/getUser?username="+this.value);
    xhr.send(null);
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4 &&　xhr.status == 200){
            if(uInput.value != ""){
                if(JSON.parse(xhr.responseText).length != 0){
                    tips.innerHTML = "<h4 style='color:red;'>该用户名已被注册，请更换名称</h4>";
                    regSubmit.disabled = true;
                }else{
                    
                        tips.innerHTML = "<h4>用户名可以使用</h4>";
                        regSubmit.disabled = false;
                }
            }else{
                tips.removeChild(tips.children[0]);
            }
        }
    }

}