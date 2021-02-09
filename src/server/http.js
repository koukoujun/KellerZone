import axios from './axios'
import qs from 'qs'

const requests = {
  // post 请求
  requestPost (data, path) {
    return axios(path, {
      // 请求方式
      method: 'post',
      // 数据体
      data: qs.stringify(data)
    }).then(res => {
       return res
    }, (error) => {
      return Promise.reject(error)
    })
  },
  // get 请求
  requestGet (data, path) {
	  return axios(path, {
		  method: 'get',
		  data: qs.stringify(data)
	  }).then(res => {
		  return res
	  }, (error) => {
		  return Promise.reject(error)
	  })
  },
  // formdata 上传文件
  requestFormData (data, path) {
    return axios(path, {
      headers: { 'Content-Type': 'multipart/form-data','authorization':sessionStorage.getItem('token') },
      method: 'post',
      data: data,
      onUploadProgress: function (progressEvent) {
        if (progressEvent.lengthComputable) { callback1(progressEvent) }
      },
      //cancelToken: cancelToken
    }).then(res => {
      return res
    }, (error) => {
      return Promise.reject(error)
    })
  }
}

export default requests
