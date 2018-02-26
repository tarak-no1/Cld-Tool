const wordnik = require('../helper/wordnik-api.js');
const dateFormat = require('dateformat');
const main = {
	getDefinition : function(word, callback)
	{
		console.log("In Definition Function\nword : ", word);
		wordnik.getDefinition(word, function(err, response){
			if(err) console.log(`Error while getting Definition : ${err}`);
			//console.log(JSON.stringify(response, null, 2));
			if(response.length===0)
			{
				console.log(`No Definition is found for ${word}`);
			}
			else
			{
				console.log(`Definitions of ${word}`);
				console.log("=====================================");
				response.forEach(function(def_object){
					console.log(def_object.attributionText);
					console.log(`Definition : ${def_object.text}\n`);
				});
			}
			console.log("- - - - - - - - - - - - - - - - - - - -");
			if(callback) callback();
		});
	},
	getSynonym : function(word, callback)
	{
		console.log("In Synonym Function\nword : ", word);
		wordnik.getSynonym(word, function(err, response){
			if(err) console.log("Error while getting Synonym", err);
			//console.log(JSON.stringify(response, null, 2));
			if(response.length===0)
			{
				console.log(`No Synonym is found for ${word}`);
			}
			else
			{
				let synonym_words = response[0]["words"].join(", ")
				console.log("Synonym Words : ",synonym_words.trim());
			}
			console.log("- - - - - - - - - - - - - - - - - - - -");
			if(callback) callback();
		});
	},
	getAntonym : function(word, callback)
	{
		console.log("In Antonym Function\nword : ", word);
		wordnik.getAntonym(word, function(err, response){
			if(err) console.log("Error while getting Antonym", err);
			//console.log(JSON.stringify(response, null, 2));
			if(response.length===0)
			{
				console.log(`No Antonym is found for ${word}`)
			}
			else
			{
				let antonym_words = response[0]["words"].join(", ")
				console.log("Antonym Words : ",antonym_words.trim());
			}
			console.log("- - - - - - - - - - - - - - - - - - - -");
			if(callback) callback();
		});
	},
	getExamples : function(word, callback)
	{
		console.log("In Get Example Function\nword : ", word);
		wordnik.getExamples(word, function(err, response){
			if(err) console.log("Error while getting Example", err);
			//console.log(JSON.stringify(response, null, 2));
			if(Object.keys(response).length===0)
			{
				console.log(`No Examples is found for ${word}`)
			}
			else
			{
				console.log(`Examples for ${word}`);
				console.log("===================================");
				response.examples.forEach(function(ex_obj, idx){
					console.log(`eg-${idx+1}) ${ex_obj.text}`)
				});
			}
			console.log("- - - - - - - - - - - - - - - - - - - -");
			if(callback) callback();
		});
	},
	getFullDictionary : function(word)
	{
		console.log("In Full Dictionary Function\nword : ", word);
		main.getDefinition(word, function(){
			main.getSynonym(word, function(){
				main.getAntonym(word, function(){
					main.getExamples(word, function(){});
				});
			});
		});
	},
	getWordOfTheDay : function()
	{
		console.log("In Word of The Day Function");
		let now = new Date();
		let today_date = dateFormat(now, "yyyy-mm-dd");
		//console.log(today_date);
		wordnik.getWordOfTheDay(today_date, function(err, response)
		{
			if(err) console.log("Error while getting WordoftheDay", err);
			//console.log(JSON.stringify(response, null, 2));
			if(response.word)
			{
				console.log(`Word of the Day ${today_date} : ${response.word}`);
				main.getFullDictionary(response.word);
			}
			else
			{
				console.log(`Word of the Day not found for ${today_date} date`)
			}
		});
		console.log("- - - - - - - - - - - - - - - - - - - -");
	}
};
module.exports = main;