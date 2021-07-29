const axios = require('axios')
const token = "e72e186598a274dc7596a78c77f79abb28be49766d061c0bbf327c6ffdc55f304875e5932ccdbffd82e81";
const publicIds = [167298476, 161623929, 165420048, 180760688, 16057855, 149951497, 138789875, 62309918, 173437827, 107412143, 31528152, 152606132, 30049821, 93750603, 87945614];
const message = `

Привет, кратко и по делу, хороший сервер (локальный) с адекватным общением. Заходи к нам, это всё на сегодня
https://discord.gg/hMwkKsvHWJ
`;


function sendMessage(message, public_id) {
    axios.post(
        encodeURI(`https://api.vk.com/method/wall.post?v=5.62&attachments=https://discord.gg/hMwkKsvHWJ&owner_id=-${public_id}&message=${message}&access_token=${token}`),
        {
            headers: {
                "Authorization": `Bearer ${global.token}`
            }
        }).then(r => {
        console.log(`Пост успешно отправлен в сообщество https://vk.com/public${public_id}`)
    })
}

const timer = (ms) => new Promise((res) => {
    setTimeout(() => {
        res();
    }, ms)
})

async function sendTick() {
    for (const publicId of publicIds) {
        await timer(1500);
        sendMessage(message, publicId)
    }
}

async function startVKMessageApp() {
    await sendTick();
    setInterval(async () => {
        await sendTick();
    }, 1000 * 60 * 4, true)
}


startVKMessageApp();

//
