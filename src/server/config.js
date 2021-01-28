// REQUEST配置文件
const DOMAIN_NAME = {
  // 测试端口
  URL_TEST_MICRO: 'http://1.85.10.98:62/',
  // 服务端口
  URL_SERVER_MICRO: 'http://192.168.1.10:7001/',
  // HEADER
  REQUEST_HEADER: {
    application: 'application/x-www-form-urlencoded', // 请求体中的数据会以普通表单形式（键值对）发送到后端，“引入qs进行处理”
    form: 'multipart/form-data', // 它会将请求体的数据处理为一条消息，以标签为单元，用分隔符分开。既可以上传键值对，也可以上传文件。
    text: 'application/json'// 请求体中的数据会以json字符串的形式发送到后端
  },
  // 请求方式
  REQUEST_WAY: {
    Post: 'POST', // 向指定路径资源提交数据进行请求处理，数据包含在请求体中
    Get: 'GET', // 向指定路径资源发出请求，数据暴露在url中
    Options: 'OPTIONS', // 返回服务器针对特定资源所支持的HTTP请求方法，允许客户端查看，测试服务器性能
    Head: 'HEAD', // 向服务器与GET请求相一致的响应，响应体不会返回，可以不传输整个响应内容
    Put: 'PUT', // 从客户端向服务器传送的数据取代指定的文档的内容
    Delete: 'DELETE', // 请求服务器删除指定的页面
    Trace: 'TRACE'// 回显服务器收到的请求，主要用于测试或诊断
  },
  //TOKEN
  TOKEN:sessionStorage.getItem('token')
}

export default DOMAIN_NAME
