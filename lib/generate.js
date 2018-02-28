/**
 * Created by liubingwen on 2018/2/28.
 */
const {join, resolve} = require('path')
const getOptions = require('./options')
const Metalsmith = require('metalsmith')
const ask = require('./ask')
module.exports = (name, src, dest, done) => {
  const opts = getOptions(name, src)
  // 模版目录
  const metalsmith = Metalsmith(join(src, 'template'))
  const data = Object.assign(metalsmith.metadata(), {
    destDirName: name,
    inPlace: dest === process.cwd()
  })
  metalsmith.use(askQuestions(opts.prompts))
  metalsmith.clean(false)
    .source('.') // start from template root instead of `./src` which is Metalsmith's default for `source`
    .destination(dest)
    .build((err, files) => {
      done(err)
    })
  return data
}
const askQuestions = (prompts) => {
  return (files, metalsmith, done) => {
    ask(prompts, metalsmith.metadata(), done)
  }
}
