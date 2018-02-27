const wordnik = require('../helper/wordnik-api.js');
const dateFormat = require('dateformat');

const main = {
	getDefinition : (word, callback)=>{ // this method is used to display the definition

		wordnik.getDefinition(word, function(err, response){ // getting the definition of the word
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
				response = response.splice(0, 10); // taking only 10 definitions
				response.forEach(function(def_object){
					console.log(def_object.attributionText);
					console.log(`Definition : ${def_object.text}\n`);
				});
			}
			console.log("- - - - - - - - - - - - - - - - - - - -\n");
			if(callback) callback();
		});
	},
	getSynonym : (word, callback)=>{ // this method is used to diplay synonyms
		wordnik.getSynonym(word, function(err, response){ // getting the synonyms of the word
			if(err) console.log("Error while getting Synonym", err);
			//console.log(JSON.stringify(response, null, 2));
			if(response.length===0)
			{
				console.log(`No Synonym is found for ${word}`);
			}
			else
			{
				console.log(`Synonyms of ${word}`);
				console.log("=====================================");
				let synonym_words = response[0]["words"].join(", ")
				console.log(synonym_words.trim());
			}
			console.log("- - - - - - - - - - - - - - - - - - - -\n");
			if(callback) callback();
		});
	},
	getAntonym : (word, callback)=>{ // this method is used to display the antonyms
		wordnik.getAntonym(word, function(err, response){ // this method is used to get antonyms
			if(err) console.log("Error while getting Antonym", err);
			//console.log(JSON.stringify(response, null, 2));
			if(response.length===0)
			{
				console.log(`No Antonym is found for ${word}`)
			}
			else
			{
				console.log(`Antonyms of ${word}`);
				console.log("=====================================");
				let antonym_words = response[0]["words"].join(", ")
				console.log(antonym_words.trim());
			}
			console.log("- - - - - - - - - - - - - - - - - - - -\n");
			if(callback) callback();
		});
	},
	getExamples : (word, callback)=>{ // this method is used to display examples
		wordnik.getExamples(word, function(err, response){ // getting the examples
			if(err) console.log("Error while getting Example", err);
			//console.log(JSON.stringify(response, null, 2));
			if(Object.keys(response).length===0)
			{
				console.log(`No Examples are found for ${word}`)
			}
			else
			{
				console.log(`Examples for ${word}`);
				console.log("===================================");
				response.examples.forEach(function(ex_obj, idx){
					console.log(`eg-${idx+1}) ${ex_obj.text}`)
				});
			}
			console.log("- - - - - - - - - - - - - - - - - - - -\n");
			if(callback) callback();
		});
	},
	getFullDictionary : (word)=>{ // this method is used to display full dictionary
		main.getDefinition(word, function(){ // displaying definitions of the word
			main.getSynonym(word, function(){ // displaying synonyms of the word
				main.getAntonym(word, function(){ // displaying antonym of the word
					main.getExamples(word, function(){}); // displaying examples of the word
				});
			});
		});
	},
	getWordOfTheDay : ()=>{
		let now = new Date(); // getting the today's date
		let today_date = dateFormat(now, "yyyy-mm-dd");
		//console.log(today_date);
		wordnik.getWordOfTheDay(today_date, (err, response)=>{
			if(err) console.log("Error while getting WordoftheDay", err);
			//console.log(JSON.stringify(response, null, 2));
			if(response.word)
			{
				console.log(`Word of the Day ${today_date} : ${response.word}`);
				main.getFullDictionary(response.word); // getting full dictionary of the word
			}
			else
			{
				console.log(`Word of the Day not found for ${today_date} date`)
			}
		});
		console.log("- - - - - - - - - - - - - - - - - - - -\n");
	}
};
module.exports = main;