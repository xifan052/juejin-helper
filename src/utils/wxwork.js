const axios = require('axios')
const { WXWORK_WEBHOOK } = require('../ENV.js')
const SUCCESS_CODE = 'ok'

const wxwork = async ({ content = '' } = {}) => {
  const data = {
    msgtype: 'markdown',
    markdown: {
      content: content || '签到失败',
    },
  }
  try {
    await axios.post(WXWORK_WEBHOOK, data).then(response => {
      if (response?.data?.errmsg !== SUCCESS_CODE) {
        throw new Error(response?.data?.errmsg || '发送失败')
      }
    })
  } catch (error) {
    console.log(error.stack)
  }
}

module.exports = wxwork
