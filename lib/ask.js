/**
 * Created by liubingwen on 2018/2/28.
 */
const async = require('async')
const {prompt} = require('inquirer')
module.exports = (prompts, data, done) => {
  async.eachSeries(Object.keys(prompts), (key, next) => {
    promptFn(data, key, prompts[key], next)
  }, done)
}
const promptFn = (data, key, promptData, done) => {
  const {type, message, label, choices, validate = () => true} = promptData
  const promptDefault = promptData.default
  prompt([
    {
      type,
      name: key,
      message: message || label || key,
      choices,
      validate,
      default: promptDefault
    }
  ]).then(answers => {
    const answer = answers[key]
    if (Array.isArray(answer)) {
      data[key] = {}
      answer.forEach(item => {
        data[key][item] = true
      })
    } else {
      data[key] = answer
    }
    done()
  }).catch(done)
}
