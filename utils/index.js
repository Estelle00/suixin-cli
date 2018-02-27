/**
 * Created by liubingwen on 2018/2/27.
 */
const Table = require('cli-table')
const chalk = require('chalk')
const table = new Table({
  head: ['Template Name', 'Owner/Name', 'Branch'],
  style: {
    head: ['green']
  }
})
const listTable = (tplList, lyric) => {
  const list = Object.keys(tplList)
  if (list.length > 0) {
    list.forEach(key => {
      const templateName = key
      const name = tplList[key]['owner/name']
      const branch = tplList[key]['branch']
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
module.exports = {
  listTable
}
