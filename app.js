//Import
var restify = require('restify');
var builder = require('botbuilder');
var request = require('request');

//Bootstrap 

var bot = new builder.TextBot();
var dialog = new builder.CommandDialog();

var server = restify.createServer();

var builder = require('botbuilder');

bot.add('/', lDialog);
lDialog.on('Greeting', function(session, args){
	var greeting = responseFactory().greeting;
	session.send(greeting());
})
lDialog.on('WorkQuestion', function(session, args){
	var workQuestion = responseFactory().workQuestion;
	session.send(workQuestion());
})
lDialog.on('Question', function(session, args){
	var Question = responseFactory().Question;
	session.send(Question());
})
lDialog.on('PersonalQuestion', function(session, args){
	var personalQuestion = responseFactory.PersonalQuestion;
	session.send(personalQuestion);
})
lDialog.on('Mail', [
	function(session, args){
		builder.Prompts.text(session, "What is your email address?")
	},
	function(session, results){
		if(results.response && validEmail(results.response)){
			session.send("Ok... %s I'll send an email immediately", results.response)
		}else{
			session.send("That doesn't seem correct could you check you mail (%s) and type it again", results.response);
			builder.Prompts.text(session, "What is your email address?") 
		} 	
	}	
])


lDialog.on('None', function(session, args){
	var None = responseFactory().None;
	session.send(None());
})

// var mail = function(){
// 	builder.Prompts.text(session, "What is your email address");
// 	}, function(session, results){
// 		if(result.response) {
// 			if(validEmail(results.response)){
// 				session.send("I'll send an email to %s", results.response);;
// 			}
// 		}else{
// 			session.send("That is not an valid email adress");
// 			return mail();
// 		}
// 	}
// }

//TODO 
var timeOfDay = function(){
		var greeting;
		var date = new Date();
		var currentHour = date.getHours();	
		if(currentHour < 12)
			return greeting = "Good morning "
		if(currentHour >= 12 && currentHour < 18)
			return greeting = "Good afternoon "
		if(currentHour >= 18 && currentHour < 24)
			return greeting = "Good evening "
	}

var validEmail = function(e) {
    var filter = /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/;
    return String(e).search (filter) != -1;
}

var responseFactory = function(session){
	return {
		greeting : function(){
			return timeOfDay() + "I'm Egbert.AI. I'm the virtual representation of the real " + 
								"life Egbert, He's a very busy guy. " + 
								"That's why he made me to handle some of his work. " + 
								"I don't know everything about him yet, " +
								"but I can give you some personal information, work related" + 
								"or I can schedule an appointment for you with him by phone or in person " + 
								"Or maybe all this is to high-tech for you? " + 
								"Then I can redirect you to his linkedin page or send a link of his resume" + 
								"What would you like to know ?"
		},
		workQuestion: function(){
			return "Straight to the point I see."
		},
		PersonalQuestion: function(){
			return "Personal dialog"
		},
		Question: function(){
			return "That doesn't seem work related, and I can't find. " + 
				   "anything about that in my personal connection database " + 
				   "I'll save this question and hopefully he'll update my database." +
				   "I can also send an email for you? or shall we just continue with another question. "  
		},
		Mail: function(session){
			return "Email dialog"
		},
		None: function(){
			return "Could you rephrase that question";
		},
	}
}

var q = bot.listenStdin();

//Server setup 
// server.post('/api/messages',bot.verifyBotFramework(), bot.listen());
// server.listen(process.env.port || 3978, function () {
//     console.log('%s listening to %s', server.name, server.url); 
// });
