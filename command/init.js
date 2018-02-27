/**
 * Created by liubingwen on 2018/2/27.
 */
const exec = require('child_process').exec
const co = require('co')
const prompt = require('co-prompt')
const config = require('../templates')
const chalk = require('chalk')
module.exports = () => {
  co(function * () {
    // 处理用户输入
    const tplName = yield prompt('Template name: ')
    if (!config[tplName]) {
      console.log(chalk.red('\n x Template does not exit!'))
      process.exit()
    }
    const projectName = yield prompt('Project name: ')
    const gitUrl = config[tplName].url
    const branch = config[tplName].branch
    const cmdStr = `git clone ${gitUrl} ${projectName} && cd ${projectName} && git checkout ${branch}`
    console.log(chalk.white('\n Start generating...'))
    exec(cmdStr, (error, stdout, stderr) => {
      if (error) {
        console.log(error)
        process.exit()
      }
      console.log(chalk.green('\n √ Generation completed!'))
      console.log(`\n cd ${projectName} && yarn \n`)
      process.exit()
    })
  })
}
