const request = require('../utils/request')

const mockPayload = {
  "after": "80fad45590808d214f854d357f224533f4a987b0",
  "ref": "refs/heads/master",
  "repository": {
    "name": "instant-access-action"
  },
  "head_commit": {
    "author": {
      "email": "erguotou525@gmail.com",
      "name": "erguotou",
      "username": "erguotou520"
    },
    "committer": {
      "email": "erguotou525@gmail.com",
      "name": "erguotou",
      "username": "erguotou520"
    },
    "distinct": true,
    "id": "80fad45590808d214f854d357f224533f4a987b0",
    "message": "update usage",
    "timestamp": "2020-05-13T15:33:20+08:00",
    "tree_id": "4785f709966421ae2ea2c52a91812f3975eda1b1",
    "url": "https://github.com/erguotou520/instant-access-action/commit/80fad45590808d214f854d357f224533f4a987b0"
  }
}

const channel = "d255d62caef24a3bb66c3465dad70407";
const head = 'Test message'
const body = '{{author}} commit "{{commitMessage}}" on {{repositoryName}}#{{branchName}} branch at {{commitTime}} with hash {{commitHash}} and not existed interpolation {{notExisted}}'
request(mockPayload, channel, head, body).then(() => {
  console.log('time', new Date().toISOString())
}).catch(err => {
  console.error(err);
})
