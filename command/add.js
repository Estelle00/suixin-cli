/**
 * Created by liubingwen on 2018/2/27.
 */
const {prompt} = require('inquirer')
const {writeTemplate} = require('../utils/index')
const tplList = require('../templates')
const {getGitList} = require('../utils/index')
const question = [
  {
    type: 'input',
    name: 'name',
    message: '请输入添加的模板名称：',
    async validate (val) {
      const gitList = await getGitList(false)
      const newList = {...gitList, tplList}
      if (newList[val]) {
        return '模板已经存在！'
      } else if (val === '') {
        return '模板名称不能为空！'
      }
      return true
    }
  },
  {
    type: 'input',
    name: 'place',
    message: '请添加owner/name：',
    validate (val) {
      if (val !== '') {
        return true
      }
      return '请填写owner/name！'
    }
  },
  {
    type: 'input',
    name: 'branch',
    message: '请填写git分支(master)：',
    default: 'master'
  }
]
module.exports = prompt(question).then(({name, place, branch}) => {
  tplList[name] = {}
  tplList[name]['owner/name'] = place
  tplList[name]['branch'] = branch
  writeTemplate(tplList, '新的模板添加成功！')
})
