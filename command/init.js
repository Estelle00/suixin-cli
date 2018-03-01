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
const logger = require('../lib/logger')
const checkVersion = require('../lib/check-version')
module.exports = (project) => {
  const inPlace = (project === '.')
  const name = inPlace ? path.relative('../', process.cwd()) : project
  console.log('name', process.cwd())
  const to = path.resolve(name)
  if (inPlace || exists(to)) {
    prompt([{
      type: 'confirm',
      message: inPlace ? '确定在当前目录下创建项目吗？' : '当前目录已存在，是否继续？',
      name: 'ok'
    }]).then(({ok}) => {
      if (ok) {
        run(name, to)
      }
    }).catch(logger.fatal)
  } else {
    run(name, to)
  }
}

const run = async (project, to) => {
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
  ]
  prompt(questions).then(({name}) => {
    checkVersion(() => {
      const gitPlace = newList[name]['owner/name']
      const gitBranch = newList[name]['branch']
      const tmp = path.join(home, '.har-templates', name.replace(/[/:]/g, '-'))
      const spinner = ora('模板下载中...')
      spinner.start()
      if (exists(tmp)) rm(tmp)
      download(`${gitPlace}#${gitBranch}`, tmp, {clone: true}, err => {
        spinner.stop()
        if (err) logger.fatal(err)
        generate(project, tmp, to, err => {
          if (err) logger.fatal(err)
          logger.success('创建%s项目成功！', project)
        })
      })
    })

  })
}
const downloadAndGenerate = (template) => {

}
