import axios from 'axios'
import router from '../router'
import {
  Toast
} from 'vant';
// import { Message } from 'element-ui';  //element库的消息提示，可以不用

//创建axios实例
var service = axios.create({
  // baseURL: 'http://192.168.1.5/maker/public/index.php/api/v1/',
  baseURL: 'http://ckback.dachunongchang.com/index.php/api/v1/',
  //   timeout: 5000,
  headers: {
    'content-type': 'application/json',
    "token": getCookie("token")
  }
})
/**
 * cookie的查询
 * @param key
 * @returns {*}
 */
function getCookie(key) {
  var cookie = document.cookie;
  if (cookie) {
    var cookieList = cookie.split("; ");
    for (var i = 0; i < cookieList.length; i++) {
      var item = cookieList[i].split("=");
      var itemKey = item[0];
      var itemValue = item[1];
      if (itemKey == key) {
        return itemValue;
      }
    }
    return "";
  } else {
    return "";
  }
}
/**
 * cookie的增删改
 * @param key
 * @param value
 * @param days
 */
function setCookie(key, value, days) {
  if (days) {
    var date = new Date();
    date.setDate(date.getDate() + days);
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    document.cookie = key + "=" + value + ";expires=" + date;
  } else {
    document.cookie = key + "=" + value;
  }
}

// request拦截器
service.interceptors.request.use(
  (config) => {
    config.headers['token'] = getCookie("token");
    return config
  },
  (error) => {
    return Promise.reject(error)
  })

// response拦截器
service.interceptors.response.use(response => {
  if (response.data && response.data.code === 401) { // 401, token失效
    console.log("response拦截器==401")
    setCookie("token", "", -7)
    router.replace({
      path: '/login'
    });
  } else if (response.data && response.data.code === 200) { // 401, token失效
    return response
  } else {
    console.log("response拦截器!==200")
    Toast(response.data.msg);
    return response
  }
}, error => {
  return Promise.reject(error)
})


export default {
  //get请求，其他类型请求复制粘贴，修改method
  get(url, param) {
    return new Promise((cback, reject) => {
      service({
        method: 'get',
        url,
        params: param,
      }).then(res => {
        //axios返回的是一个promise对象 
        var res_code = res.status.toString();
        // if (res_code.charAt(0) == 2) {
        if (res_code == 200) {
          //   console.log("res----")
          //   console.log(res)
          //   console.log("res----")
          //   if (res.data.code == 401) {
          //     console.log("401111111")
          //     router.replace({
          //       path: '/login'
          //     });
          //   } else {
          //     cback(res);
          //   }


          cback(res); //cback在promise执行器内部
        } else {
          console.log(res, '异常1')
        }
      }).catch(err => {
        if (!err.response) {
          console.log(err)
          console.log('请求错误')
          //Message是element库的组件，可以去掉
          // Message({
          //     showClose: true,
          //     message: '请求错误',
          //     type: 'error'
          // });
        } else {
          reject(err.response);
          console.log(err.response, '异常2')
        }
      })

    })
  },
  post(url, params) {
    return new Promise((cback, reject) => {
      service({
        method: 'post',
        url,
        data: params,
      }).then(res => {
        //axios返回的是一个promise对象 
        var res_code = res.status.toString();
        if (res_code == 200) {
          cback(res); //cback在promise执行器内部
        } else {
          console.log(res, '异常1')
        }
      }).catch(err => {
        if (!err.response) {
          console.log(err)
          console.log('请求错误')
        } else {
          reject(err.response);
          console.log(err.response, '异常2')
        }
      })

    })
  }
}
