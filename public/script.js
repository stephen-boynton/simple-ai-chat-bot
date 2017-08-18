var socket = io();
const form = document.querySelector("form");
const resArr = [];

form.addEventListener("submit", function(event) {
	event.preventDefault();
	let talkTo = event.target[0].value;
	console.log(event);
	socket.emit("chat message", talkTo);
	event.target[0].value = "";
	return false;
});

socket.on("reply message", function(msg) {
	const div = document.querySelector(".response");
	div.innerText = msg;
	console.log(msg);
});
