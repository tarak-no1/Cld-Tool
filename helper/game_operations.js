const wordnik = require('../helper/wordnik-api.js');
const game = 
{
	getRandomNumber : (number)=>{ // this method is used to get random number
		return Math.floor(Math.random() * Math.floor(number));
	},
	getDefinition : (word, callback)=>{ // this method is used to get definitions of the word
		wordnik.getDefinition(word, function(err, response){ // calling the get wordnik definitions api
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
	getSynonym : (word, callback)=>{ // this method is used to get the synonyms of the word
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
	getAntonym : (word, callback)=>{ // this method is used to get the antonym of the word
		wordnik.getAntonym(word, function(err, response){ // calling the wordnik antonyms api
			if(err) console.log("Error while getting Antonym", err);
			let antonym_words = [];
			if(response.length>0)
			{
				antonym_words = response[0]["words"]
			}
			callback(antonym_words);
		});
	},
	getGameQuestion : (callback)=>{ // this method is used to make the word game question

		wordnik.getRandomWord(function(err, response){ // calling the wordnik random word api 
			if(err) console.log("Error while getting Random word", err);
			//console.log(response);
			if(response.word) // checking where response is having random word
			{
				let word = response.word;
				let question_obj = {
					word : word
				};
				game.getDefinition(word, function(definitions){ // getting the definitions
					question_obj.definitions = definitions;
					game.getSynonym(word, function(synonyms){ // getting the synonyms
						question_obj.synonyms = synonyms;
						game.getAntonym(word, function(antonyms){ // getting the anotonyms
							question_obj.antonyms = antonyms;
							callback(question_obj); // sending question object to callback function
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
	displayHint : (game_details)=>{
		let word_details = game_details["word_details"];

		let hint_items = [] // this array object is used to collect all hints

		// collecting definitions
		hint_items = hint_items.concat(word_details.definitions.map(function(def_obj, idx){
			def_obj.type = 'definition';
			def_obj.index = idx;
			return def_obj;
		}));

		// collecting synonyms
		hint_items = hint_items.concat(word_details.synonyms.map(function(synonym, idx){
			let syn_obj = {};
			syn_obj.type = 'synonym';
			syn_obj.index = idx;
			syn_obj.value = synonym;
			return syn_obj;
		}));

		// collecting antonyms
		hint_items = hint_items.concat(word_details.antonyms.map(function(antonym, idx){
			let syn_obj = {};
			syn_obj.type = 'antonym';
			syn_obj.index = idx;
			syn_obj.value = antonym;
			return syn_obj;
		}));

		if(hint_items.length>0) // checking any hints are available or not
		{
			let random_idx = game.getRandomNumber(hint_items.length); 
			let hint_obj = hint_items[random_idx]; // getting the random hint object
			// console.log(JSON.stringify(hint_obj, null, 2));
			console.log("Hint : ");
			switch(hint_obj.type) // checking the hint type
			{
				case 'definition':
					let def_obj = game_details["word_details"]["definitions"].splice(hint_obj.index, 1); // removing the definition hint from the list
					console.log(`Definition : ${def_obj[0].text}`);
					break;
				case 'synonym':
					let syn_obj = game_details["word_details"]["synonyms"].splice(hint_obj.index, 1); // removing the synonym hint from the list
					console.log(`Synonym : ${syn_obj}`);
					break;
				default :
					let ant_obj = game_details["word_details"]["antonyms"].splice(hint_obj.index, 1); // removing the antonym hint from the list
					console.log(`Antonym : ${ant_obj}`);
					break;
			}
		}
		else
		{
			console.log(`Sorry, There are no hints available.`);
		}
	}
};
module.exports = game;