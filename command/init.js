/**
 * Created by liubingwen on 2018/2/27.
 */
/*
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
*/
const { prompt } = require('inquirer')
const { writeFile } = require('fs')
const { listTable } = require('../utils')
const { resolve } = require('path')
const chalk = require('chalk')
const download = require('download-git-repo')
const ora = require('ora')
const tplList = require('../templates')
const questions = [
  {
    type: 'input',
    name: 'name',
    message: '请输入需要的模板名称：',
    validate (val) {
      if (val === '') {
        return '模板名称不能为空！'
      } else if (tplList[val]) {
        return true
      }
      return '您输入的模板不存在！'
    }
  },
  {
    type: 'input',
    name: 'project',
    message: '请输入项目名称：',
    validate (val) {
      if (val === '') {
        return '项目名称不能为空！'
      }
      return true
    }
  },
  {
    type: 'input',
    name: 'place',
    message: '请输入初始化项目路径：',
    default: './'
  }
]
module.exports = prompt(questions).then(({name, project, place}) => {
  const gitPlace = tplList[name]['owner/name']
  const gitBranch = tplList[name]['branch']
  const spinner = ora('模板下载中...')
  spinner.start()
  download(`${gitPlace}#${gitBranch}`, `${place}${project}`, err => {
    if (err) {
      console.log(chalk.red(err))
      process.exit()
    }
    spinner.stop()
    console.log(chalk.green('项目初始化成功！'))
  })
})
