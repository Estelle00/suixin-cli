/**
 * Created by liubingwen on 2018/2/27.
 */
const {prompt} = require('inquirer')
const {writeTemplate} = require('../utils/index')
const tplList = require('../templates')
const questions = [
  {
    type: 'input',
    name: 'name',
    message: '请输入您要删除的模板名称：',
    validate (val) {
      if (tplList[val]) {
        return true
      } else if (val === '') {
        return '请如实您要删除的模板名称！'
      }
      return '模板名称不存在！'
    }
  }
]
module.exports = prompt(questions).then(({name}) => {
  delete tplList[name]
  writeTemplate(tplList, '模板删除成功！')
})
