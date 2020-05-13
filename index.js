const core = require('@actions/core');
const github = require('@actions/github');
const request = require('./utils/request');

try {
  const channel = core.getInput('channel');
  const head = core.getInput('head');
  const body = core.getInput('body');

  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`);
  request(github.context.payload, channel, head, body).then(() => {
    core.setOutput('time', new Date().toISOString())
  }).catch(err => {
    console.log(111)
    core.setFailed(err);
  })
} catch (error) {
  console.log(222)
  core.setFailed(error.message);
}
