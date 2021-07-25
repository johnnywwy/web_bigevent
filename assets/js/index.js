$(function () {
  // 调用 getUserInfo() 函数
  getUserInfo();
  var layer = layui.layer;
  $("#btnlogout").on("click", function () {
    //   提示用户是否确认退出
    layer.confirm("确定退出登录?", { icon: 3, title: "提示" }, function (index) {
      //  清空本地存储中的 token
      localStorage.removeItem("token");
      // 重新跳转 login 页面
      location.href = "/home/login.html";
      // 关闭 confirm 询问框
      layer.close(index);
    });
  });
});

// 获取用户信息
function getUserInfo() {
  $.ajax({
    method: "GET",
    url: "/my/userinfo",
    // Headers 就是请求头配置对象
    // headers: {
    //   Authorization: localStorage.getItem("token") || "",
    // },
    success: function (res) {
      if (res.status !== 0) {
        return layui.layer.msg("获取用户信息失败！");
      }
      //   调用 renderAvater 渲染用户头像
      renderAvatar(res.data);
    },
    // 无论成功失败，都调用 complete 函数
    // complete: function (res) {
    //   // 在 complete 中可以拿到服务器响应回来的responseJSON数据
    //   if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
    //     // 1、强制清空token
    //     localStorage.removeItem("token");
    //     // 2、强制跳转 login 页面
    //     location.href = "/home/login.html";
    //   }
    // },
  });
}
function renderAvatar(user) {
  // 1、获取用户名称
  var name = user.nickname || user.username;
  //   2、设置欢迎文本
  $("#welcome").html("欢迎&nbsp&nbsp" + name);
  //   3、按需渲染用户头像
  if (user.user_pic !== null) {
    //   3-1 渲染图片头像
    $(".layui-nav-img").attr("src", user.user_pic).show();
    $(".text-avatar").hide();
  } else {
    //   3-2 渲染文本头像
    $(".layui-nav-img").hide();
    var first = name[0].toUpperCase();
    $(".text-avatar").html(first).show();
  }
}
