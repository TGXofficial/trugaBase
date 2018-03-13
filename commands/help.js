const fs = require("fs")

module.exports = {
	r: /^\/(?:help|помощь)/i,
	f: function (msg) {
		msg.send("Все доступные команды:\n" + cmds.map(x => "📗 " + x.description).join("\n"));
	},
	description: "/help -- список всех команд",
	level: 0
}

var cmds = fs.readdirSync("./commands").filter(x => x.endsWith(".js")).map(x => require("./" + x));