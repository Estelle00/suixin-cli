const request = require('request')
const semver = require('semver')
const chalk = require('chalk')
const packageConfig = require('../package.json')

module.exports = done => {
  // Ensure minimum supported node version is used
  if (!semver.satisfies(process.version, packageConfig.engines.node)) {
    return console.log(chalk.red(
      '  You must upgrade node to >=' + packageConfig.engines.node + '.x to use vue-cli'
    ))
  }

  request({
    url: 'http://192.168.3.239:4873/-/verdaccio/search/har-cli',
    timeout: 1000
  }, (err, res, body) => {
    if (!err && res.statusCode === 200) {
      const data = JSON.parse(body)
      if (data && data.length > 0) {
        const {version} = data[0]
        const localVersion = packageConfig.version
        if (semver.lt(localVersion, version)) {
          console.log(chalk.yellow(' har-cli 有一个新版本更新！！！'))
          console.log('  latest:    ' + chalk.green(version))
          console.log('  installed: ' + chalk.red(localVersion))
        }
      }
    }
    done()
  })
}
