/**
 * Created by liubingwen on 2018/2/27.
 */
const Table = require('cli-table')
const request = require('request')
const {writeFile} = require('fs')
const ora = require('ora')
const chalk = require('chalk')
const {TEMPLATES_PATH, templateUrl} = require('../config/index')
const table = new Table({
  head: ['Template Name', 'Owner/Name', 'Branch'],
  style: {
    head: ['green']
  }
})
let gitList = null
const getGitList = (show = true) => {
  if (gitList) return gitList
  const spinner = ora('查询模板中...')
  if (show) {
    spinner.start()
  }
  return new Promise((resolve, reject) => {
    request({
      headers: {
        'User-Agent': 'suixin-cli'
      },
      url: templateUrl
    }, (err, res, body) => {
      spinner.stop()
      if (err) reject(err)
      const data = JSON.parse(body)
      const arr = {}
      data.forEach(item => {
        // eslint-disable-next-line camelcase
        const {name, html_url, default_branch} = item
        arr[name] = {
          'owner/name': html_url.replace('https://github.com/', ''),
          'branch': default_branch
        }
      })
      gitList = arr
      resolve(arr)
    })
  })
}
const listTable = async (tplList, lyric) => {
  const gitList = await getGitList()
  const newList = {...gitList, ...tplList}
  const list = Object.keys(newList)
  if (list.length > 0) {
    list.forEach(key => {
      const templateName = key
      const name = newList[key]['owner/name']
      const branch = newList[key]['branch']
      table.push([templateName, name, branch])
      if (table.length === list.length) {
        log(lyric)
      }
    })
  } else {
    log(lyric)
  }
}
function log (lyric) {
  console.log(table.toString())
  if (lyric) {
    console.log(chalk.green(`\u2714 ${lyric}`))
  }
  process.exit()
}
const writeTemplate = (tplList, lyric) => {
  writeFile(TEMPLATES_PATH, JSON.stringify(tplList), 'utf-8', err => {
    if (err) console.log(err)
    listTable(tplList, lyric)
  })
}
module.exports = {
  listTable,
  writeTemplate,
  getGitList
}
