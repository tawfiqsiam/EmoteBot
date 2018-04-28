const Discord = require('discord.js');
const moment = require('moment');
var Webhook = require("webhook-discord")
var MD5 = require("crypto-js/md5");
var SHA256 = require("crypto-js/sha256");
let price = require('crypto-price')
const bot = new Discord.Client();
var http = require('http');
var prefix = "d!"
var adminprefix = "da!"
var OWNERID = process.env.owner1
var OWNERID2 = process.env.owner2
var OWNERID3 = process.env.owner3
bot.login(process.env.token);
var hook = new Webhook(process.env.hooktoken)

bot.on('ready', () => {
		hook.success("Dishook", bot.user.username + " en ligne !");
		hook.info("Dishook", bot.users.size + " utilisateurs dans " + bot.channels.size + " channels de " + bot.guilds.size + " serveurs !");
		console.log(bot.user.username + " en ligne !");
		console.log(bot.users.size + " utilisateurs dans " + bot.channels.size + " channels de " + bot.guilds.size + " serveurs !");
		bot.user.setActivity("(d!help) " + bot.users.size + " utilisateurs / " + bot.guilds.size + " serveurs !", { type: "WATCHING"});
		bot.user.setUsername(process.env.username);
});

bot.on('guildCreate', guild => {
	hook.info("Dishook", 'Nouveau serveur: ' + guild.name + ' (id: ' + guild.id + '), ' + guild.memberCount + ' membres! Propriétaire : ' + guild.owner);
	console.log('Nouveau serveur: ' + guild.name + ' (id: ' + guild.id + '), ' + guild.memberCount + ' membres! Propriétaire : ' + guild.owner);
	bot.user.setGame("d!help " + bot.users.size + " utilisateurs / " + bot.guilds.size + " serveurs !");
});
bot.on("guildDelete", guild => {
	hook.info("Dishook", `Retiré de : ` + guild.name + ` (id: ' + guild.id + ')`);
	console.log('Retiré de : ' + guild.name + ' (id: ' + guild.id + ')');
	bot.user.setGame("d!help " + bot.users.size + " utilisateurs / " + bot.guilds.size + " serveurs !");
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

		if(!member) {
			const embed = new Discord.RichEmbed()
			embed.setTitle(message.author.username)
			embed.setAuthor("Disbot")
			embed.setColor(0x00AE86)
			embed.setFooter("Disbot")
			embed.setImage(message.author.displayAvatarURL)
			embed.setTimestamp()
			embed.addField("Date de création :", message.author.createdAt)
			embed.addField("Nom :", message.author.username + "#" + message.author.discriminator)
			message.channel.send({embed});
		}
		if(member) {
			const embed = new Discord.RichEmbed()
			embed.setTitle(member.displayName)
			embed.setAuthor("Disbot")
			embed.setColor(0x00AE86)
			embed.setFooter("Disbot")
			embed.setImage(member.user.displayAvatarURL)
			embed.setTimestamp()
			embed.addField("Date de création :", member.user.createdAt)
			embed.addField("Nom :", member.user.tag)
			message.channel.send({embed});
		}
	}
	if (message.content.startsWith(adminprefix + 'setgame')) {
		if (message.author.id != OWNERID && message.author.id != OWNERID2 && message.author.id != OWNERID3) {
			message.reply("Vous n'avez pas les permissions")
		}if (message.author.id === OWNERID) {
			bot.user.setGame(argresult);
			bot.user.setStatus("online");
			message.reply("Jeu modifié !");
		}if (message.author.id === OWNERID2) {
			bot.user.setGame(argresult);
			bot.user.setStatus("online");
			message.reply("Jeu modifié !");
		}if (message.author.id === OWNERID3) {
			bot.user.setGame(argresult);
			bot.user.setStatus("online");
			message.reply("Jeu modifié !");
		}
}
if (message.content.startsWith(adminprefix + 'membercount')) {
	if(message.author.id != OWNERID) return;
	const embed = new Discord.RichEmbed()
		embed.setTitle('Membercount')
		embed.setAuthor('Disbot')
		embed.setColor(0x00AE86)
		embed.setThumbnail('https://cdn.discordapp.com/avatars/394864865652768768/881c6803f29a2c87e5edd3b79f73320d.png?width=250&height=250')
		embed.setTimestamp()
		embed.addField('Membercount', `${message.guild.memberCount - message.guild.members.filter(m=>m.user.bot).size} (${message.guild.members.filter(m=>m.user.bot).size} bots)`, true)
		const msg = message.channel.send({embed})
  }
	if (message.content.startsWith(prefix + 'contact')) {
			message.reply("Message envoyé !");
			const sayMessage = args.join(" ");
			hook.info("Dishook (contact)", message.author.displayName + " (id: " + message.author.id + ") dit " + sayMessage);
}
	if (message.content.startsWith(prefix + 'help')) {
				const embed = new Discord.RichEmbed()
					embed.setTitle('Help !')
					embed.setAuthor('Disbot')
					embed.setColor(0x00AE86)
					embed.setFooter('Disbot v0.1a', 'https://image.freepik.com/icones-gratuites/point-d-39-interrogation-dans-un-cercle_318-27276.jpg')
					embed.setTimestamp()
					embed.addField('Other <:question:404607834958069770>', "d!ping, Ping du bot\nd!contact, Contactez-nous !\nd!serverinfo, Informations du serveur\nd!support, Obtenez le lien vers le serveur de support !\nd!userinfo @user, Donne les informations d'un utilisateur\nd!invite, Invitez le bot !", true)
					embed.addField('Mods <:oncoming_police_car:404607672172937218>', 'd!kick, kick\nd!ban, ban', true);
					embed.addField('Crypto <:lock:405711204971970571>', "d!btc, \nd!eth, \nd!xmr, \nEncryption de texte\nd!md5, \nd!sha256", true);
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
	if (message.content.startsWith(prefix + 'support')) {
		message.channel.send("Serveur de Support : https://discord.gg/fK48fss")
	}
	if (message.content.startsWith(prefix + 'invite')) {
		message.reply("https://discordapp.com/oauth2/authorize?client_id=" + bot.user.id + "&scope=bot&permissions=-1")
	}
	if (message.content.startsWith(prefix + 'kick')) {
		if(!message.member.roles.some(r=>["Admins", "Mods", "Staff"].includes(r.name)) )
		return message.reply("Vous n'avez pas de role nommé 'Admins' 'Mods' ou 'Staff'");
	  
	  // Let's first check if we have a member and if we can kick them!
	  // message.mentions.members is a collection of people that have been mentioned, as GuildMembers.
	  let member = message.mentions.members.first();
	  if(!member)
		return message.reply("Inconnu");
	  if(!member.kickable) 
		return message.reply("Je ne peux pas kick cette personne");
	  
	  // slice(1) removes the first part, which here should be the user mention!
	  let reason = args.slice(1).join(' ');
	  if(!reason)
		return message.reply("Merci de spécifier une raison");
	  
	  // Now, time for a swift kick in the nuts!
	     member.kick(reason)
		.catch(error => message.reply(`Désolé ${message.author} Je ne peux pas kick cette personne car : ${error}`));
  message.reply(`${member.user.tag} à été expulsé du serveur ${message.author.tag} pour : ${reason}`);
}
	if (message.content.startsWith(prefix + 'ban')) {
		if(!message.member.roles.some(r=>["Staff"].includes(r.name)) )
		return message.reply("Vous n'avez pas le role Staff !");
	  
	  let member = message.mentions.members.first();
	  if(!member)
	  return message.reply("Inconnu");
	  if(!member.bannable) 
	  return message.reply("Je ne peux pas bannir cette personne !");
  
	  let reason = args.slice(1).join(' ');
	  if(!reason)
	  return message.reply("Merci de spécifier une raison");
	  
	  member.ban(reason)
	  .catch(error => message.reply(`Désolé ${message.author} Je ne peux pas bannir car : ${error}`));
	  message.reply(`${member.user.tag} à été banni par ${message.author.tag} car : ${reason}`);
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
			hook.error("Dishook", err)
		})
		price.getCryptoPrice("EUR", "ETH").then(obj => { // Base for ex - USD, Crypto for ex - ETH  
			message.reply("1 ETH = " + obj.price + "$")
		}).catch(err => {
			hook.error("Dishook", err)
		})
		}
		if (message.content.startsWith(prefix + "btc")) {
			price.getCryptoPrice("EUR", "BTC").then(obj => { // Base for ex - USD, Crypto for ex - ETH  
				message.reply("1 BTC = " + obj.price + "€")
			}).catch(err => {
				hook.error("Dishook", err)
			})
			price.getCryptoPrice("EUR", "BTC").then(obj => { // Base for ex - USD, Crypto for ex - ETH  
				message.reply("1 BTC = " + obj.price + "$")
			}).catch(err => {
				hook.error("Dishook", err)
			})
		}
		if (message.content.startsWith(prefix + "xmr")) {
			price.getCryptoPrice("EUR", "XMR").then(obj => { // Base for ex - USD, Crypto for ex - ETH  
				message.reply("1 XMR = " + obj.price + "€")
			}).catch(err => {
				hook.error("Dishook", err)
			})
			price.getCryptoPrice("EUR", "XMR").then(obj => { // Base for ex - USD, Crypto for ex - ETH  
				message.reply("1 XMR = " + obj.price + "$")
			}).catch(err => {
				hook.error("Dishook", err)
			})
		}
		if (message.content.startsWith(prefix + "serverinfo")) {
			const embed = new Discord.RichEmbed()
			.setAuthor(message.guild.name, message.guild.iconURL)
			.setColor(3447003)
			.setDescription(`Propriétaire : ${message.guild.owner.user.tag} (${message.guild.owner.id})`)
			.addField('Membres :', `${message.guild.memberCount - message.guild.members.filter(m=>m.user.bot).size} (${message.guild.members.filter(m=>m.user.bot).size} bots)`, true)
			.addField("Temps d'AFK max :", `${message.guild.afkTimeout / 60} minutes`, true)
			.addField('Channel AFK :', `${message.guild.afkChannelID === null ? 'Pas de channel AFK' : bot.channels.get(message.guild.afkChannelID).name} (${message.guild.afkChannelID === null ? '' : message.guild.afkChannelID})`, true)
			.addField('Location :', message.guild.region, true)
			.addField('Créé le : ', message.guild.createdAt.toLocaleString(), true)
			.addBlankField(true)
			.setTimestamp()
			.setFooter(bot.user.username, bot.user.avatarURL);
		  
		  message.channel.send({embed});
		}
});
