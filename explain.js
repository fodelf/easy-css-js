/*
 * @Description:调取css样式查询方法
 * @Author: 吴文周
 * @Github: https://github.com/fodelf
 * @Date: 2019-10-21 18:05:02
 * @LastEditors: 吴文周
 * @LastEditTime: 2019-10-22 11:51:45
 */

const http = require('https')
/**
 * @name: get
 * @description:get请求
 * @param {String}:scss样式查询关键字
 * @return {}: 没有返回
 */
function get(word) {
  return new Promise(function(resolve, reject) {
    let url = 'https://developer.mozilla.org/zh-CN/docs/Web/CSS/' + word
    http.get(
      url,
      {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Linux; Android 5.0; SM-G900P Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Mobile Safari/537.36'
        }
      },
      function(rsp) {
        let body = ''

        if (rsp.statusCode >= 400) {
          // throw 'Translate failed, please check your network.'
          resolve('')
        }

        rsp.on('data', function(data) {
          body += data
        })

        rsp.on('end', function() {
          // 关键字匹配根据https://developer.mozilla.org文档格式解析
          try {
            var article = body.match(/\<article((.|\n)*?)\<\/article\>/gi)[0]
            var str = article.match(/\<dl((.|\n)*?)\<\/dl\>/gi)
            var head = str[0].match(/\<dt((.|\n)*?)\<\/dt\>/gi).map(item => {
              return item.replace(/<[^>]+>/g, '')
            })
            var headNext = str[1]
              ? str[1].match(/\<dt((.|\n)*?)\<\/dt\>/gi).map(item => {
                  return item.replace(/<[^>]+>/g, '')
                })
              : []
            var content = str[0].match(/\<dd((.|\n)*?)\<\/dd\>/gi).map(item => {
              return item.replace(/<[^>]+>/g, '')
            })
            head.length = content.length
            var contentNext = str[1]
              ? str[1].match(/\<dd((.|\n)*?)\<\/dd\>/gi).map(item => {
                  return item.replace(/<[^>]+>/g, '')
                })
              : []
            headNext.length = contentNext.length
            content = content.concat(contentNext)
            head = head.concat(headNext)
            var back = ''
            content.forEach((item, index) => {
              back += head[index].trim() + ' : ' + item + '\n\n'
            })
            resolve(back)
          } catch (error) {
            resolve('')
          }
        })
        rsp.on('timeout', function() {
          reject(new Error('NetWork Connect Timeout.'))
        })
      }
    )
  })
}
module.exports = async word => {
  let tran = await get(word)
  return tran
}
