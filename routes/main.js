const main_operations = require('../helper/main_operations');
const game_operations = require('../helper/game_operations');

module.exports = (input, game_details)=>{
	let command = input[1]; // getting the user command
	let word = input[2]; // getting the user word
	if(input[0] && input[0]==='./dict') // checking wheather user entered valid command or not
	{
		if(command==='def') // checking wheather user asked for definition
		{
			main_operations.getDefinition(word); // processing the word for getting the definition
		}
		else if(command==='syn') // checking wheather user asked for synonyms of the word
		{
			main_operations.getSynonym(word); // processing the word for getting the synonym
		}
		else if(command==='ant') // checking wheather user asked for antonyms of the word
		{
			main_operations.getAntonym(word); // processing the word for getting the antonym
		}
		else if(command==='ex') // checking wheather user asked for examples of the word
		{
			main_operations.getExamples(word); // processing the word for getting the examples
		}
		else if(command==='dict') // checking wheather user asked for full dictionary of the word
		{
			main_operations.getFullDictionary(word); // processing the word for getting the full dictionary
		}
		else if(command==='play') // checking wheather user asked for play the game or not
		{
			game_details.status = true;
			game_operations.getGameQuestion(function(result) // getting the game question
			{
				// console.log(JSON.stringify(result, null, 2));
				game_details.user_ans_status = true;
				game_details.word_details = result;
				console.log("I have a word");
				if(game_details.word_details.definitions.length>0) // checking wheather any definitions are existed for the word or not
				{
					let def_idx = game_operations.getRandomNumber(game_details.word_details.definitions.length);
					let definition = game_details.word_details.definitions.splice(def_idx, 1); // selecting the random definition for display
					console.log(` and its definition is ${definition[0].text}`);
				}
				if(game_details.word_details.synonyms.length>0) // checking wheather any synonyms are existed or not
				{
					let syn_idx = game_operations.getRandomNumber(game_details.word_details.synonyms.length);
					let synonym = game_details.word_details.synonyms.splice(syn_idx, 1); // selecting the random synonym for display
					console.log(` and its synonym is ${synonym}`);
				}
				if(game_details.word_details.antonyms.length>0) // checking wheather any antonyms are existed or not
				{
					let ant_idx = game_operations.getRandomNumber(game_details.word_details.antonyms.length);
					let antonym = game_details.word_details.antonyms.splice(ant_idx, 1); // selecting the random antonym for display
					console.log(` and its antonym is ${antonym}`);
				}
				console.log(" Guess The Word");
			});
		}
		else
		{
			word = command;
			if(word)
			{
				main_operations.getFullDictionary(word); // processing the word for getting the full dictionary
			}
			else
			{
				main_operations.getWordOfTheDay(); // getting the word of the day
			}
		}
	}
	else
	{
		console.log("Enter valid command.");
	}
}