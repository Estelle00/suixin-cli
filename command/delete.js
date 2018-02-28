/**
 * Created by liubingwen on 2018/2/27.
 */
const {prompt} = require('inquirer')
const {writeTemplate} = require('../utils/index')
const tplList = require('../templates')
const questions = [
  {
    type: 'list',
    name: 'name',
    message: '请选择您要删除的模板名称：',
    choices: Object.keys(tplList)
  }
]
module.exports = prompt(questions).then(({name}) => {
  delete tplList[name]
  writeTemplate(tplList, '模板删除成功！')
})
