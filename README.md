# Instant access（即时达推送） action

Use this action to push wechat message to youself or share message with channel.
使用该 action 来推送消息到你的微信上。

## Inputs

### `channel`

**Required** Instant access message channel. 通道 key

### `head`

**Required** Instant access message head. 消息头

### `body`

**Required** Instant access message body. 消息内容

## Outputs

### `time`

The time we send the request. 接口请求完成时间（不保证一定是微信消息到达时间）

## Example usage

```yml
uses: erguotou520/instant-access-action@v1
with:
  channel: "d255d62caef24a3bb66c3465dad70407"
  head: "Test message"
  body: "Test content"
```

Or you can use interpolation message

```yml
uses: erguotou520/instant-access-action@v1
with:
  channel: "d255d62caef24a3bb66c3465dad70407"
  head: "{{repositoryName}} push status"
  body: '{{author}} commit "{{commitMessage}}" on {{repositoryName}}#{{branchName}} branch at {{commitTime}} with hash {{commitHash}}'
```
