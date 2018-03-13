// Можно подключить любой модуль/файл
const fs = require("fs"); // один из примеров - FS
const index = require("./index.js"); //подключили файл index.js из корня

// Экспортируем как модуль
module.exports = {
	r: /^\/test\s([^]+)/i,  // регулярное выражение, подробнее - regexp.com
	f: function (msg, prms) { //функция
		if(prms == "привет") { //определяет, что написано после /test - "привет" или "test"
			msg.reply("Привет!");
		} else if(prms == "test") {
			vk.status.set({text: prms});  //запрос к VK API
			return msg.send(`Статус ${prms} успешно установлен.`); //отправляет сообщение об удачной установке статуса
		}
	},
	description: "/test <текст> -- описание", //описание команды
	level:0 //если команда девелопера - 1, если нет - 0
}

// Можно указать дополнительные функции для работы команды
function () {
	console.log("Yep")
}