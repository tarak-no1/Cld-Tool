const main_operations = require('../helper/main_operations');
const game_operations = require('../helper/game_operations');
module.exports = (input, game_details)=>{
	let user_ans = input[0];
	if(game_details.user_ans_status) // checking the current state is in answer mode or not
	{
		if(user_ans===game_details.word_details.word || game_details.word_details.synonyms.indexOf(user_ans)!=-1) // right answer condition
		{
			console.log("correct\n");
			game_details.status = false;
			console.log("If you want to play again type \n./dict play")
		}
		else
		{
			console.log("Wrong answer\n");
			// showing the alternate options
			console.log(`Choose anyone of below options : \n\t
				1. try again,\n\t
				2. hint,\n\t
				3. quit`);
			game_details.user_ans_status = false;
		}
	}
	else
	{
		switch(user_ans) // checking the user selected option
		{
			case '1':
				game_details.user_ans_status = true;
				console.log("Enter Your Answer : ");
				break;
			case '2':
				game_operations.displayHint(game_details); // processing the word details to display hint
				game_details.user_ans_status = true;
				console.log("Enter your Answer : ");
				break;
			case '3':
				game_details.status = false;
				console.log("Word : ", game_details.word_details.word);
				console.log("=================================================");
				main_operations.getFullDictionary(game_details.word_details.word); // getting full dictionary of the word
				break;
			default:
				console.log('Select valid Option');
		}
	}
}