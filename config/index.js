/**
 * Created by liubingwen on 2018/2/27.
 */
const path = require('path')
const ROOT_PATH = path.resolve(__dirname, '../')
module.exports = {
  ROOT_PATH,
  TEMPLATES_PATH: path.resolve(ROOT_PATH, './templates.json')
}
