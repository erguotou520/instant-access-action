const core = require('@actions/core');
const github = require('@actions/github');
const http = require('http')

try {
  const channel = core.getInput('channel');
  const head = core.getInput('head');
  const body = core.getInput('body');
  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`);
  http.get(`http://push.ijingniu.cn/send?key=${channel}&head=${head}&body=${body}`, (res) => {
    if (res.complete && res.statusCode < 300 && res.statusCode >= 200) {
      core.setOutput('time', new Date().toLocaleDateString())
    } else {
      core.setFailed(res.statusMessage);
    }
  })
} catch (error) {
  core.setFailed(error.message);
}
