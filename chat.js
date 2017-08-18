const apiai = require("apiai");
const ai = apiai("f39ed253db154c1a856a451b4fec9c23");
const talk = require("./talkData");
const fetch = require("node-fetch");

function getTalk() {
	return talk;
}

function sendReceive(chatText) {
	let request = ai.textRequest(chatText, {
		sessionId: "1"
	});
	request.on("response", function(response) {
		console.log("Results " + response.result.fulfillment.speech);
		talk.push(response.result.fulfillment.speech);
	});
	request.end();
}

module.exports = {
	chat: sendReceive,
	getTalk: getTalk,
	talk: talk
};
