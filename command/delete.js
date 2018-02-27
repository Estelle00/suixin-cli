/**
 * Created by liubingwen on 2018/2/27.
 */
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
