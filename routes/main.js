const main_operations = require('../helper/main_operations');
const game_operations = require('../helper/game_operations');
module.exports = function(input, game_details)
{
	let command = input[1];
	let word = input[2];
	if(input[0] && input[0]==='./dict')
	{
		if(command==='def')
		{
			main_operations.getDefinition(word);
		}
		else if(command==='syn')
		{
			main_operations.getSynonym(word);
		}
		else if(command==='ant')
		{
			main_operations.getAntonym(word);
		}
		else if(command==='ex')
		{
			main_operations.getExamples(word);
		}
		else if(command==='dict')
		{
			main_operations.getFullDictionary(word);
		}
		else if(command==='play')
		{
			game_details.status = true;
			game_operations.getGameQuestion(function(result){
				console.log(JSON.stringify(result, null, 2));
				game_details.user_ans_status = true;
				game_details.word_details = result;
			});
		}
		else
		{
			word = command;
			if(word)
			{
				main_operations.getFullDictionary(word);
			}
			else
			{
				main_operations.getWordOfTheDay();
			}
		}
	}
}