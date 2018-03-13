module.exports = {
	r: /^\/повтори\s([^]+)/i,
	f: function (msg, params) {
		msg.reply(params);
	},
	description: "/повтори <текст>",
	level: 1
}