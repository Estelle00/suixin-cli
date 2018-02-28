/**
 * Created by liubingwen on 2018/2/27.
 */
const { prompt } = require('inquirer')
const exists = require('fs').existsSync
const rm = require('rimraf').sync
const home = require('user-home')
const path = require('path')
const chalk = require('chalk')
const download = require('download-git-repo')
const ora = require('ora')
const tplList = require('../templates')
const {getGitList} = require('../lib/index')
const generate = require('../lib/generate')
const errorLog = (lyric) => {
  chalk.red(lyric)
  process.exit()
}
module.exports = async (project) => {
  if (!project) errorLog('请输入需要创建的项目名称！')
  const gitList = await getGitList()
  const newList = {...gitList, ...tplList}
  const choices = Object.keys(newList)
  const questions = [
    {
      type: 'list',
      name: 'name',
      message: '请选择需要生成的模板：',
      choices: choices
    }
    /*
    {
      type: 'input',
      name: 'place',
      message: '请输入初始化项目路径：',
      default: '../'
    }
    */
  ]
  prompt(questions).then(({name, place}) => {
    const gitPlace = newList[name]['owner/name']
    const gitBranch = newList[name]['branch']
    const tmp = path.join(home, '.har-templates', name.replace(/[/:]/g, '-'))
    const spinner = ora('模板下载中...')
    spinner.start()
    if (exists(tmp)) rm(tmp)
    download(`${gitPlace}#${gitBranch}`, tmp, {clone: true}, err => {
      spinner.stop()
      if (err) {
        console.log(chalk.red(err))
        process.exit()
      }
      generate(project, tmp, place = '.', err => {
        if (err) console.log(chalk.red(err))
        console.log(chalk.green('项目创建成功！'))
      })
    })
  })
}
