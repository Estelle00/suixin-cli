/**
 * Created by liubingwen on 2018/2/27.
 */
/*
const fs = require('fs')
const path = require('path')
const co = require('co')
const prompt = require('co-prompt')
const chalk = require('chalk')
const config = require('../templates')
module.exports = () => {
  co(function * () {
    const tplName = yield prompt('Template name: ')
    if (config[tplName]) {
      config[tplName] = undefined
    } else {
      console.log(`${tplName} --- 模板不存在！`)
      process.exit()
    }
    // 模板信息写入templates.json文件
    const templatesPath = path.resolve(__dirname, '../templates.json')
    console.log('templatesPath', templatesPath)
    fs.writeFile(templatesPath, JSON.stringify(config), 'utf-8', err => {
      if (err) chalk.red(err)
      console.log(chalk.green('模板删除成功！!\n'))
      console.log(chalk.grey('已有模板列表如下: \n'))
      console.log(config)
      console.log('\n')
      process.exit()
    })
  })
}
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
