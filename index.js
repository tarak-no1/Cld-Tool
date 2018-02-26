const config = require('./config/conf');
const main = require('./routes/main');
const game = require('./routes/game');

console.log(`command:
./dict <operation> <word>

operations:
 - def for definitions
 - syn for synonyms
 - ant for antonyms
 - ex for examples
 - dict or only word for all above operations
 - play to start a game`);
let game_details = config.initialize_game;
process.stdin.setEncoding('ascii');
process.stdin.on('data', (input)=>{
	getUserInput(input.trim());
});
function getUserInput(user_input)
{
	let data = user_input.split(' '); // splitting the user input
	//console.log(data);
	console.log("Game Status : ",game_details.status)
	if(!game_details.status) // checking for game status
	{
		main(data, game_details);
	}
	else
	{
		game(data, game_details); // processing the game
	}
}