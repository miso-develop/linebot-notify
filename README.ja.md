# LINE Bot Notify

### [**English**](README.md) | **日本語**

LINE Botへ簡単にプッシュ通知を送るだけのライブラリです。  



## インストール

```sh
npm install linebot-notify
```



## 使い方

LINE Botのチャネルアクセストークンを引数としインスタンスを生成します。  
あとは任意のメッセージを引数としpushメソッドを実行するだけです。  
戻り値としてプッシュ可能残回数を返却します。  

```js
import { LineBotNotify } from "linebot-notify"

const main = async () => {
	const notify = new LineBotNotify({ channelAccessToken })
	const remainingQuota = await notify.push("LINE Bot Notify!")
	console.log(remainingQuota)
}
main()
```

### コンストラクタ

チャネルアクセストークンもしくはチャネルIDとチャネルシークレットのペアを指定します。  

```js
// チャネルアクセストークンを指定
const notify = new LineBotNotify({ channelAccessToken })

// チャネルID、チャネルシークレットを指定
const notify = new LineBotNotify({ channelId, channelSecret })
```

### push(message, { to, notificationDisabled })

メッセージ以外に任意のオプションを指定できます。  

|パラメーター|必須|型|既定値|内容|
|:--|:-:|:-:|:-:|:--|
|message|✔|string|-|送信するメッセージを指定します。|
|to||string \| string[] |`undefined`|送信先を指定します。<br>単一指定の場合はユーザーIDもしくはグループIDを、配列指定の場合はユーザーIDを指定します。|
|notificationDisabled||boolean|`false`|`true`を指定するとメッセージ送信時に通知を行いません。|

```js
// メッセージの送信（ブロードキャスト）
await notify.push("LINE Bot Notify!")

// ユーザーもしくはグループを指定してメッセージ送信
await notify.push("LINE Bot Notify!", { to: "<User ID or Group ID>" })

// 複数ユーザーを指定してメッセージ送信（マルチキャスト）
await notify.push("LINE Bot Notify!", { to: ["<User ID>", "<User ID>"] })

// ユーザーに通知されないようにメッセージ送信
await notify.push("LINE Bot Notify!", { notificationDisabled: true })
```



## ライセンス

[**MIT**](LICENSE)


