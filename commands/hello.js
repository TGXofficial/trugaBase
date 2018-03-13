module.exports = {
	r: /^\/(привет|ку|qq|здрасьте)/i,
	f: function (msg, params) {
		vk.users.get({
			user_ids: msg.from_id
		})
		.then((user) => {
			return msg.send(`Привет ${user[0].first_name}, я чат-бот, если хочешь узнать мои возможности, пропиши: /команды`);
		})
	},
	description: "привет -- приветствие",
	admin: 0
}