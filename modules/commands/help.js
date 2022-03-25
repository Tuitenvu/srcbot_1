module.exports.config = {
    name: "help",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "ManhG",
    description: "Các lệnh thường xuyên được sử dụng",
    commandCategory: "General",
    usages: "",
    cooldowns: 5,
};
module.exports.handleEvent = function({ api, event }) {
    const { commands } = global.client;
    if (!event.body) return;
    const { threadID, messageID, body } = event;

    if (body.indexOf("help") != 0) return;
    const splitBody = body.slice(body.indexOf("help")).trim().split(/\s+/);
    if (splitBody.length == 1 || !commands.has(splitBody[1].toLowerCase())) return;

    const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};
    const command = commands.get(splitBody[1].toLowerCase());

    const prefix = (threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : global.config.PREFIX;

    return api.sendMessage(`╭──────╮\n   ${command.config.name}\n╰──────╯\n📜Mô tả: ${command.config.description}\n\n❯📄 Cách sử dụng: ${prefix}${command.config.name} ${(command.config.usages) ? command.config.usages : ""}\n❯🌟 Thuộc nhóm: ${command.config.commandCategory}\n❯⏱ Thời gian chờ: ${command.config.cooldowns} giây(s)\n❯👥 Quyền hạn: ${((command.config.hasPermssion == 0) ? "Người dùng" : (command.config.hasPermssion == 1) ? "Quản trị viên" : "Người vận hành bot" )}\n❯ Prefix: ${prefix}\n✎﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏\n\n💥Điều hành bởi SuperTeam💥`, threadID, messageID);
};

module.exports.run = async function({ api, args, Users, event, Threads, utils, client }) {
    const { commands } = global.client;
    const { threadID, messageID } = event;
    const command = commands.get((args[0] || "").toLowerCase());
    const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};
    if (!command) {
        const command = commands.values();
        var vip = ``;
        return api.sendMessage(vip + "🎭Sử dụng !menu để xem toàn bộ lệnh trên bot này", event.threadID, event.messageID);
    }
    const prefix = (threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : global.config.PREFIX;
    return api.sendMessage(`╭──────╮\n   ${command.config.name}\n╰──────╯\n📜Mô tả: ${command.config.description}\n\n❯📄 Cách sử dụng: ${prefix}${command.config.name} ${(command.config.usages) ? command.config.usages : ""}\n❯🌟 Thuộc nhóm: ${command.config.commandCategory}\n❯⏱ Thời gian chờ: ${command.config.cooldowns} giây(s)\n❯👥 Quyền hạn: ${((command.config.hasPermssion == 0) ? "Người dùng" : (command.config.hasPermssion == 1) ? "Quản trị viên" : "Người vận hành bot" )}\n❯ Prefix: ${prefix}\n✎﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏\n\n💥Điều hành bởi ThanhVu💥`, threadID, messageID);
};