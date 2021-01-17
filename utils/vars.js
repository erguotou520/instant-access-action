const get = require('lodash.get')

const vars = {
  repositoryName: 'repository.name',
  branchName: 'ref',
  author: 'head_commit.committer.email',
  commitTime: 'head_commit.timestamp',
  commitMessage: 'head_commit.message',
  commitHash: 'after'
}

const prVars = {
  repositoryName: 'repository.name',
  branchName: 'pull_request.head.ref',
  author: 'pull_request.user.login',
  commitTime: 'pull_request.created_at',
  commitMessage: 'pull_request.title',
  commitHash: 'pull_request.head.sha'
}

// replace interpolation with github payload
module.exports = function (originStr, payload) {
  return originStr.replace(/\{\{[\w_.]+\}\}/g, function (matched) {
    const _var = matched.substr(2, matched.length - 4)
    // 区分pr和直接提交
    const valuePath = (payload.action === 'closed'  && payload.pull_request) ? prVars[_var] : payload.head_commit ? vars[_var] : null
    if (valuePath) {
      let ret = valuePath ? get(payload, valuePath) : matched
      console.log(`valuePath: ---> ${valuePath}`, ret)
      if (valuePath === 'ref') {
        // parse ref value
        ret = ret.replace(/^refs\/heads\//, '')
      }
      return ret
    } else {
      throw new Error('暂不支持的消息体')
    }
  })
}
