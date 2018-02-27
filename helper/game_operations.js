const wordnik = require('../helper/wordnik-api.js');
const game = 
{
	getDefinition : function(word, callback)
	{
		wordnik.getDefinition(word, function(err, response){
			if(err) console.log(`Error while getting Definition : ${err}`);
			//console.log(JSON.stringify(response, null, 2));
			let definitions = []
			if(response.length>0)
			{
				response.forEach(function(def_object){
					definitions.push({
						"attributionText": def_object.attributionText,
						"text" : def_object.text
					});
				});
			}
			callback(definitions);
		});
	},
	getSynonym : function(word, callback)
	{
		wordnik.getSynonym(word, function(err, response){
			if(err) console.log("Error while getting Synonym", err);
			let synonym_words = [];
			if(response.length>0)
			{
				synonym_words = response[0]["words"]
			}
			callback(synonym_words);
		});
	},
	getAntonym : function(word, callback)
	{
		wordnik.getAntonym(word, function(err, response){
			if(err) console.log("Error while getting Antonym", err);
			let antonym_words = [];
			if(response.length>0)
			{
				antonym_words = response[0]["words"]
			}
			callback(antonym_words);
		});
	},
	getGameQuestion : function(callback)
	{
		wordnik.getRandomWord(function(err, response){
			if(err) console.log("Error while getting Random word", err);
			//console.log(response);
			if(response.word)
			{
				let word = response.word;
				let question_obj = {
					word : word
				};
				game.getDefinition(word, function(definitions){
					question_obj.definitions = definitions;
					game.getSynonym(word, function(synonyms){
						question_obj.synonyms = synonyms;
						game.getAntonym(word, function(antonyms){
							question_obj.antonyms = antonyms;
							callback(question_obj);
						});
					});
				});
			}
			else
			{
				callback({});
			}
		});
	},
	displayHint : function(word_details)
	{
		let hint_items = []
		hint_items = hint_items.concat(word_details.definitions.map(function(def_obj, idx){
			def_obj.type = 'definition';
			def_obj.index = idx;
			return def_obj;
		}));

		hint_items = hint_items.concat(word_details.synonyms.map(function(synonym, idx){
			let syn_obj = {};
			syn_obj.type = 'synonym';
			syn_obj.index = idx;
			syn_obj.value = synonym;
			return syn_obj;
		}));

		hint_items = hint_items.concat(word_details.antonyms.map(function(antonym, idx){
			let syn_obj = {};
			syn_obj.type = 'antonym';
			syn_obj.index = idx;
			syn_obj.value = antonym;
			return syn_obj;
		}));

		if(hint_items.length>0)
		{
			let random_idx = Math.floor(Math.random() * Math.floor(hint_items.length));
			let hint_obj = hint_items[random_idx];
			console.log(JSON.stringify(hint_obj, null, 2));
		}
		else
		{
			console.log(`Sorry, There was no hints available.`);
		}
	}
};
module.exports = game;