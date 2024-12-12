# LINE Bot Notify

### **English** | [**日本語**](README.ja.md)

A library for easily sending push notifications to LINE Bot  



## Install

```sh
npm install linebot-notify
```



## Usage

Create an instance by passing the LINE Bot channel access token as an argument.  
Then simply execute the push method with any message as an argument.  
Returns the remaining number of available pushes as the return value.  

```js
import { LineBotNotify } from "linebot-notify"

const main = async () => {
	const notify = new LineBotNotify({ channelAccessToken })
	const remainingQuota = await notify.push("LINE Bot Notify!")
	console.log(remainingQuota)
}
main()
```

### Constructor

Specify either a channel access token or a pair of channel ID and channel secret.  

```js
// Specify channel access token
const notify = new LineBotNotify({ channelAccessToken })

// Specify channel ID and channel secret
const notify = new LineBotNotify({ channelId, channelSecret })
```

### push(message, { to, notificationDisabled })

Optional parameters can be specified in addition to the message.  

|Parameter|Required|Type|Default|Description|
|:--|:-:|:-:|:-:|:--|
|message|✔|string|-|Specifies the message to send.|
|to||string \| string[] |`undefined`|Specifies the recipient(s).<br>For single recipient, specify a user ID or group ID. For multiple recipients, specify an array of user IDs.|
|notificationDisabled||boolean|`false`|When set to `true`, notifications will not be sent when sending messages.|

```js
// Send a message (broadcast)
await notify.push("LINE Bot Notify!")

// Send a message to a specific user or group
await notify.push("LINE Bot Notify!", { to: "<User ID or Group ID>" })

// Send a message to multiple users (multicast)
await notify.push("LINE Bot Notify!", { to: ["<User ID>", "<User ID>"] })

// Send a message without notifications
await notify.push("LINE Bot Notify!", { notificationDisabled: true })
```



## ライセンス

[**MIT**](LICENSE)


