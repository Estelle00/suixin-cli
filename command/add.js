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
      console.log('当前模板已存在！')
      process.exit()
    }
    const gitUrl = yield prompt('Git https link: ')
    const branch = yield prompt('Branch: ')
    config[tplName] = {}
    config[tplName]['url'] = gitUrl.replace(/[\u0000-\u0019]/g, '') // 过滤unicode字符
    config[tplName]['branch'] = branch
    // 模板信息写入templates.json文件
    const templatesPath = path.resolve(__dirname, '../templates.json')
    console.log('templatesPath', templatesPath)
    fs.writeFile(templatesPath, JSON.stringify(config), 'utf-8', err => {
      if (err) chalk.red(err)
      console.log(chalk.green('模板添加成功！!\n'))
      console.log(chalk.grey('已添加模板列表如下: \n'))
      console.log(config)
      console.log('\n')
      process.exit()
    })
  })
}
