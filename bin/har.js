#!/usr/bin/env node
const {resolve, join} = require('path')
process.env.NODE_PATH = join(__dirname, '../node_modules/')
const program = require('commander')

program
  .version(require('../package').version)
  .usage('<command> [options]')
program
  .command('add')
  .description('添加一个新的模板！')
  .alias('a')
  .action(() => {
    console.log(`add a template start`)
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
  .command('init [project-name]')
  .description('初始化一个新的项目！')
  .alias('i')
  .action((project) => {
    require('../command/init')(project)
  })

program
  .command('delete')
  .description('删除一个模板！')
  .alias('d')
  .action(() => {
    require('../command/delete')
  })
program
  .parse(process.argv)
if (!program.args.length) {
  program.help()
}
