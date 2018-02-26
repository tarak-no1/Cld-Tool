function getUserInput(user_input) {
	console.log(user_input)
	let data = user_input.split(' ');
	
}

console.log("Enter command");
process.stdin.setEncoding('ascii');
process.stdin.on('data', (input)=>{
	getUserInput(input.trim());
});
