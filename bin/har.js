#!/usr/bin/env node
const {resolve, join} = require('path')
process.env.NODE_PATH = join(__dirname, '../node_modules/')
const program = require('commander')

program
  .version(require('../package').version)

program
  .usage('<command>')

program
  .command('add')
  .description('添加一个新的模板！')
  .alias('a')
  .action(() => {
    require('../command/add')
  })

program
  .command('list')
  .description('列出所有可用模板！')
  .alias('l')
  .action(() => {
    require('../command/list')
  })

program
  .command('init')
  .description('初始化一个新的项目！')
  .alias('i')
  .action(() => {
    require('../command/init')
  })

program
  .command('delete')
  .description('删除一个模板！')
  .alias('d')
  .action(() => {
    require('../command/delete')
  })

program.parse(process.argv)

if (!program.args.length) {
  program.help()
}
