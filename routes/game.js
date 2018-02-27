const main_operations = require('../helper/main_operations');
const game_operations = require('../helper/game_operations');
module.exports = function(input, game_details)
{
	let user_ans = input[0];
	if(game_details.user_ans_status)
	{
		if(user_ans===game_details.word_details.word || game_details.word_details.synonyms.indexOf(user_ans)!=-1)
		{
			console.log("correct");
		}
		else
		{
			console.log("Wrong answer\n");
			console.log(`Choose anyone of below options : 
				1. try again,
				2. hint
				3. quit`);
			game_details.user_ans_status = false;
		}
	}
	else
	{
		switch(user_ans)
		{
			case '1':
				game_details.user_ans_status = true;
				console.log("Enter Your Answer : ")
				break;
			case '2':
				game_operations.displayHint(game_details.word_details);
				break;
			case '3':
				main_operations.getFullDictionary(game_details.word_details.word);
				break;
			default:
				console.log('Select valid Option');
		}
	}
}