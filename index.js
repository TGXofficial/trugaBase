const VK = require("VK-Promise"),
	  vk = new VK("тут_токен"),
	  request = require('request'),
	  https = require('https'),
	  fs = require("fs"),
	  setts = require("./config/settings.json");

vk.longpoll.start();

var developer = setts.developerID;

vk.on("message", async function (event, msg) {
	cmds.map(function (cmd, i) { 
    	if(!cmd.r.test(msg.body))return;
        console.log(new Date().toLocaleTimeString(), "@id" + msg.from_id, msg.chat_id ? "c" + msg.chat_id : "", "cmd#" + i, msg.body);
		var args = msg.body.match(cmd.r);
    	args[0] = msg; 
      	if(cmd.level == 1 && msg.from_id != developer) return msg.send("Вы не девелопер!");
        cmd.f.apply(cmd,args); 
        msg.sended = true;
	});
});

var cmds = fs.readdirSync("./commands").filter(x => x.endsWith(".js")).map(x => require("./commands/" + x));

if(setts.autostatus == true) {
	var uptime = 0;
	setInterval(() => {
		uptime += 1;
	  	vk.status.set({
	  		text: "Бот работает " + uptime + " минут."
		});
	}, 60000);
}

if(setts.autoaccept == true) {
	setInterval(() => {
	  	vk.friends.getRequests({
	  		out: 1
	  	})
	  	.then((res) => {
	  		if(!res.items[0]) return;
	  		vk.friends.delete({user_id: items[0]});
	  	});
	  	vk.friends.getRequests({
	  		out: 0
	  	})
	  	.then((res) => {
	  		if(!res.items[0]) return;
	  		vk.friends.add({user_id: items[0]});
	  	});
	}, 120000)
}

process.on("uncaughtException", (e) => console.error("uncaughtException", e.stack, e));
process.on('unhandledRejection', (e) => console.error("unhandledRejection", e.stack, e));