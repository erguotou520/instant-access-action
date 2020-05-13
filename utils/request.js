const http = require('http')
const replaceVars = require('./vars')

module.exports = function (payload, channel, head, body) {
  try {
    head = encodeURIComponent(replaceVars(head, payload));
    if (body) {
      body = encodeURIComponent(replaceVars(body, payload))
    }
    const url = `http://push.ijingniu.cn/send?key=${channel}&head=${head}&body=${body}`
    return new Promise((resolve, reject) => {
      http.get(url, (res) => {
        if (res.statusCode < 300 && res.statusCode >= 200) {
          resolve('ok')
        } else {
          reject(res.statusMessage);
        }
      })
    })

  } catch (error) {
    Promise.reject(error.message);
  }
}

