const Discord = require('discord.js');
const money = require('discord-money');
const moment = require('moment');
var Webhook = require("webhook-discord")
var MD5 = require("crypto-js/md5");
var SHA256 = require("crypto-js/sha256");
let price = require('crypto-price')
const bot = new Discord.Client();
var prefix = "<"
var adminprefix = "<!"
var OWNERID = "your id"
var OWNERID2 = "2nd owner id"
var OWNERID3 = "3e owner id"
const config = require("./config.json");
bot.login(config.token);
var hook = new Webhook("your webhook url without token" + config.hooktoken)

bot.on('ready', () => {
		hook.success("Xenohook", bot.user.username + " online !");
		hook.info("Xenohook", bot.users.size + " users in " + bot.channels.size + " channels of " + bot.guilds.size + " guilds !");
		console.log(bot.user.username + " en ligne !");
		console.log(bot.users.size + " users in " + bot.channels.size + " channels of " + bot.guilds.size + " guilds !");
		bot.user.setActivity("(<help) " + bot.users.size + " users / " + bot.guilds.size + " guilds !", { type: "WATCHING"});
		bot.user.setUsername("Check your code at line 24 !");
});

bot.on('guildCreate', guild => {
	hook.info("Xenohook", 'New guild: ' + guild.name + ' (id: ' + guild.id + '), ' + guild.memberCount + ' members! owner is ' + guild.owner);
	console.log('New guild: ' + guild.name + ' (id: ' + guild.id + '), ' + guild.memberCount + ' members! owner is ' + guild.owner);
	bbot.user.setActivity("(<help " + bot.users.size + " users / " + bot.guilds.size + " guilds !", { type: "WATCHING"});
});
bot.on("guildDelete", guild => {
	console.log('I was removed of : ' + guild.name + ' (id: ' + guild.id + ')');
	hook.info("Xenohook", 'I was removed of : ' + guild.name + ' (id: ' + guild.id + ')');
	bot.user.setActivity("(<help " + bot.users.size + " users / " + bot.guilds.size + " guilds !", { type: "WATCHING"});
});

bot.on('message', message => {
	if (message.author.bot) return;
	let args = message.content.split(' ').slice(1);
	var argresult = args.join(' ');

	if(message.content.startsWith(prefix+'ping')) {
		message.react('🏓')
		message.channel.send(`:ping_pong: \`${Date.now() - message.createdTimestamp} ms\``);
	}
	if(message.content.startsWith(prefix + 'userinfo')) {
		let member = message.mentions.members.first()
		if(!member && !argresult.startsWith("dbl") && !argresult.startsWith("bd")) {
			const embed = new Discord.RichEmbed()
			embed.setTitle(message.author.username)
			embed.setAuthor("EmoteCord Bot")
			embed.setColor(0x00AE86)
			embed.setFooter(bot.user.username, bot.user.avatarURL);
			embed.setImage(message.author.displayAvatarURL)
			embed.setTimestamp()
			embed.addField("Account creation", message.author.createdAt)
			embed.addField("Name", message.author.username + "#" + message.author.discriminator)
			message.channel.send({embed});
		}
		if(member && !argresult.startsWith("dbl") && !argresult.startsWith("bd")) {
			const embed = new Discord.RichEmbed()
			embed.setTitle(member.displayName)
			embed.setAuthor("EmoteCord Bot")
			embed.setColor(0x00AE86)
			embed.setFooter(bot.user.username, bot.user.avatarURL);
			embed.setImage(member.user.displayAvatarURL)
			embed.setTimestamp()
			embed.addField("Account creation", member.user.createdAt)
			embed.addField("Name", member.user.tag)
			message.channel.send({embed});
		}
		if(member.user.bot) {
			if(argresult.startsWith("dbl.fr")) {
					let botid = member.user.id
					req('https://discordbots.fr/api/v1/bot/' + botid, (e, r, b)=> {
						let contenu = JSON.parse(b)
						if(contenu.error === "ce bot n`existe pas ")  {
							message.channel.send("Not a bot, or not listed");
						} else {
					const embed = new Discord.RichEmbed()
						embed.setTitle(contenu.name)
						embed.setAuthor(bot.user.username, bot.user.avatarURL)
						embed.setColor(0x00AE86)
						embed.setFooter(bot.user.username, bot.user.avatarURL);
						embed.setImage(contenu.avatar)
						embed.setTimestamp()
						embed.addField(contenu.name, contenu.shortDesc)
						embed.addField("Approved", contenu.approved === true ? "Yes ✅" : "No ❎")
						embed.addField("Server count", contenu.count)
						embed.addField("Lib used", contenu.lib)
						embed.addField("Prefix", contenu.prefix)
						message.channel.send({embed});
						}
					})
				}
				
			if(argresult.startsWith("dbl.org")) {
				let botid = member.user.id
					req('https://discordbots.org/api/bots/' + botid, (e, r, b)=> {
						let contenu = JSON.parse(b)
					if(contenu.error === "Not found")  {
						message.channel.send("Not a bot, or not listed");
					} else {
					const embed = new Discord.RichEmbed()
						embed.setTitle(contenu.username)
						embed.setAuthor(bot.user.username, bot.user.avatarURL)
						embed.setColor(0x00AE86)
						embed.setFooter(bot.user.username, bot.user.avatarURL);
						embed.setImage('https://i.imgur.com/lHU6JcZ.png')
						embed.setTimestamp()
						embed.addField(contenu.username, contenu.shortdesc)
						embed.addField("Approved", contenu.certifiedBot === true ? "Yes ✅" : "No ❎")
						embed.addField("Server count", contenu.server_count)
						embed.addField("Lib used", contenu.lib)
						embed.addField("Prefix", contenu.prefix)
						embed.addField("Upvotes", contenu.points)
						message.channel.send({embed});
					}
					})
				}
				if(argresult.startsWith("bd.pw")) {
					let botid = member.user.id
					req({
					url:"https://bots.discord.pw/api/bots/" + botid,
					headers:{
					   "Authorization":config.bdpwtoken
					}}, (e, r, b) =>{
						contenu = JSON.parse(b)
						if(contenu.error === "Bot user ID not found")  {
							message.channel.send("Not a bot, or not listed");
						} else {
						const embed = new Discord.RichEmbed()
							embed.setTitle(contenu.name)
							embed.setAuthor(bot.user.username, bot.user.avatarURL)
							embed.setColor(0x00AE86)
							embed.setFooter(bot.user.username, bot.user.avatarURL);
							embed.setImage('https://i.imgur.com/lHU6JcZ.png')
							embed.setTimestamp()
							embed.addField(contenu.name, contenu.description)
							embed.addField("Lib used", contenu.library)
							embed.addField("Prefix", contenu.prefix)
							message.channel.send({embed});
						}
						})
				}
					}
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
if (message.content.startsWith(adminprefix + 'membercount')) {
	if(message.author.id != OWNERID) return;
	const embed = new Discord.RichEmbed()
		embed.setTitle('Membercount')
		embed.setAuthor('EmoteCord Bot')
		embed.setFooter(bot.user.username, bot.user.avatarURL);
		embed.setColor(0x00AE86)
		embed.setDescription('by Xen#0190')
		embed.setThumbnail('https://cdn.discordapp.com/avatars/196668513601978369/1c30c546addb15d82e15523b306c955c.jpg?width=250&height=250')
		embed.setTimestamp()
		embed.addField('Membercount', `${message.guild.memberCount - message.guild.members.filter(m=>m.user.bot).size} (${message.guild.members.filter(m=>m.user.bot).size} bots)`, true)
		message.channel.send({embed})
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
					embed.setDescription('by Jus De Patate#0190')
					embed.setFooter(bot.user.username, bot.user.avatarURL);
					embed.setImage('https://i.imgur.com/lHU6JcZ.png')
					embed.setThumbnail('https://images-ext-1.discordapp.net/external/pE4AtAycH79mPYD5rK1f5BozWKnNSyqiPcqIBzkPpxc/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/196668513601978369/1c30c546addb15d82e15523b306c955c.jpg?width=250&height=250')
					embed.setTimestamp()
					embed.addField('Fun <:thumbsup:404608153674711040>', '<8ball, an 8ball command\n<dog, random dog\n<cat, random cat\n<dawae, do you know da wae ?\n<facepalm, facepalm\n<hug, hug someone !\n<nut, kick in the nut\n<kiss, kiss someone\nslap, slap someone')
					embed.addField('Other <:question:404607834958069770>', '<ping, ping the bot\n<messtodev, send message to Xen\n<invite, invite the bot\n<serverinfo, give info about the server\n<emotecord, give an invite for EmoteCord\n<support, get an invite to the support server\n<userinfo [bd.pw|dbl.org|dbl.fr] @user, give info about this user/bot (only if you use arg bd.pw, dbl.org or dbl.fr)', true)
					embed.addField('Mods <:oncoming_police_car:404607672172937218>', '[Please use Section 9984 instead](https://github.com/Yaume230/Section-9984)\n<kick, kick\n<ban, ban', true);
					embed.addField('Crypto <:lock:405711204971970571>', "<md5, encrypt your text with md5\n<sha256, encrypt your text with sha256", true);
					embed.addField('Other Language <:flag_fr:409768694822993942>', '<frexcuse, donne une excuse Naheulbeukesque', true);
					embed.addField('Infos <:information_source:404625019088535554>', 'Bot dev with Discord.js 11.2/NodeJS 9.4.0', true);
				message.reply({embed});
	}
	if (message.content.startsWith(prefix + 'botinfo')) {
		const embed = new Discord.RichEmbed()
		embed.setTitle("Bot Info")
		embed.addField("Users", bot.users.size)
		embed.addField("Guilds", bot.guilds.size)
		embed.addField("Channels", bot.channels.size)
		embed.setFooter(bot.user.username, bot.user.avatarURL);
		message.reply({embed})
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
		if(message.content.startsWith(prefix + "dog")) {
			req('https://random.dog/woof.json?filter=mp4,webm', (e, r, b)=> {
				let contenu = JSON.parse(b)
			const embed = new Discord.RichEmbed()
				embed.setTitle("random.dog")
				embed.setAuthor(bot.user.username, bot.user.avatarURL)
				embed.setColor(0x00AE86)
				embed.setFooter(bot.user.username, bot.user.avatarURL);
				embed.setImage(contenu.url)
				embed.setTimestamp()
				message.channel.send({embed});
			})
		}
		if(message.content.startsWith(prefix + "cat")) {
			req('http://random.cat/meow?filter=mp4,webm', (e, r, b)=> {
				let contenu = JSON.parse(b)
			const embed = new Discord.RichEmbed()
				embed.setTitle("random.cat")
				embed.setAuthor(bot.user.username, bot.user.avatarURL)
				embed.setColor(0x00AE86)
				embed.setFooter(bot.user.username, bot.user.avatarURL);
				embed.setImage(contenu.file)
				embed.setTimestamp()
				message.channel.send({embed});
			})
		}
		if(message.content.startsWith(prefix + "slap")) {
		let member = message.mentions.members.first()
		if(!member) message.reply("auto-slap ?")
		else {
			const embed = new Discord.RichEmbed()
				embed.setTitle(message.author.username + " slap " + member.user.username)
				embed.setAuthor(bot.user.username, bot.user.avatarURL)
				embed.setColor(0x00AE86)
				embed.setFooter(bot.user.username, bot.user.avatarURL);
				embed.setImage("https://media1.tenor.com/images/49de17c6f21172b3abfaf5972fddf6d6/tenor.gif")
				embed.addField("Rip " + member.user.username, "¯\_(ツ)_/¯")
				embed.setTimestamp()
				message.channel.send({embed});
		}
		}
		if(message.content.startsWith(prefix + "kiss")) {
			let member = message.mentions.members.first()
			if(!member) message.reply("auto-kiss ?")
			else {
				const embed = new Discord.RichEmbed()
					embed.setTitle(message.author.username + " kiss " + member.user.username)
					embed.setAuthor(bot.user.username, bot.user.avatarURL)
					embed.setColor(0x00AE86)
					embed.setFooter(bot.user.username, bot.user.avatarURL);
					embed.setImage("https://media1.tenor.com/images/8438e6772a148e62f4c64332ea7da9e8/tenor.gif")
					embed.addField("Love is beautiful", ":)")
					embed.setTimestamp()
					message.channel.send({embed});
			}
			}
		if(message.content.startsWith(prefix + "nut")) {
				let member = message.mentions.members.first()
				if(!member) message.reply("auto-kick-in-the-nuts ?")
				else {
					const embed = new Discord.RichEmbed()
						embed.setTitle(message.author.username + " kick the nuts of " + member.user.username)
						embed.setAuthor(bot.user.username, bot.user.avatarURL)
						embed.setColor(0x00AE86)
						embed.setFooter(bot.user.username, bot.user.avatarURL);
						embed.setImage("https://media1.tenor.com/images/348eae99cbaf68283903d74ee85e67ce/tenor.gif")
						embed.addField("Rip the nuts of " + member.user.username, "¯\_(ツ)_/¯")
						embed.setTimestamp()
						message.channel.send({embed});
				}
				}
				if(message.content.startsWith(prefix + "hug")) {
					let member = message.mentions.members.first()
					if(!member) message.reply("auto-hug ?")
					else {
						const embed = new Discord.RichEmbed()
							embed.setTitle(message.author.username + " hug " + member.user.username)
							embed.setAuthor(bot.user.username, bot.user.avatarURL)
							embed.setColor(0x00AE86)
							embed.setFooter(bot.user.username, bot.user.avatarURL);
							embed.setImage("https://media1.tenor.com/images/d7529f6003b20f3b21f1c992dffb8617/tenor.gif")
							embed.addField("Love is beautiful", ":)")
							embed.setTimestamp()
							message.channel.send({embed});
					}
					}
					if(message.content.startsWith(prefix + "facepalm")) {
							const embed = new Discord.RichEmbed()
								embed.setTitle(message.author.username + " facepalm")
								embed.setAuthor(bot.user.username, bot.user.avatarURL)
								embed.setColor(0x00AE86)
								embed.setFooter(bot.user.username, bot.user.avatarURL);
								embed.setImage("https://media1.tenor.com/images/0f78af841f453545a036b6cceb3620cc/tenor.gif")
								embed.addField("Facepalmed", "¯\_(ツ)_/¯")
								embed.setTimestamp()
								message.channel.send({embed});
						}
						if(message.content.startsWith(prefix + "dawae")) {
							const embed = new Discord.RichEmbed()
								embed.setTitle(message.author.username + " KNOW DA WAE !")
								embed.setAuthor(bot.user.username, bot.user.avatarURL)
								embed.setColor(0x00AE86)
								embed.setFooter(bot.user.username, bot.user.avatarURL);
								embed.setImage("https://media1.tenor.com/images/96d8a6e5daebe9d1ac5ea47f39e74fa6/tenor.gif")
								embed.addField("OMG ! HE KNOW DA WAE !!", "😱")
								embed.setTimestamp()
								message.channel.send({embed});
						}
});
