module.exports.config = {
    name: "hacker",
    version: "0.0.1",
    hasPermssion: 0,
    credits: "Drasew",
    description: "Art mặt hacker",
    commandCategory: "Art",
    cooldowns: 10
};

module.exports.run = function ({ api, event }) {
    const data = ["▇◤▔▔▔▔▔▔▔◥▇\n▇▏◥▇◣┊◢▇◤▕▇\n▇▏▃▆▅▎▅▆▃▕▇\n▇▏╱▔▕▎▔▔╲▕▇\n▇◣◣▃▅▎▅▃◢◢▇\n▇▇◣◥▅▅▅◤◢▇▇\n▇▇▇◣╲▇╱◢▇▇▇"
    ];
    return api.sendMessage(`${data[Math.floor(Math.random() * data.length)]}`, event.threadID, event.messageID);
}