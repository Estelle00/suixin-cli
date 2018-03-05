/**
 * Created by liubingwen on 2018/2/27.
 */
const path = require('path')
const ROOT_PATH = path.resolve(__dirname, '../')
module.exports = {
  ROOT_PATH,
  TEMPLATES_PATH: path.resolve(ROOT_PATH, './templates.json'),
  cliTagUrl: 'http://192.168.3.239:4873/-/package/har-cli/dist-tags',
  templateUrl: 'http://192.168.3.200:10080/api/v4/groups/har-templates/projects?private_token=cuKAsR7EYcyJrmNGzmkX'
}
