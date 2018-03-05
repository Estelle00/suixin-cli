/**
 * Created by liubingwen on 2018/2/28.
 */
const {join, resolve} = require('path')
const fs = require('fs')
const chalk = require('chalk')
const async = require('async')
const {render} = require('consolidate').handlebars
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
    .use(renderTemplateFiles())
  metalsmith.clean(false)
    .source('.') // start from template root instead of `./src` which is Metalsmith's default for `source`
    .destination(dest)
    .build((err, files) => {
      done(err)
      if (typeof opts.complete === 'function') {
        const helpers = { chalk, files }
        opts.complete(data, helpers)
      } else {
        logMessage(opts.completeMessage, data)
      }
    })
  return data
}
const askQuestions = (prompts) => {
  return (files, metalsmith, done) => {
    ask(prompts, metalsmith.metadata(), done)
  }
}

const renderTemplateFiles = () => {
  return (files, metalsmith, done) => {
    const keys = Object.keys(files)
    const data = metalsmith.metadata()
    async.each(keys, (key, next) => {
      const str = files[key].contents.toString()
      if (!/{{([^{}]+)}}/g.test(str)) {
        return next()
      }
      render(str, {...data, noEscape: true}, (err, res) => {
        if (err) {
          err.message = `[${key}] ${err.message}`
          return next(err)
        }
        if (key === '.easy-mock.js' && !data.easymock) {
          delete files[key]
          delete data.easymock
        } else {
          files[key].contents = Buffer.from(res)
        }
        next()
      })
    }, done)
  }
}
/**
 * Display template complete message.
 *
 * @param {String} message
 * @param {Object} data
 */

function logMessage (message, data) {
  if (!message) return
  render(message, data, (err, res) => {
    if (err) {
      console.error('\n   Error when rendering template complete message: ' + err.message.trim())
    } else {
      console.log('\n' + res.split(/\r?\n/g).map(line => '   ' + line).join('\n'))
    }
  })
}
