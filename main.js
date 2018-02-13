const Discord = require('discord.js');
const money = require('discord-money');
const moment = require('moment');
const sql = require('sqlite');
var Webhook = require("webhook-discord")
var MD5 = require("crypto-js/md5");
var SHA256 = require("crypto-js/sha256");
let price = require('crypto-price')
const bot = new Discord.Client();
var http = require('http');
var prefix = "<"
var adminprefix = "<!"
var OWNERID = "your id"
var OWNERID2 = "2nd owner id"
var OWNERID3 = "3e owner id"
const config = require("./config.json");
bot.login(config.token);
var score = sql.open("./score.sqlite");
var hook = new Webhook("your webhook url without token" + config.hooktoken)

bot.on('ready', () => {
		hook.success("Xenohook", bot.user.username + " online !");
		hook.info("Xenohook", bot.users.size + " users in " + bot.channels.size + " channels of " + bot.guilds.size + " guilds !");
		console.log(bot.user.username + " en ligne !");
		console.log(bot.users.size + " users in " + bot.channels.size + " channels of " + bot.guilds.size + " guilds !");
		bot.user.setGame("<help " + bot.users.size + " users / " + bot.guilds.size + " guilds !");
		bot.user.setUsername("Insert Username of the bot");
});

bot.on('guildCreate', guild => {
	hook.info("Xenohook", 'New guild: ' + guild.name + ' (id: ' + guild.id + '), ' + guild.memberCount + ' members! owner is ' + guild.owner);
	console.log('New guild: ' + guild.name + ' (id: ' + guild.id + '), ' + guild.memberCount + ' members! owner is ' + guild.owner);
	bot.user.setGame("<help " + bot.users.size + " users / " + bot.guilds.size + " guilds !");
});
bot.on("guildDelete", guild => {
	console.log('I was removed of : ' + guild.name + ' (id: ' + guild.id + ')');
	hook.info("Xenohook", 'I was removed of : ' + guild.name + ' (id: ' + guild.id + ')');
	bot.user.setGame("<help " + bot.users.size + " users / " + bot.guilds.size + " guilds !");
});

bot.on('message', message => {
	if (message.author.bot) return;
	let args = message.content.split(' ').slice(1);
	var argresult = args.join(' ');

	if(message.content.startsWith(prefix+'ping')) {
		message.react('🏓')
		message.channel.send(`:ping_pong: \`${Date.now() - message.createdTimestamp} ms\``);
	}
	if (message.content.startsWith(adminprefix + 'setgame')) {
		if (message.author.id != OWNERID && message.author.id != OWNERID2 && message.author.id != OWNERID3) {
			message.reply("You arent bot owner :/")
		}if (message.author.id === OWNERID) {
			bot.user.setGame(argresult);
			bot.user.setStatus("online");
			message.reply("Game changed !");
		}if (message.author.id === OWNERID2) {
			bot.user.setGame(argresult);
			bot.user.setStatus("online");
			message.reply("Game changed !");
		}if (message.author.id === OWNERID3) {
			bot.user.setGame(argresult);
			bot.user.setStatus("online");
			message.reply("Game changed !");
		}
}
	if (message.content.startsWith(prefix + 'messtodev')) {
			message.reply("Message sent !!");
			const sayMessage = args.join(" ");
			hook.info("Xenohook (messtodev)", message.author.displayName + " (id: " + message.author.id + ") said " + sayMessage);
}
if (message.content.startsWith(prefix + '8ball')) {
	var truc = ["<:8ball:404631321651052545> I can't say anything", "<:8ball:404631321651052545> It seems like yes...", "<:8ball:404631321651052545> Everything say no...", "<:8ball:404631321651052545> visibly, yes", "<:8ball:404631321651052545> no !"];
	var truc2 = Math.floor(Math.random()*truc.length);
	message.reply(truc[truc2])
}
	if (message.content.startsWith(prefix + 'help')) {
				const embed = new Discord.RichEmbed()
					embed.setTitle('Help !')
					embed.setAuthor('EmoteCord Bot')
					embed.setColor(0x00AE86)
					embed.setDescription('by Xen#0190')
					embed.setFooter('EmoteCord Bot v2.3', 'https://image.freepik.com/icones-gratuites/point-d-39-interrogation-dans-un-cercle_318-27276.jpg')
					embed.setImage('https://media.istockphoto.com/vectors/question-mark-drawing-vector-id537535590')
					embed.setThumbnail('https://images-ext-1.discordapp.net/external/pE4AtAycH79mPYD5rK1f5BozWKnNSyqiPcqIBzkPpxc/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/196668513601978369/1c30c546addb15d82e15523b306c955c.jpg?width=250&height=250')
					embed.setTimestamp()
					embed.addField('Fun <:thumbsup:404608153674711040>', '<8ball, an 8ball command')
					embed.addField('Other <:question:404607834958069770>', '<ping, ping the bot\n<messtodev, send message to Xen\n<invite, invite the bot\n<serverinfo, give info about the server\n<EmoteCord, give an invite for EmoteCord\n<support, get an invite to the support server', true)
					embed.addField('Mods <:oncoming_police_car:404607672172937218>', '<kick, kick\n<ban, ban', true);
					embed.addField('Crypto <:lock:405711204971970571>', "<btc, give BTC price\n<eth, give ETH price\n<xmr, give XMR price\n<ltc, give LTC price\n<md5, encrypt your text with md5\n<sha256, encrypt your text with sha256", true);
					embed.addField('Level/Money <:speech_left:405712671804227584>', '<profile, give your profile\n<daily, give your daily 500๖̶̶̶ζ͜͡Cr \nMoney exchange are impossible', true);
					embed.addField('Other Language <:flag_fr:409768694822993942>', '<help 2, give international commands', true);
					embed.addField('Infos <:information_source:404625019088535554>', 'Bot dev with Discord.js 11.0/NodeJS 9.4.0', true);
				message.reply({embed});
	}
	if (message.content.startsWith(prefix + 'botinfo')) {
		const embed = new Discord.RichEmbed()
		embed.setTitle("Bot Info")
		embed.addField("Users", bot.users.size)
		embed.addField("Guilds", bot.guilds.size)
		embed.addField("Channels", bot.channels.size)
		message.reply({embed})
	}
	if (message.content.startsWith(prefix + 'help 2')) {
		const embed = new Discord.RichEmbed()
			embed.setTitle('Help !')
			embed.setAuthor('EmoteCord Bot')
			embed.setColor(0x00AE86)
			embed.setDescription('by Xen#0190')
			embed.setFooter('EmoteCord Bot v2.3', 'https://image.freepik.com/icones-gratuites/point-d-39-interrogation-dans-un-cercle_318-27276.jpg')
			embed.setImage('https://media.istockphoto.com/vectors/question-mark-drawing-vector-id537535590')
			embed.setThumbnail('https://images-ext-1.discordapp.net/external/pE4AtAycH79mPYD5rK1f5BozWKnNSyqiPcqIBzkPpxc/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/196668513601978369/1c30c546addb15d82e15523b306c955c.jpg?width=250&height=250')
			embed.setTimestamp()
			embed.addField('FR <:flag_fr:409768694822993942>', '<frexcuse, donne une excuse Naheulbeukesque')
			embed.addField('Infos <:information_source:404625019088535554>', 'Bot dev with Discord.js 11.0/NodeJS 9.4.0', true);
		message.reply({embed});
}
	if (message.content.startsWith(prefix + 'emotecord')) {
		message.channel.send("EmoteCord : https://discord.gg/QCNzekJ do <support to have the support server")
	}
	if (message.content.startsWith(prefix + 'support')) {
		message.channel.send("Support server : https://discord.gg/ExwXSWS do <emotecord to have emotecord server")
	}
	if (message.content.startsWith(prefix + 'frexcuse')) {
			var maissuite = ['un zombie', 'le troll érudit', "l'un des gardiens", 'un rat mutant', 'l\'aubergiste', 'le bourreau ivre', 'un menestrel moche', 'un orque d\'élite', 'le sorcier stagiaire', 'un type suspect', 'le prisonnier barbu', 'l\'herboriste',  'le chien d\'un voisin', 'un garde de la ville', 'un colporteur', 'un aventurier', 'le plombier', 'l\'ingénieur gobelin', 'un vieux fou'];
			var maissuiterdm = Math.floor(Math.random()*maissuite.length);
			var maissuite2 = ['a glissé', 'a dérapé', 'a cassé un bidule', 'a brisé un truc', 'a vomi', 'a perdu ses clefs', 'a fait ses besoins', 'était bloqué', 's\'est perdu', 'est tombé', 's\'est endormi', 'a passé la nuit', 's\'est réveillé', "s'est tué", "s'est fait mal", "a trébuché", 'était coincé', "s'est battu", "a causé des ennuis", "a mis le feu"];
			var maissuiterdm2 = Math.floor(Math.random()*maissuite2.length);
			var maissuite3 = ['la cave', 'le souterrain nord', 'le grenier', 'mon bureau', 'la remise a ingrédient', 'les cuisines', 'la niche des chiens', 'la volière a corbeaux', 'la fosse a scorpions', 'votre bureau', 'l\'escalier du 2e niveau', 'le bac de limon glaireux', 'le couloir principal', 'le hangar de bricolage', 'l\'atelier de forge', 'la salle de fouettage', 'le dortoir des orques', 'l\'antre du Golbargh', 'le magasin', 'votre bibliotheque'];
			var maissuiterdm3 = Math.floor(Math.random()*maissuite3.length);
			var maissuite4 =['de cette bête', 'de cette stupide', 'd\'une grosse', 'd\'une infame', "d'une étrange", "d'une incroyable", "de l'improbable", "de la fameuse", "de cette imbécile de", "c'est ballot, de la", "de l'existence d'une", "de l'embûche causée par une", "de la présence de cette", "vous allez rire, d'une", "c'est bien dommage, de la", "de la position d'une", "de son penchant pour une", "d'une médiocre"];
			var maissuiterdm4 = Math.floor(Math.random()*maissuite4.length);
			var maissuite5 =["brouette rouillée", "manivelle tordu", "scie abimé", "bassine oubliée", "clé de douze", "corbeille de linge", "hallebarde tordue", "chouette empaillé" ,"terrine piégée", "flûte empoisonnée", "tête de goule", "faux venimeuse", "guitare disloquée", "bielle biscornue", "salière brisé", "peau de banane", "perruque décrépité", "chaussette rouge", "babouche verte", "pantoufle usée"];
			var maissuiterdm5 = Math.floor(Math.random()*maissuite5.length);
			var maissuite6 =["venait de ma grand-mère", "était justement la", "est apparue comme par magie", "venait de mon cousin", "avait été abandonnée", "était suspecte", "n'aurait pas du ce trouver la", "avait justement l'air fourbe", "était dans l'ombre", "n'avait l'air de rien", "a été laissé par un voisin", "était bel et bien dangeureuse", "était pourtant chère", "avait une odeur inquiétante", "avait changé de place", "aurait du être rangée", "vous appartient", "s'est révélée glissante", "était peut-etre a moi", "pose toujours des problèmes"];
			var maissuiterdm6 = Math.floor(Math.random()*maissuite6.length);
			message.channel.sendMessage("Alors, misérable ?! Tu as encore échoué ! Que s'est-il passé cette fois ?")
			message.channel.sendMessage("Je suis désolé, maître... C'est parce que **"  + maissuite[maissuiterdm] + "** **" +  maissuite2[maissuiterdm2] + "** dans **" + maissuite3[maissuiterdm3] + "** et tout ça a cause **" + maissuite4[maissuiterdm4]  + "** **" + maissuite5[maissuiterdm5] + "** qui **" + maissuite6[maissuiterdm6] + "** donc c'est pas ma faute\n\nidée original de PoC (http://naheulbeuk.com/jdr-docs/Tableau-GenerateurExcuses-HIRES.jpg)")
	}
	if (message.content.startsWith(prefix + 'invite')) {
		message.reply("https://discordapp.com/oauth2/authorize?client_id=" + bot.user.id + "&scope=bot&permissions=-1")
	}
	if (message.content.startsWith(prefix + 'kick')) {
		if(!message.member.roles.some(r=>["admins", "mods", "staff"].includes(r.name)) )
		return message.reply("You don't have role named `mods`, `admins` or `staff` !");
	  
	  // Let's first check if we have a member and if we can kick them!
	  // message.mentions.members is a collection of people that have been mentioned, as GuildMembers.
	  let member = message.mentions.members.first();
	  if(!member)
		return message.reply("Undifined person");
	  if(!member.kickable) 
		return message.reply("i can't kick !");
	  
	  // slice(1) removes the first part, which here should be the user mention!
	  let reason = args.slice(1).join(' ');
	  if(!reason)
		return message.reply("Give a reason !");
	  
	  // Now, time for a swift kick in the nuts!
	     member.kick(reason)
		.catch(error => message.reply(`Sorry ${message.author} I cannot kick because : ${error}`));
  message.reply(`${member.user.tag} was kick by ${message.author.tag} because : ${reason}`);
}
	if (message.content.startsWith(prefix + 'ban')) {
		if(!message.member.roles.some(r=>["admins"].includes(r.name)) )
		return message.reply("You don't have role named `admins` !");
	  
	  let member = message.mentions.members.first();
	  if(!member)
	  return message.reply("Undifined person");
	  if(!member.bannable) 
	  return message.reply("i can't ban !");
  
	  let reason = args.slice(1).join(' ');
	  if(!reason)
	  return message.reply("Give a reason !");
	  
	  member.ban(reason)
	  .catch(error => message.reply(`Sorry ${message.author} I cannot ban because : ${error}`));
	  message.reply(`${member.user.tag} was ban by ${message.author.tag} because : ${reason}`);
	}
	sql.get(`SELECT * FROM scores WHERE userId ="${message.author.id}"`).then(row => {
	  if (!row) {
		sql.run("INSERT INTO scores (userId, points, level) VALUES (?, ?, ?)", [message.author.id, 1, 0]);
	  } else {
		let curLevel = Math.floor(0.1 * Math.sqrt(row.points + 1));
		if (curLevel > row.level) {
		  row.level = curLevel;
		  sql.run(`UPDATE scores SET points = ${row.points + 1}, level = ${row.level} WHERE userId = ${message.author.id}`);
		  message.reply(`Yay, you are level **${curLevel}**!`);
		}
		sql.run(`UPDATE scores SET points = ${row.points + 1} WHERE userId = ${message.author.id}`);
	  }
	}).catch(() => {
	  console.error;
	  sql.run("CREATE TABLE IF NOT EXISTS scores (userId TEXT, points INTEGER, level INTEGER)").then(() => {
		sql.run("INSERT INTO scores (userId, points, level) VALUES (?, ?, ?)", [message.author.id, 1, 0]);
	  });
	});
  
	if (message.content.startsWith(prefix + "profile")) {

		let member = message.mentions.members.first();

		if(!member) {
			sql.get(`SELECT * FROM scores WHERE userId ="${message.author.id}"`).then(row => {
				money.fetchBal(message.author.id).then((i) => { // money.fetchBal grabs the userID, finds it, and puts it into 'i'.
		const embed = new Discord.RichEmbed()
		embed.setTitle(message.author.username)
		embed.setAuthor("EmoteCord Bot")
		embed.setColor(0x00AE86)
		embed.setFooter("EmoteCord Bot")
		embed.setImage(message.author.displayAvatarURL)
		embed.setTimestamp()
		embed.addField("LVL", row.level)
		embed.addField("XP", row.points)
		embed.addField("๖̶̶̶ζ͜͡Cr", i.money)
		message.channel.send({embed});
	})
});
		}
		if(member) {
			sql.get(`SELECT * FROM scores WHERE userId ="${member.id}"`).then(row => {
				money.fetchBal(member.id).then((i) => { // money.fetchBal grabs the userID, finds it, and puts it into 'i'.
			const embed = new Discord.RichEmbed()
			embed.setTitle(member.displayName)
			embed.setAuthor("EmoteCord Bot")
			embed.setColor(0x00AE86)
			embed.setFooter("EmoteCord Bot")
			embed.setImage(member.displayAvatarURL)
			embed.setTimestamp()
			embed.addField("LVL", row.level)
			embed.addField("XP", row.points)
			embed.addField("๖̶̶̶ζ͜͡Cr", i.money)
			message.channel.send({embed});
		})
	});
		}
		  



	}

// Example: Getting a daily reward
if (message.content.startsWith(prefix + 'daily')) {
				if (money[message.author.username + message.guild.name] != moment().format('L')) {
						money[message.author.username + message.guild.name] = moment().format('L')
						money.updateBal(message.author.id, 500).then((i) => { // The daily ends of the day, so everyday they can get a daily bonus, if they missed it, they can't get it back again.
								message.channel.send({embed: {
										color: 3447003,
										description: 'Here are you daily 500 ๖̶̶̶ζ͜͡Cr',
										author: {
												name: `${message.author.username}`,
												icon_url: message.author.avatarURL 
										}
								}});
						})
				} else {
						message.channel.send({embed: {
								color: 3447003,
								description: 'You already have your daily, come back later !', // When you got your daily already, this message will show up.
								author: {
										name: `${message.author.username}`,
										icon_url: message.author.avatarURL 
								}
						}});
				}
		}
		if (message.content.startsWith(prefix + 'md5')) {
			message.reply("Here it is : " + MD5(argresult));
		}
		if (message.content.startsWith(prefix + 'sha256')) {
			message.reply("Here it is : " + SHA256(argresult));
		}
		if (message.content.startsWith(prefix + "eth")) {
		price.getCryptoPrice("EUR", "ETH").then(obj => { // Base for ex - USD, Crypto for ex - ETH  
			message.reply("1 ETH = " + obj.price + "€")
		}).catch(err => {
			hook.error("Xenohook", err)
		})
		price.getCryptoPrice("USD", "ETH").then(obj => { // Base for ex - USD, Crypto for ex - ETH  
			message.reply("1 ETH = " + obj.price + "$")
		}).catch(err => {
			hook.error("Xenohook", err)
		})
		}
		if (message.content.startsWith(prefix + "btc")) {
			price.getCryptoPrice("EUR", "BTC").then(obj => { // Base for ex - USD, Crypto for ex - ETH  
				message.reply("1 BTC = " + obj.price + "€")
			}).catch(err => {
				hook.error("Xenohook", err)
			})
			price.getCryptoPrice("USD", "BTC").then(obj => { // Base for ex - USD, Crypto for ex - ETH  
				message.reply("1 BTC = " + obj.price + "$")
			}).catch(err => {
				hook.error("Xenohook", err)
			})
		}
		if (message.content.startsWith(prefix + "ltc")) {
			price.getCryptoPrice("EUR", "LTC").then(obj => { // Base for ex - USD, Crypto for ex - ETH  
				message.reply("1 LTC = " + obj.price + "€")
			}).catch(err => {
				hook.error("Xenohook", err)
			})
			price.getCryptoPrice("USD", "LTC").then(obj => { // Base for ex - USD, Crypto for ex - ETH  
				message.reply("1 LTC = " + obj.price + "$")
			}).catch(err => {
				hook.error("Xenohook", err)
			})
		}
		if (message.content.startsWith(prefix + "xmr")) {
			price.getCryptoPrice("EUR", "XMR").then(obj => { // Base for ex - USD, Crypto for ex - ETH  
				message.reply("1 XMR = " + obj.price + "€")
			}).catch(err => {
				hook.error("Xenohook", err)
			})
			price.getCryptoPrice("USD", "XMR").then(obj => { // Base for ex - USD, Crypto for ex - ETH  
				message.reply("1 XMR = " + obj.price + "$")
			}).catch(err => {
				hook.error("Xenohook", err)
			})
		}
		if (message.content.startsWith(prefix + "serverinfo")) {
			const embed = new Discord.RichEmbed()
			.setAuthor(message.guild.name, message.guild.iconURL)
			.setColor(3447003)
			.setDescription(`Owner: ${message.guild.owner.user.tag} (${message.guild.owner.id})`)
			.addField('Membercount', `${message.guild.memberCount - message.guild.members.filter(m=>m.user.bot).size} (${message.guild.members.filter(m=>m.user.bot).size} bots)`, true)
			.addField('Timeout AFK', `${message.guild.afkTimeout / 60} minutes`, true)
			.addField('AFK Chan', `${message.guild.afkChannelID === null ? 'No AFK Channel' : bot.channels.get(message.guild.afkChannelID).name} (${message.guild.afkChannelID === null ? '' : message.guild.afkChannelID})`, true)
			.addField('Location', message.guild.region, true)
			.addField('Created on ', message.guild.createdAt.toLocaleString(), true)
			.addBlankField(true)
			.setTimestamp()
			.setFooter(bot.user.username, bot.user.avatarURL);
		  
		  message.channel.send({embed});
		}
});
