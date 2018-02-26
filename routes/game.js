const main_operations = require('../helper/main_operations');
module.exports = function(user_input, game_details)
{
	let displayHint = function()
	{
		let definitions = game_details.definitions;
		let synonyms = game_details.synonyms;
		let antonyms = game_details.antonyms;
		
	};
	if(game_details.user_ans_status)
	{
		if(user_input===game_details.word_details.word || game_details.word_details.synonyms.indexOf(user_input)!=-1)
		{
			console.log("correct")
		}
		else
		{

		}
	}
	else
	{
		switch(user_input)
		{
			case '1':
				game_details.user_ans_status = true;
				console.log("Enter Your Answer : ")
				break;
			case '2':
				displayHint();
				break;
			case '3':
				main_operations.getFullDictionary(game_details.word_details.word);
				break;
			default:
				console.log('Selected Valid Option');
		}
	}
}