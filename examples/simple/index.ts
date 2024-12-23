import { LineBotNotify } from "linebot-notify"

const channelAccessToken = '' // <-- Input channel access token here.

const main = async () => {
  const notify = new LineBotNotify({ channelAccessToken })
  const remainingQuota = await notify.push("LINE Bot Notify!")
  console.log(remainingQuota)
}

main()
