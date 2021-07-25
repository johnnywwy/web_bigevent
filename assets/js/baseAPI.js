// 注意每次调用$.get() 或者 $.post() 的时候
// 会先调用 ajaxPrefilter 这个函数
// 这个函数可以拿到我们给Ajax提供的配置对象

$.ajaxPrefilter(function (options) {
  // 发起真正的ajax之前，拼接请求根路径
  options.url = "http://api-breakingnews-web.itheima.net" + options.url;

  // 统一为有权限接口 设置 headers 请求头
  if (options.url.indexOf("/my/") !== -1)
    options.headers = {
      Authorization: localStorage.getItem("token") || "",
    };

  // 全局统一挂载 complete 回调函数
  options.complete = function (res) {
    // 在 complete 中可以拿到服务器响应回来的responseJSON数据
    if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
      // 1、强制清空token
      localStorage.removeItem("token");
      // 2、强制跳转 login 页面
      location.href = "/home/login.html";
    }
  };
});
