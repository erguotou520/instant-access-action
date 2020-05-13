const get = require('lodash.get')

const vars = {
  repositoryName: 'repository.name',
  branchName: 'ref',
  author: 'head_commit.committer.email',
  commitTime: 'head_commit.timestamp',
  commitMessage: 'head_commit.message',
  commitHash: 'after'
}

// replace interpolation with github payload
module.exports = function (originStr, payload) {
  return originStr.replace(/\{\{[\w_.]+\}\}/g, function (matched) {
    const _var = matched.substr(2, matched.length - 4)
    const valuePath = vars[_var]
    let ret = valuePath ? get(payload, valuePath) : matched
    if (valuePath === 'ref') {
      // parse ref value
      ret = ret.replace(/^refs\/heads\//, '')
    }
    return ret
  })
}
