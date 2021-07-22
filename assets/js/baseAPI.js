// 注意每次调用$.get() 或者 $.post() 的时候
// 会先调用 ajaxPrefilter 这个函数
// 这个函数可以拿到我们给Ajax提供的配置对象

$.ajaxPrefilter(function (options) {
  // 发起真正的ajax之前，拼接请求根路径
  options.url = "http://api-breakingnews-web.itheima.net" + options;
  console.log(options.url);
});
