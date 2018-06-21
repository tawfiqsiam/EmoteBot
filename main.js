const Discord = require('discord.js');
const moment = require('moment');
var cities = require('cities');
var Webhook = require("webhook-discord")
var MD5 = require("crypto-js/md5");
var SHA256 = require("crypto-js/sha256");
const DBL = require("dblapi.js");
const dbl = new DBL(process.env.dbl_token);
var req = require("request")
const bot = new Discord.Client();
var prefix = "<"
var adminprefix = "<!"
var OWNERID = process.env.owner1
var OWNERID2 = process.env.owner2
var OWNERID3 = process.env.owner3
bot.login(process.env.BOT_TOKEN);
var hook = new Webhook(process.env.webhook_url)

console.error = err => {             
	               bot.channels.get('416208941450657795').send(err)             
			console.log('\x1b[31m' + err + '\x1b[0m')        
		       }

bot.on('ready', () => {
		hook.success(bot.user.tag, bot.user.username + " online !");
		hook.info(bot.user.tag, bot.users.size + " users in " + bot.channels.size + " channels of " + bot.guilds.size + " guilds !");
		console.log(bot.user.username + " en ligne !");
		console.log(bot.users.size + " users in " + bot.channels.size + " channels of " + bot.guilds.size + " guilds !");
		bot.user.setActivity("(<help) " + bot.users.size + " users / " + bot.guilds.size + " guilds !", { type: "WATCHING"});
		bot.user.setUsername(process.env.bot_name);
    		setInterval(() => {
        		dbl.postStats(client.guilds.size);
    		}, 1800000);
});

bot.on('guildCreate', guild => {
	hook.info(bot.user.tag, 'New guild: ' + guild.name + ' (id: ' + guild.id + '), ' + guild.memberCount + ' members! owner is ' + guild.owner);
	console.log('New guild: ' + guild.name + ' (id: ' + guild.id + '), ' + guild.memberCount + ' members! owner is ' + guild.owner);
	bot.user.setActivity("(<help " + bot.users.size + " users / " + bot.guilds.size + " guilds !", { type: "WATCHING"});
});
bot.on("guildDelete", guild => {
	console.log('I was removed of : ' + guild.name + ' (id: ' + guild.id + ')');
	hook.info(bot.user.tag, 'I was removed of : ' + guild.name + ' (id: ' + guild.id + ')');
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
		if(!member) {
			console.log("nothing")
		} else {
		if(member.user.bot) {
			if(argresult.startsWith("dbl.fr")) {
					let botid = member.user.id
					req('https://discordbots.fr/api/v1/bot/' + botid, (e, r, b)=> {
						let contenu = JSON.parse(b)
						if(contenu.error === "ce bot n`existe pas ")  {
							message.channel.send("Not a bot, or not listed (or not approved by mods)");
						} else {
					const embed = new Discord.RichEmbed()
						embed.setTitle("<:dblfr:416211618192424971> " + contenu.name)
						embed.setAuthor(bot.user.username, bot.user.avatarURL)
						embed.setColor(0x00AE86)
						embed.setFooter(bot.user.username, bot.user.avatarURL);
						embed.setImage(contenu.avatar)
						embed.setTimestamp()
						embed.addField(contenu.name, contenu.shortDesc)
						embed.addField("Approved", contenu.approved === true ? "Yes <:certified:416209894245531648>" : "No ❎")
						embed.addField("Server count", contenu.count)
						embed.addField("Lib used", contenu.lib)
						embed.addField("Added on", moment(contenu.timestamp).format("D MMMM Y"))
						embed.addField("Prefix", contenu.prefix)
						embed.addField("Links", "[Invitation](" + contenu.invite + ")\n[DBL.fr](https://discordbots.fr/bots/" + botid + " )\n[Github](" + contenu.github + ")\n[Website](" + contenu.website + ")")
						message.channel.send({embed});
						}
					})
				}
				
			if(argresult.startsWith("dbl.org")) {
				let botid = member.user.id
					req('https://discordbots.org/api/bots/' + botid, (e, r, b)=> {
						let contenu = JSON.parse(b)
					if(contenu.error === "Not found")  {
						message.channel.send("Not a bot, or not listed (or not approved by mods)");
					} else {
					const embed = new Discord.RichEmbed()
						embed.setTitle("<:dblorg:416210448732651520> " + contenu.username)
						embed.setAuthor(bot.user.username, bot.user.avatarURL)
						embed.setColor(0x00AE86)
						embed.setFooter(bot.user.username, bot.user.avatarURL);
						embed.setImage('https://i.imgur.com/lHU6JcZ.png')
						embed.setTimestamp()
						embed.addField(contenu.username, contenu.shortdesc)
						embed.addField("Certified ?", contenu.certifiedBot === true ? "Yes <:certified:416209894245531648>" : "No ❎")
						embed.addField("Server count", contenu.server_count)
						embed.addField("Lib used", contenu.lib)
						embed.addField("Added on", contenu.date)
						embed.addField("Prefix", contenu.prefix)
						embed.addField("Links", "[Invitation](" + contenu.invite + ")\n[DBL.org](https://discordbots.org/bot/" + botid + " )\n[Github](" + contenu.github + ")\n[Website](" + contenu.website + ")")
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
					   "Authorization":process.env.bdpw
					}}, (e, r, b) =>{
						contenu = JSON.parse(b)
						if(contenu.error === "Bot user ID not found")  {
							message.channel.send("Not a bot, or not listed (or not approved by mods)");
						} else {
						const embed = new Discord.RichEmbed()
							embed.setTitle("<:bdpw:416211906186051595> " + contenu.name)
							embed.setAuthor(bot.user.username, bot.user.avatarURL)
							embed.setColor(0x00AE86)
							embed.setFooter(bot.user.username, bot.user.avatarURL);
							embed.setImage('https://i.imgur.com/lHU6JcZ.png')
							embed.setTimestamp()
							embed.addField(contenu.name, contenu.description)
							embed.addField("Lib used", contenu.library)
							embed.addField("Prefix", contenu.prefix)
							embed.addField("Links", "[Invitation](" + contenu.invite_url +")\n[bd.pw](https://bots.discord.pw/bots/" + botid + ")\n[Website](" + contenu.website + ")")
							message.channel.send({embed});
						}
						})
				}
					}
				}
			}
if (message.content.startsWith(adminprefix + 'membercount')) {
	if(message.author.id != OWNERID) return;
	const embed = new Discord.RichEmbed()
		embed.setTitle('Membercount')
		embed.setAuthor('EmoteCord Bot')
		embed.setFooter(bot.user.username, bot.user.avatarURL);
		embed.setColor(0x00AE86)
		embed.setDescription('by Jus De Patate#0190')
		embed.setThumbnail('https://cdn.discordapp.com/avatars/196668513601978369/1c30c546addb15d82e15523b306c955c.jpg?width=250&height=250')
		embed.setTimestamp()
		embed.addField('Membercount', `${message.guild.memberCount - message.guild.members.filter(m=>m.user.bot).size} (${message.guild.members.filter(m=>m.user.bot).size} bots)`, true)
		message.channel.send({embed})
  }
	if (message.content.startsWith(prefix + 'messtodev')) {
			message.reply("Message sent !!");
			const sayMessage = args.join(" ");
			hook.info(message.author.tag, message.author.displayName + " (id: " + message.author.id + ") said " + sayMessage);
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
					embed.setTimestamp()
					embed.addField('Fun <:thumbsup:404608153674711040>', '<8ball, an 8ball command\n<dog, random dog\n<cat, random cat\n<dawae, do you know da wae ?\n<facepalm, facepalm\n<hug, hug someone !\n<nut, kick in the nut\n<kiss, kiss someone\n<slap, slap someone')
					embed.addField('Other <:question:404607834958069770>', '<ping, ping the bot\n<messtodev, send message to Xen\n<invite, invite the bot\n<serverinfo, give info about the server\n<userinfo [bd.pw|dbl.org|dbl.fr] @user, give info about this user/bot (only if you use arg bd.pw, dbl.org or dbl.fr)\n<iss, give place of the ISS\n<mc [SERVER/PLAYER/STATUS], give about a server/player of the status', true)
					embed.addField('Mods <:oncoming_police_car:404607672172937218>', '<kick, kick\n<ban, ban', true);
					embed.addField('Money <:moneybag:459278625099874314>', '<btc, give btc price\n<eth, give eth price\n<xmr, give xmr price\n<crypto, give price of 3 cryptocurrencies', true);
					embed.addField('Crypto <:lock:405711204971970571>', "<md5, encrypt your text with md5\n<sha256, encrypt your text with sha256", true);
					embed.addField('Other Language <:flag_fr:409768694822993942>', '<frexcuse, donne une excuse Naheulbeukesque', true);
		                        embed.addField('Git <:git:457815596785074176>', '<github [USER/ORG], give info about a GitHub user/org', true);
					embed.addField('Infos <:information_source:404625019088535554>', 'Bot dev with Discord.js and deployed using Heroku', true);
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
		if(!message.member.hasPermission('KICK_MEMBERS'))
		return message.reply("You can't kick guys :/ !");
	  
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
  message.reply(`<:BlobSalute:459278193665376257> ${member.user.tag} was kick by ${message.author.tag} because : ${reason}`);
}
	if (message.content.startsWith(prefix + 'ban')) {
		if(!message.member.hasPermission('BAN_MEMBERS'))
		return message.reply("You can't ban guys :/ !");
	  
	  let member = message.mentions.members.first();
	  if(!member)
	  return message.reply("Undefined person");
	  if(!member.bannable) 
	  return message.reply("I can't ban !");
  
	  let reason = args.slice(1).join(' ');
	  if(!reason)
	  return message.reply("Give a reason !");
	  
	  member.ban(reason)
	  .catch(error => message.reply(`Sorry ${message.author} I cannot ban because : ${error}`));
	  message.reply(`<:BlobSaluteBan:459277735999569930> ${member.user.tag} was ban by ${message.author.tag} because : ${reason}`);
	}
		if (message.content.startsWith(prefix + 'md5')) {
			message.reply("Here it is : " + MD5(argresult));
		}
		if (message.content.startsWith(prefix + 'sha256')) {
			message.reply("Here it is : " + SHA256(argresult));
		}
		if (message.content.startsWith(prefix + "eth")) {
			req('https://min-api.cryptocompare.com/data/pricemulti?fsyms=ETH&tsyms=USD,EUR', (e, r, b)=> {
				let contenu = JSON.parse(b)
			const embed = new Discord.RichEmbed()
				embed.setTitle("<:eth:459276613071405057>")
				embed.setAuthor(bot.user.username, bot.user.avatarURL)
				embed.setColor(0x00AE86)
				embed.setFooter(bot.user.username, bot.user.avatarURL);
			        embed.addField("Dollar", contenu.ETH.USD + " $")
			        embed.addField("Euro", contenu.ETH.EUR + " €")
				embed.setTimestamp()
				message.channel.send({embed});
			})
		}
		if (message.content.startsWith(prefix + "btc")) {
			req('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC&tsyms=USD,EUR', (e, r, b)=> {
				let contenu = JSON.parse(b)
			const embed = new Discord.RichEmbed()
				embed.setTitle("<:btc:459276391834451979>")
				embed.setAuthor(bot.user.username, bot.user.avatarURL)
				embed.setColor(0x00AE86)
				embed.setFooter(bot.user.username, bot.user.avatarURL);
			        embed.addField("Dollar", contenu.BTC.USD + " $")
			        embed.addField("Euro", contenu.BTC.EUR + " €")
				embed.setTimestamp()
				message.channel.send({embed});
			})
		}
		if (message.content.startsWith(prefix + "xmr")) {
			req('https://min-api.cryptocompare.com/data/pricemulti?fsyms=XMR&tsyms=USD,EUR', (e, r, b)=> {
				let contenu = JSON.parse(b)
			const embed = new Discord.RichEmbed()
				embed.setTitle("<:xmr:459276939178410005>")
				embed.setAuthor(bot.user.username, bot.user.avatarURL)
				embed.setColor(0x00AE86)
				embed.setFooter(bot.user.username, bot.user.avatarURL);
			        embed.addField("Dollar", contenu.XMR.USD + " $")
			        embed.addField("Euro", contenu.XMR.EUR + " €")
				embed.setTimestamp()
				message.channel.send({embed});
			})
		}
			if (message.content.startsWith(prefix + "crypto")) {
			req('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,XMR&tsyms=USD,EUR', (e, r, b)=> {
				let contenu = JSON.parse(b)
			const embed = new Discord.RichEmbed()
				embed.setTitle("<:btc:459276391834451979>/<:eth:459276613071405057>/<:xmr:459276939178410005>")
				embed.setAuthor(bot.user.username, bot.user.avatarURL)
				embed.setColor(0x00AE86)
				embed.setFooter(bot.user.username, bot.user.avatarURL);
			        embed.addField("<:btc:459276391834451979>", contenu.BTC.USD + " $ / " + contenu.BTC.EUR + " €")
			        embed.addField("<:eth:459276613071405057>", contenu.ETH.USD + " $ / " + contenu.ETH.EUR + " €")
				embed.addField("<:xmr:459276939178410005>", contenu.XMR.USD + " $ / " + contenu.XMR.EUR + " €")
				embed.setTimestamp()
				message.channel.send({embed});
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
			req('http://aws.random.cat/meow?filter=mp4,webm', (e, r, b)=> {
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
			var rdmgif =["https://media1.tenor.com/images/b012d461b2ca1f2adaf3a02ea8fb0117/tenor.gif", "https://media1.tenor.com/images/6aa432caad8e3272d21a68ead3629853/tenor.gif", "https://media1.tenor.com/images/0720ffb69ab479d3a00f2d4ac7e0510c/tenor.gif", "https://media1.tenor.com/images/40b472c5ebd2b741690f852cf3cdd76a/tenor.gif", "https://media1.tenor.com/images/49de17c6f21172b3abfaf5972fddf6d6/tenor.gif"];
			var rdmgif2 = Math.floor(Math.random()*rdmgif.length);
				embed.setTitle(message.author.username + " slap " + member.user.username)
				embed.setAuthor(bot.user.username, bot.user.avatarURL)
				embed.setColor(0x00AE86)
				embed.setFooter(bot.user.username, bot.user.avatarURL);
				embed.setImage(rdmgif[rdmgif2])
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
				var rdmgif =["https://media1.tenor.com/images/8438e6772a148e62f4c64332ea7da9e8/tenor.gif", "https://media1.tenor.com/images/2fc5b4ed1a312bbbc240a29d2e587b31/tenor.gif", "https://media1.tenor.com/images/45298a29826f3ec1f29885b9f862ea57/tenor.gif", "https://media1.tenor.com/images/0df97f6253419235268ca1a2efdb8e6a/tenor.gif"];
				var rdmgif2 = Math.floor(Math.random()*rdmgif.length);
					embed.setTitle(message.author.username + " kiss " + member.user.username)
					embed.setAuthor(bot.user.username, bot.user.avatarURL)
					embed.setColor(0x00AE86)
					embed.setFooter(bot.user.username, bot.user.avatarURL);
					embed.setImage(rdmgif[rdmgif2])
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
					var rdmgif =["https://media1.tenor.com/images/348eae99cbaf68283903d74ee85e67ce/tenor.gif", "https://media1.tenor.com/images/e98b912ad0f5e74e53efc1c20aea59be/tenor.gif", "https://media1.tenor.com/images/f03ec2fc5f712b344f5b35d644140236/tenor.gif", "https://media1.tenor.com/images/cc5bc86ee3be2219b0976d320ecf5276/tenor.gif", "https://media1.tenor.com/images/9982265fa4c53204c66ea7fc9997aee0/tenor.gif"];
					var rdmgif2 = Math.floor(Math.random()*rdmgif.length);
						embed.setTitle(message.author.username + " kick the nuts of " + member.user.username)
						embed.setAuthor(bot.user.username, bot.user.avatarURL)
						embed.setColor(0x00AE86)
						embed.setFooter(bot.user.username, bot.user.avatarURL);
						embed.setImage(rdmgif[rdmgif2])
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
						var rdmgif =["https://media1.tenor.com/images/d7529f6003b20f3b21f1c992dffb8617/tenor.gif", "https://media1.tenor.com/images/87ce1545bd99ccb269005e3ad706f6d8/tenor.gif", "https://media1.tenor.com/images/24ac13447f9409d41c1aecb923aedf81/tenor.gif", "https://media1.tenor.com/images/ce9dc4b7e715cea12604f8dbdb49141b/tenor.gif", "https://media1.tenor.com/images/0febed6df8b2f8aa52d885054782be15/tenor.gif"];
						var rdmgif2 = Math.floor(Math.random()*rdmgif.length);
							embed.setTitle(message.author.username + " hug " + member.user.username)
							embed.setAuthor(bot.user.username, bot.user.avatarURL)
							embed.setColor(0x00AE86)
							embed.setFooter(bot.user.username, bot.user.avatarURL);
							embed.setImage(rdmgif[rdmgif2])
							embed.addField("Love is beautiful", ":)")
							embed.setTimestamp()
							message.channel.send({embed});
					}
					}
					if(message.content.startsWith(prefix + "facepalm")) {
							const embed = new Discord.RichEmbed()
							var rdmgif =["https://media1.tenor.com/images/0f78af841f453545a036b6cceb3620cc/tenor.gif", "https://media1.tenor.com/images/06655070b3cc8faaff4824eee848adc0/tenor.gif", "https://media1.tenor.com/images/fa7be96565d6a62208b61497b92576b7/tenor.gif", "https://media1.tenor.com/images/943c9749155767d167660c6a8e45357c/tenor.gif", "https://media1.tenor.com/images/662a736b3f807c6265b79981f115fd87/tenor.gif", "https://media1.tenor.com/images/0111c62d35b8e0ad45a24ee6c01e9279/tenor.gif", "https://media1.tenor.com/images/a4ffc23c3537fc4eb8c076c4fb072f32/tenor.gif", "https://media1.tenor.com/images/f758feb1edaa0718d9cfe2fd7701a8dd/tenor.gif"];
							var rdmgif2 = Math.floor(Math.random()*rdmgif.length);
								embed.setTitle(message.author.username + " facepalm")
								embed.setAuthor(bot.user.username, bot.user.avatarURL)
								embed.setColor(0x00AE86)
								embed.setFooter(bot.user.username, bot.user.avatarURL);
								embed.setImage(rdmgif[rdmgif2])
								embed.addField("Facepalmed", "¯\_(ツ)_/¯")
								embed.setTimestamp()
								message.channel.send({embed});
						}
						if(message.content.startsWith(prefix + "dawae")) {
							const embed = new Discord.RichEmbed()
							var rdmgif =["https://media1.tenor.com/images/96d8a6e5daebe9d1ac5ea47f39e74fa6/tenor.gif", "https://media1.tenor.com/images/478711ecd6da7f70165fe3c0f89f0387/tenor.gif", "https://media1.tenor.com/images/dc3997030a482257e718b36aed35a360/tenor.gif", "https://media1.tenor.com/images/4263bc7bd673f742919bd69eaeccae77/tenor.gif", "https://media1.tenor.com/images/f0cf485fcf480561d42f6f19fb2b7e33/tenor.gif", "https://media1.tenor.com/images/63da1c7225c52c7184dfb89d2cdd8280/tenor.gif"];
							var rdmgif2 = Math.floor(Math.random()*rdmgif.length);
								embed.setTitle("DO KNOW DA WAE ?")
								embed.setAuthor(bot.user.username, bot.user.avatarURL)
								embed.setColor(0x00AE86)
								embed.setFooter(bot.user.username, bot.user.avatarURL);
								embed.setImage(rdmgif[rdmgif2])
								embed.addField("DO YOU KNOW DA WAE !!", "DA WAEEEEEE !")
								embed.setTimestamp()
								message.channel.send({embed});
						}
			if(message.content.startsWith(prefix + "embed")) {
				// All of this are made by KanpekiUsagi#6908
				// All credits goes to him <3
				let desc, color, author, authorurl, imageurl, hidden, title, footer, helping;
	let args = message.content.split(' ');
	args.shift();
	while(args[0]=="") args.shift();
	if(args.length==0) return message.channel.send("**__Syntax :__** `<embed argument: valeur|argument: valeur|argAdmin`\nYou can create embed with me.\n__How to use me :__ \n<embed content:Hello World!\n\nIn this example, `content` is the argument and `Hello World!` is the text.\n\n__Args list:__`content`,`color`,`image`,`footer`,`title`\n__Args list admin:__ `hide` (not hide:yes, just `hide`)");
	args = args.join(' ').split('|');
	for(i in args){
        if(args[i].replace(/ /g,'').replace(/\n/g,'').toLowerCase().startsWith('content:')){
            arg = args[i].split(' ');
            while(arg[0]==""||arg[0]=="\n") arg.shift();
            while(arg[0].startsWith('\n')) arg[0]=arg[0].substr(1);
            if(arg[0].length=='content:'.length) arg.shift();
            else arg[0] = arg[0].substr('content:'.length)
            desc = arg.join(' ');
        }else if(args[i].replace(/ /g,'').replace(/\n/g,'').toLowerCase().startsWith('color:')){
			arg = args[i].split(' ');
			while(arg[0]==""||arg[0]=="\n") arg.shift();
			while(arg[0].startsWith('\n')) arg[0]=arg[0].substr(1)
			if(arg[0].length=='color:'.length) arg.shift();
			else arg[0] = arg[0].substr('color:'.length)
			arg = arg.join(' ');
			if(arg.toLowerCase().startsWith('rgb(')||arg.startsWith('(')){
				arg = arg.split(',');
				if(arg.length!=3) return message.channel.send('Error:\nPlease use valid number separated by `,`\n__Ex :__\ncolor : rgb(255,0,0)');
				arg[0] = arg[0].replace(/rgb/i,"").replace('(',"");
				arg[2] = arg[2].replace(')',"");
				if(parseInt(arg[0]).toString()=='NaN') return message.channel.send('Error:\nSettings of the color red must be a valid number.');
				if(parseInt(arg[1]).toString()=='NaN') return message.channel.send('Error:\nSettings of the color green must be a valid number.');
				if(parseInt(arg[2]).toString()=='NaN') return message.channel.send('Error:\nSettings of the color blue must be a valid number.');
				let r = parseInt(arg[0]);
				let g = parseInt(arg[1]);
				let b = parseInt(arg[2]);
				if(!(-1<r&&r<256)) return message.channel.send('Error:\nSettings of the color red must be from 0 to 255.');
				if(!(-1<g&&g<256)) return message.channel.send('Error:\nSettings of the color green must be from 0 to 255.');
				if(!(-1<b&&b<256)) return message.channel.send('Error:\nSettings of the color blue must be from 0 to 255.');
				color = r*0x10000+g*0x100+b;
			}else if(arg.startsWith('#')){
				if(arg.substr(1).replace(/[^0-9a-f]/gi,"")!=arg.substr(1)) return message.channel.send('Error:\nNon hexadecimal args.');
				if(arg.length>7) return message.channel.send('Error:\nMax is #FFFFFF.');
				color = parseInt(arg.replace('#',"0x"));
			}else if(arg.replace(" ","").toLowerCase()=="blue") color=0x0000FF;
			else if(arg.replace(" ","").toLowerCase()=="red") color=0xFF0000;
			else if(arg.replace(" ","").toLowerCase()=="green") color=0x00FF00;
			else if(arg.replace(" ","").toLowerCase()=="yellow") color=0xFFFF00;
			else if(arg.replace(" ","").toLowerCase()=="violet") color=0xA000A0;
			else if(arg.replace(" ","").toLowerCase()=="pink") color=0xFF00FF;
			else if(arg.replace(" ","").toLowerCase()=="orange") color=0xFF3000;
			else if(arg.replace(" ","").toLowerCase()=="black") color=0x010000;
			else if(arg.replace(" ","").toLowerCase()=="white") color=0xFFFFFF;
			else if(arg.replace(" ","").toLowerCase()=="cyan") color=0x00FFFF;
		}else if(args[i].replace(/ /g,'').replace(/\n/g,'').toLowerCase().startsWith('image:')){
			arg = args[i].split(' ');
			while(arg[0]==""||arg[0]=="\n") arg.shift();
			while(arg[0].startsWith('\n')) arg[0]=arg[0].substr(1)
			if(arg[0].length=='image:'.length) arg.shift();
			else arg[0] = arg[0].substr('image:'.length);
			imageurl = arg.join(' ').replace(/ /g,"");
			if(!imageurl.startsWith('http')) return message.channel.send('Error:\nInvalid image link.');
		}else if(args[i].replace(/ /g,'').replace(/\n/g,'').toLowerCase().startsWith('title:')){
			arg = args[i].split(' ');
			while(arg[0]==""||arg[0]=="\n") arg.shift();
			while(arg[0].startsWith('\n')) arg[0]=arg[0].substr(1)
			if(arg[0].length=='title:'.length) arg.shift();
			else arg[0] = arg[0].substr('title:'.length);
			title = arg.join(' ');
		}else if(args[i].replace(/ /g,'').replace(/\n/g,'').toLowerCase().startsWith('footer:')){
			arg = args[i].split(' ');
			while(arg[0]==""||arg[0]=="\n") arg.shift();
			while(arg[0].startsWith('\n')) arg[0]=arg[0].substr(1)
			if(arg[0].length=='footer:'.length) arg.shift();
			else arg[0] = arg[0].substr('footer:'.length);
			footer = arg.join(' ');
		}else if(args[i].replace(/ /g,'').replace(/\n/g,'').toLowerCase() =='hide'){
			if(message.guild){
				if(message.member.hasPermission('MANAGE_MESSAGES')){
					author=null;
					authorurl=null;
					hidden=true;
				}
			}
		}
	}
	if(helping) return;
	if(hidden) message.delete();
	else{
		author=message.author.tag;
		authorurl=message.author.displayAvatarURL;

	}
	message.channel.send({embed:{
		author:{
			name:author,
			iconURL:authorurl
		},
		title:title,
		description:desc,
		color:color,
		image:{
			url:imageurl
		},
		footer:{
			text:footer
		}
	}})
}
if(message.content.startsWith(prefix + "gtn")) {

				// All of this are made by KanpekiUsagi#6908
				// All credits goes to him <3

	if(!message.guild) return;
	let args = message.content.split(' ');
	if(args[1]=="start"){
		GTNs(message);
	}else if(args[1]=="tips"){
		GTNt(message);
	}else if(parseInt(args[1]).toString()!="NaN"){
		GTNg(message);
	}else{
		GTNh(message)
	}
function GTNgo(channel, reason){
	channel.send("Game Over.\nYou've lost ! \nReason: "+reason);
	channel.currentGame.exists = false;

}
function GTNs(message){
	if(message.channel.currentGame){
		if(message.channel.currentGame.exists) return message.channel.send('Only 1 game per guilds.');
	}
	message.channel.currentGame={
		player:message.author.id,
		theNum: Math.floor(Math.random()*1000),
		type:"Guess The Number",
		createdAt:message.createdTimestamp,
		exists:true,
		tips:"➡ I'm left than 1000.\n➡ I'm not a negative number.",
		valeur:0,
		chances:3
	}
	let geimu = message.channel.currentGame;
	let random = Math.floor(Math.random()*1000);
	if(geimu.theNum%2==0) geimu.tips+="\n➡ I'm pair.";
	else geimu.tips+="\n➡ I'm not pair.";
	geimu.tips+="\n➡ I have "+geimu.theNum.toString().length+" number.";
	geimu.valeur+=geimu.theNum.toString().length;
	if(geimu.theNum>random) geimu.tips+="\n➡ I'm higher than "+random;
	if(geimu.theNum<random) geimu.tips+="\n➡ I'm lower than "+random;
	if(geimu.theNum%random==0) geimu.tips+="\n➡ I'm divisible  by "+random;
	else if(random%geimu.theNum==0) geimu.tips+="\n➡ I can divide "+random;
	else geimu.valeur +=1;
	if(geimu.theNum%5==0) geimu.tips+="\n➡ I'm divisible by 5";
	else {
		geimu.tips+="\n➡ The rest by my divison by 5 is "+(geimu.theNum%5);
		geimu.valeur+=1;
	}
	if(geimu.theNum%3==0) geimu.tips+="\n➡  I'm divisible by 3";
	else {
		geimu.tips+="\n➡ The rest by my divison by 3 is "+(geimu.theNum%3);
		geimu.valeur+=1;
	}
	message.channel.send("Who am I ?.\nTips in the embed :.\nPS: If you don't see the embed, please check (or ash the owner) if i can send embed link",{
		embed:{
			title:"Party of " + message.author.tag,
			description:geimu.tips+"\n\nOne game per guild !",
			footer:{
				text:"You have 3 try. And 60 seconds per try. // KanpekiUsagi#6908"
			}
		}
	})
	geimu.timeup=gtntimeout(message, geimu)
}
function gtntimeout(message, game){
	return setTimeout(()=>{
		if(game.chances == 1) return GTNgo(message.channel, "Too late.");
		message.channel.send("You left time!\n-1 try !");
		game.chances=game.chances-1;
		game.createdAt=message.createdTimestamp;
		game.timeup=gtntimeout(message, game);
	}, 60000);
}
function GTNg(message){
	if(message.channel.currentGame){
		let game = message.channel.currentGame
		if(game.exists){
			if(game.player==message.author.id){
				clearTimeout(game.timeup);
				let guess = parseInt(message.content.split(' ')[1]);
				if(guess==game.theNum){
					message.channel.send('✅ GG! It\'s me!\nYou won the game');
					if(users.users.indexOf(message.author.id)==-1) users.users.push(message.author.id);
					if(users[message.author.id]){
						users[message.author.id].gScore+=game.valeur;
						if(users[message.author.id].gGTN){
							users[message.author.id].gGTN.streak+=1;
							users[message.author.id].gGTN.wins+=1;
						}else users[message.author.id].gGTN = {
							streak:1,
							wins:1
						}
					}else users[message.author.id] ={
						gGTN:{
							streak:1,
							wins:1
						},
						gScore:game.valeur
					}
					message.channel.currentGame.exists = false;
					return;
				}else{
					if(game.chances == 1) return GTNgo(message.channel, "Wrong number.");
					if(game.theNum>guess) {
						game.tips+="\n➡ I'm higher than "+guess;
						if(game.theNum%guess==0) game.tips+="\n➡ I'm divisible by "+guess;
						else game.tips+="\n➡ The rest of my divisible by "+guess+" is "+(game.theNum%guess);
					}
					else {
						game.tips+="\n➡ I'm left than "+guess;
						if(guess%game.theNum==0) game.tips+="\n➡ JI can divide "+guess;
						else game.tips+="\n➡ When i'm divided by "+guess+", the rest is "+(guess%game.theNum);
					}
					message.channel.send('❎Wrong number !.\nPlease do `-qsj tips` another time');
					game.chances=game.chances-1
					game.createdAt=message.createdTimestamp;
					game.timeup = gtntimeout(message, game)
					if(game.chances==1) message.channel.send('Last chance !')

				}
			}
		}
	}
}
function GTNt(message){
	if(message.channel.currentGame){
		game = message.channel.currentGame;
		if(game.exists){
			message.channel.send({embed:{
				title:"Game of "+message.guild.members.get(game.player).user.tag,
				description:game.tips,
				footer:{
					text:"Time : "+(60-(message.createdTimestamp-game.createdAt)/1000)+"s for this try. // KanpekiUsagi#6908"
				}
			}});
			return;
		}
	}
	return GTNh(message);
}
function GTNh(message){
	message.channel.send({embed:{
		title:"Who Am I ?",
		description:"In this game, you have to guess the number (No worry, i'll help you)\n\n__Args list:__\n`<gtn start` : Start a game\n`<gtn tips` : Tips for this game\n`<gtn <nombre>` : Who Am I ? 😏",
		footer:{
			text:"Made by KanpekiUsagi#6908"
		}
	}})
}
}

if(message.content.startsWith(prefix + "mc")) {
	let typeapi = args[0]
	let ip = args[1]

	if(typeapi === "server") {
	req('https://mcapi.us/server/status?ip=' + ip, (e, r, b)=> {
		let contenu = JSON.parse(b)
		if(contenu.online === false) {
			message.channel.send("Invalid hostname (i use only port `25565`) or offline")
		} else {
	const embed = new Discord.RichEmbed()
		embed.setTitle("<:minecraft:416218262196584449>")
		embed.setAuthor(bot.user.username, bot.user.avatarURL)
		embed.setColor(0x00AE86)
		embed.setFooter(bot.user.username, bot.user.avatarURL);
		embed.addField(ip, contenu.motd)
		embed.addField("Players", contenu.players.now + "/" + contenu.players.max)
		embed.addField("Version", contenu.server.name)
		embed.setThumbnail("http://mcapi.de/api/image/favicon/" + ip)
		embed.setTimestamp()
		message.channel.send({embed});
		}
	})
	}
	if(typeapi === "player") {
		req('https://mcapi.de/api/user/' + ip, (e, r, b)=> {
			let contenu = JSON.parse(b)
			if(contenu.premium === false) {
				message.channel.send("Invalid user or not premium")
			} else {
		const embed = new Discord.RichEmbed()
			embed.setTitle("<:minecraft:416218262196584449>")
			embed.setAuthor(bot.user.username, bot.user.avatarURL)
			embed.setColor(0x00AE86)
			embed.setFooter("Updated on " + contenu.updated.time + " (tz " + contenu.updated.zone + ")");
			embed.addField("Premium ?", "Yes ✅")
			embed.addField("UUID", contenu.uuid)
			embed.setThumbnail("https://minotar.net/helm/" + ip)
			embed.setImage("https://minotar.net/body/" + ip)
			embed.setTimestamp()
			message.channel.send({embed});
			}
		})
	}
	if(typeapi === "status") {
		req('http://mcapi.de/api/game/status/api.mojang.com', (e, r, b)=> {
			let contenu = JSON.parse(b)
		const embed = new Discord.RichEmbed()
			embed.setTitle("<:mojang:416218990222901268>")
			embed.setAuthor(bot.user.username, bot.user.avatarURL)
			embed.setColor(0x00AE86)
			embed.setFooter("Updated on " + contenu.updated.time + " (tz " + contenu.updated.zone + ")");
			embed.addField(contenu.service.part + " " + contenu.service.description, contenu.service.status)
			embed.setThumbnail("https://pbs.twimg.com/profile_images/658664874856333313/MhnCHMVD_400x400.png")
			embed.setTimestamp()
			message.channel.send({embed});
		})
	} if(typeapi != "status" && typeapi != "player" && typeapi != "server") {
		message.channel.send("__Args list :__\n\n`status` : to get MC/Mojang api status\n`player` : to get info about a player\n`server` : to get info about a server")
	}
}
	if(message.content.startsWith(prefix + "github")) {
	let name = args[0]
	req('https://api.github.com/users/' + name, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64; rv:54.0) Gecko/20100101 Firefox/54.0' }}, (e, r, b)=> {
		let contenu = JSON.parse(b)
		if(contenu.message === "Not Found") {
			message.channel.send("This user doesn´t exist")
		} if (!name) {
			message.channel.send("Please provide a user/org name")
		} else {
	const embed = new Discord.RichEmbed()
		embed.setTitle("Github API")
		embed.setAuthor(bot.user.username, bot.user.avatarURL)
		embed.setColor(0x00AE86)
		embed.setFooter(bot.user.username, bot.user.avatarURL);
		embed.addField(contenu.login + " (" + contenu.type + ")", contenu.bio)
		embed.addField(contenu.public_repos + " public repos", "[Check them](https://github.com/" + name + "?tab=repositories)")
		embed.addField("Followers", contenu.followers)
		embed.addField("Following", contenu.following)
		embed.addField("Created on", moment(contenu.created_at).format("D MMMM Y"))
		embed.addField("Links", "[Website](" + contenu.blog + ")\n[Github](https://github.com/" + name + ")")	
		embed.setThumbnail(contenu.avatar_url)
		embed.setTimestamp()
		message.channel.send({embed});
		}
	})
	}
	
       if(message.content.startsWith(prefix + "iss")) {
       req('http://api.open-notify.org/iss-now.json', (e, r, b)=> {
		let contenu = JSON.parse(b)
		if(contenu.message != "success") {
			message.channel.send("Error, please contact the owner (Jus De Patate#0190)")
		} else {
	const embed = new Discord.RichEmbed()
		embed.setTitle("ISS Position")
		embed.setAuthor(bot.user.username, bot.user.avatarURL)
		embed.setColor(0x00AE86)
		embed.setFooter(bot.user.username, bot.user.avatarURL);
		embed.addField(cities.gps_lookup(contenu.iss_position.latitude, contenu.iss_position.longitude).state + " (" + cities.gps_lookup(contenu.iss_position.latitude, contenu.iss_position.longitude).state_abbr + ")", cities.gps_lookup(contenu.iss_position.latitude, contenu.iss_position.longitude).city + " (" + cities.gps_lookup(contenu.iss_position.latitude, contenu.iss_position.longitude).zipcode + ")")
		embed.addField("GPS Coords", "Long: " + contenu.iss_position.longitude + "\nLat: " + contenu.iss_position.latitude)
		embed.setThumbnail("http://sciencepost.fr/wp-content/uploads/2017/11/715-iss-bacteria_1024-758x307.jpg")
		embed.setTimestamp()
		message.channel.send({embed});
		}
    })
}
	if(message.content.startsWith(prefix + "ts")) {
		let ip = args[0]
       req('https://api.planetteamspeak.com/serverstatus/' +ip, (e, r, b)=> {
		let contenu = JSON.parse(b)
		if(contenu.message != "success") {
			message.channel.send("Error, invalid ip/port or server down")
		} else {
	const embed = new Discord.RichEmbed()
		embed.setTitle("<:teamspeak:416545486607089676>")
		embed.setAuthor(bot.user.username, bot.user.avatarURL)
		embed.setColor(0x00AE86)
		embed.setFooter(bot.user.username, bot.user.avatarURL);
		embed.addField(contenu.result.name + " (" + ip + ")", contenu.result.users + "/" + contenu.result.slots)
		embed.setTimestamp()
		message.channel.send({embed});
		}
    })
}
});
