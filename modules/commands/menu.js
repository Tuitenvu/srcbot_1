module.exports.config = {
	name: "menu",
	version: "1.0.2",
	hasPermssion: 0,
	credits: "Mirai Team",
	description: "Hướng dẫn cho người mới",
	commandCategory: "system",
	usages: "[Tên module]",
	cooldowns: 5,
	envConfig: {
		autoUnsend: true,
		delayUnsend: 10
	}
};

module.exports.languages = {
	"vi": {
		"moduleInfo": "「 %1 」\n%2\n\n❯ Cách sử dụng: %3\n❯ Thuộc nhóm: %4\n❯ Thời gian chờ: %5 giây(s)\n❯ Quyền hạn: %6\n\n» Module code by %7 «",
		"helpList": '[ Hiện tại đang có %1 lệnh có thể sử dụng trên bot này, Sử dụng: "%2help nameCommand" để xem chi tiết cách sử dụng! ]"',
		"user": "Người dùng",
        "adminGroup": "Quản trị viên nhóm",
        "adminBot": "Quản trị viên bot"
	},
	"en": {
		"moduleInfo": "「 %1 」\n%2\n\n❯ Usage: %3\n❯ Category: %4\n❯ Waiting time: %5 seconds(s)\n❯ Permission: %6\n\n» Module code by %7 «",
		"helpList": '[ There are %1 commands on this bot, Use: "%2help nameCommand" to know how to use! ]',
		"user": "User",
        "adminGroup": "Admin group",
        "adminBot": "Admin bot"
	}
};

module.exports.handleEvent = function ({ api, event, getText }) {
	const { commands } = global.client;
	const { threadID, messageID, body } = event;

	if (!body || typeof body == "undefined" || body.indexOf("help") != 0) return;
	const splitBody = body.slice(body.indexOf("help")).trim().split(/\s+/);
	if (splitBody.length == 1 || !commands.has(splitBody[1].toLowerCase())) return;
	const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};
	const command = commands.get(splitBody[1].toLowerCase());
	const prefix = (threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : global.config.PREFIX;
	return api.sendMessage(getText("moduleInfo", command.config.name, command.config.description, `${prefix}${command.config.name} ${(command.config.usages) ? command.config.usages : ""}`, command.config.commandCategory, command.config.cooldowns, ((command.config.hasPermssion == 0) ? getText("user") : (command.config.hasPermssion == 1) ? getText("adminGroup") : getText("adminBot")), command.config.credits), threadID, messageID);
}

module.exports. run = function({ api, event, args, getText}) {
	const { commands } = global.client;
	const { threadID, messageID } = event;
	const command = commands.get((args[0] || "").toLowerCase());
	const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};
	const { autoUnsend, delayUnsend } = global.configModule[this.config.name];
	const prefix = (threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : global.config.PREFIX;

  
	if (!command) {
		const arrayInfo = [];
		const page = parseInt(args[0]) || 1;
    const numberOfOnePage = 20;
    let i = 0;
    let msg =    "    🌺Danh sách lệnh🌺  \n-----------------------------\n";
    
    for (var [name, value] of (commands)) {
      name += `: ${value.config.description}`;
      arrayInfo.push(name);
    }

    arrayInfo.sort((a, b) => a.data - b.data);
    
    const startSlice = numberOfOnePage*page - numberOfOnePage;
    i = startSlice;
    const returnArray = arrayInfo.slice(startSlice, startSlice + numberOfOnePage);
    
    for (let item of returnArray) msg += `🌺 ${++i}. 🐉 ${item}\n`;
    
    const randomText = ["Bạn rất cute","Bạn rất ngu", "Bạn đã biết","bạn rất dâm","Tôi yêu tôi?","Tôi cute như chủ của tôi?","em luôn đẹp nhất khi em cười","bot rất lỏd","khi nào bạn chết","Có em đời tôi bỗng vui","This world is dull, but it has you","Cảm xúc chúng ta có thể giống nhau","Không nên buồn vì một người không đáng","có người đang ở trên đầu bạn","không nên tiêu cực quá mức","tiêu cực thì đáng được yêu thương, còn tiêu cực quá mức thì rất phiền!!","bạn đang thở","bạn đang sống một cách vô vị","không nên tâm sự với những người bạn xã giao","không nên đưa ra quyết định khi đang nóng giận","nóng giận là bản năng, kiềm chế được mới là bản lĩnh","không nên quá ảo tưởng vị trí của mình trong tâm trí người nào đó","fact này rất vô vị","tôi sẽ vui vì bạn đọc cái này","học không phải là con đường duy nhất đến thành công mà là con đường ngắn nhất","không ai sống cho bạn vì thế đừng đối xử với ai hết mình ngoài gia đình","bạn không hoàn hảo nhất nhưng là thứ không có bản sao"];
    const text = `\nTrang (${page}/${Math.ceil(arrayInfo.length/numberOfOnePage)})\nGõ: "${prefix}menu <tên lệnh>" để biết thêm chi tiết về lệnh đó\n🍩Hiện tại có ${arrayInfo.length} lệnh trên bot\n🤤 Dùng ${prefix}help <Số trang>\n-----------------------------\n[ Fact ] : ${randomText[Math.floor(Math.random()*randomText.length)]}`;
    return api.sendMessage(msg + "" + text, threadID, async (error, info) => {
			if (autoUnsend) {
				await new Promise(resolve => setTimeout(resolve, delayUnsend * 1000));
				return api.unsendMessage(info.messageID);
			} else return;
		});
	}

	return api.sendMessage(getText("moduleInfo", command.config.name, command.config.description, `${prefix}${command.config.name} ${(command.config.usages) ? command.config.usages : ""}`, command.config.commandCategory, command.config.cooldowns, ((command.config.hasPermssion == 0) ? getText("user") : (command.config.hasPermssion == 1) ? getText("adminGroup") : getText("adminBot")), command.config.credits), threadID, messageID);
};