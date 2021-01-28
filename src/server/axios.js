import axios from 'axios'
import DOMAIN_NAME from './config.js'
/*
* 请求拦截器
*/
axios.interceptors.request.use((config) => {
  // 预处理请求信息
  console.log('RequestMessage:',config)
  return config
}, (error) => {
  // 预处理请求异常时抛出error
  return Promise.reject(error)
})

/*
* 响应拦截器
*/
axios.interceptors.response.use((res) => {
  // 进行响应事件处理
  const status = parseInt(res.status)
  switch (status) {
    case 200 :
      return res
    break;
    case 400 :
      return Promise.reject({ code: status, msg: '请求错误' })
    break;
    case 403 :
      return Promise.reject({ code: status, msg: '服务器拒绝请求' })
    break;
    case 404 :
      return Promise.reject({ code: status, msg: '页面丢失' })
    break;
    case 500 :
      return Promise.reject({ code: status, msg: '服务器内部错误' })
    break;
    case 503 :
      return Promise.reject({ code: status, msg: '服务不可用' })
    break;
    default:
    break;
  }
}, (error) => {
  return Promise.reject(error)
})

/**
 * 返回axios方法
 * @param url（如果传绝对地址则baseURL不会追加到url之前）
 * @param method
 * @param timeout
 * @param data
 * @param headers
 * @param dataType
 * @returns {AxiosPromise}
 */
export default function (url, {
  // 默认求情方式post
  method = 'post',
  // 超时
  timeout = 2000,
  // 请求主题
  data = {},
  // 请求头
  headers = {
	  'Content-Type':DOMAIN_NAME.REQUEST_HEADER.application,
	  'authorization':DOMAIN_NAME.TOKEN
	  },
  // 文件类型
  dataType = 'json'
}) {
  const config = {
    method: method,
    timeout: timeout,
    url: url,
    baseURL: DOMAIN_NAME.URL_SERVER_MICRO,
    data: data,
    headers: headers,
    dataType: dataType
  }
  return axios(config)
}
